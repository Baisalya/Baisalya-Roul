import 'dart:convert';
import 'dart:io';

import 'package:html/dom.dart';
import 'package:html/parser.dart' as html_parser;

Future<void> main() async {
  final siteRoot = File.fromUri(Platform.script).parent.parent;
  final htmlFiles = <File>[
    ...siteRoot.listSync().whereType<File>().where(
      (file) => file.path.endsWith('.html'),
    ),
    ...Directory(
      '${siteRoot.path}${Platform.pathSeparator}manual',
    ).listSync().whereType<File>().where((file) => file.path.endsWith('.html')),
  ];
  final failures = <String>[];
  final documents = <String, Document>{};

  for (final file in htmlFiles) {
    final source = await file.readAsString(encoding: utf8);
    if (source.contains('\uFFFD')) {
      failures.add('${_relative(siteRoot, file)} contains U+FFFD.');
    }
    final document = html_parser.parse(source);
    documents[file.absolute.path.toLowerCase()] = document;
    final ids = <String>{};
    for (final element in document.querySelectorAll('[id]')) {
      final id = element.id;
      if (id.isNotEmpty && !ids.add(id)) {
        failures.add('${_relative(siteRoot, file)} has duplicate id "$id".');
      }
    }
    for (final element in document.querySelectorAll('a[target="_blank"]')) {
      final relation = (element.attributes['rel'] ?? '').split(RegExp(r'\s+'));
      if (!relation.contains('noopener')) {
        failures.add(
          '${_relative(siteRoot, file)} has a new-tab link without noopener.',
        );
      }
    }
    for (final element in document.querySelectorAll('img')) {
      final source = element.attributes['src'] ?? '';
      if (source.contains('devdesk-logo-') &&
          !element.attributes.containsKey('alt')) {
        failures.add(
          '${_relative(siteRoot, file)} has a DevDesk logo without alt text.',
        );
      }
    }
  }

  for (final file in htmlFiles) {
    final document = documents[file.absolute.path.toLowerCase()]!;
    for (final element in document.querySelectorAll('[href], [src]')) {
      final reference = element.attributes['href'] ?? element.attributes['src'];
      if (reference == null || !_isLocal(reference)) continue;
      final uri = Uri.parse(reference);
      final target = uri.path.isEmpty
          ? file.absolute
          : File.fromUri(file.absolute.uri.resolve(uri.path));
      if (!target.existsSync()) {
        failures.add(
          '${_relative(siteRoot, file)} references missing '
          '${_relative(siteRoot, target)}.',
        );
        continue;
      }
      if (uri.fragment.isEmpty || !target.path.endsWith('.html')) continue;
      final targetDocument =
          documents[target.absolute.path.toLowerCase()] ??
          html_parser.parse(await target.readAsString(encoding: utf8));
      final expectedId = Uri.decodeComponent(uri.fragment);
      if (!targetDocument
          .querySelectorAll('[id]')
          .any((element) => element.id == expectedId)) {
        failures.add(
          '${_relative(siteRoot, file)} references missing fragment '
          '${_relative(siteRoot, target)}#${uri.fragment}.',
        );
      }
    }
  }

  final searchFile = File(
    '${siteRoot.path}${Platform.pathSeparator}assets'
    '${Platform.pathSeparator}js${Platform.pathSeparator}search-index.js',
  );
  final searchSource = await searchFile.readAsString(encoding: utf8);
  final searchStart = searchSource.indexOf('[');
  final searchEnd = searchSource.lastIndexOf(']');
  if (searchStart < 0 || searchEnd < searchStart) {
    failures.add('assets/js/search-index.js has no JSON array.');
  } else {
    final entries =
        jsonDecode(searchSource.substring(searchStart, searchEnd + 1))
            as List<dynamic>;
    if (entries.length != 43) {
      failures.add(
        'Expected 43 searchable manuals after adding the global manual; '
        'found ${entries.length}.',
      );
    }
    final urls = <String>{};
    for (final raw in entries) {
      final entry = Map<String, dynamic>.from(raw as Map);
      final url = entry['url'] as String? ?? '';
      if (!urls.add(url)) failures.add('Duplicate search URL: $url.');
      if (!File.fromUri(siteRoot.uri.resolve(url)).existsSync()) {
        failures.add('Search target does not exist: $url.');
      }
      for (final field in const <String>['title', 'summary', 'text']) {
        if ((entry[field] as String? ?? '').trim().isEmpty) {
          failures.add('Search target $url has an empty $field.');
        }
      }
    }
    stdout.writeln('Search entries: ${entries.length}');
  }

  const storeUrl =
      'https://apps.microsoft.com/detail/'
      '9N8NH1LMZX1S?hl=en-us&gl=IN&ocid=pdpshare';
  final siteConfig = await File(
    '${siteRoot.path}${Platform.pathSeparator}assets'
    '${Platform.pathSeparator}js${Platform.pathSeparator}site-config.js',
  ).readAsString(encoding: utf8);
  if (!siteConfig.contains(storeUrl)) {
    failures.add('site-config.js does not contain the official Store URL.');
  }
  if (!siteConfig.contains('Android closed testing')) {
    failures.add('site-config.js does not explain Android closed testing.');
  }

  final userManual = File(
    '${siteRoot.path}${Platform.pathSeparator}manual'
    '${Platform.pathSeparator}user-manual.html',
  );
  if (!userManual.existsSync()) {
    failures.add('manual/user-manual.html does not exist.');
  } else {
    final userManualDocument = html_parser.parse(
      await userManual.readAsString(encoding: utf8),
    );
    for (final id in const <String>[
      'welcome-to-devdesk',
      'start-here-your-first-five-minutes',
      'planning-your-work',
      'markdown-for-complete-beginners',
      'knowledge-graph',
      'open-knowledge-format-okf',
      'api-workspaces',
      'openapi-studio',
      'json-tools',
      'git-tools',
      'windows-guide',
      'android-guide',
      'privacy-and-security',
      'troubleshooting',
      'glossary',
      'learn-more-and-references',
      'complete-beginner-walkthrough-my-first-app-project',
    ]) {
      if (!userManualDocument
          .querySelectorAll('[id]')
          .any((element) => element.id == id)) {
        failures.add('Global manual is missing section #$id.');
      }
    }
  }

  if (failures.isNotEmpty) {
    for (final failure in failures) {
      stderr.writeln('ERROR: $failure');
    }
    exitCode = 1;
    return;
  }
  stdout.writeln('HTML files: ${htmlFiles.length}');
  stdout.writeln('Local links, assets, fragments, IDs, and encoding: passed');
}

bool _isLocal(String reference) {
  final value = reference.trim();
  if (value.isEmpty ||
      value.startsWith('http://') ||
      value.startsWith('https://') ||
      value.startsWith('mailto:') ||
      value.startsWith('tel:') ||
      value.startsWith('data:') ||
      value.startsWith('javascript:')) {
    return false;
  }
  return !value.startsWith('/');
}

String _relative(Directory root, File file) {
  final rootPath = root.absolute.path.replaceAll('\\', '/');
  final filePath = file.absolute.path.replaceAll('\\', '/');
  return filePath.startsWith('$rootPath/')
      ? filePath.substring(rootPath.length + 1)
      : filePath;
}
