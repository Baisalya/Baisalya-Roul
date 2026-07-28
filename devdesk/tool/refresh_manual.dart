import 'dart:convert';
import 'dart:io';

import 'package:html/parser.dart' as html_parser;
import 'package:markdown/markdown.dart';

class _Page {
  const _Page({
    required this.slug,
    required this.title,
    required this.description,
  });

  final String slug;
  final String title;
  final String description;
}

const _pages = <_Page>[
  _Page(
    slug: 'getting-started',
    title: 'Getting started',
    description:
        'Create or open a portable workspace, add useful work, and choose safe automation.',
  ),
  _Page(
    slug: 'interface-tour',
    title: 'Interface tour',
    description:
        'Understand Home, unified workspace navigation, files, tools, and responsive layouts.',
  ),
  _Page(
    slug: 'developer-workspaces',
    title: 'Folders, portability, and scoped Git',
    description:
        'Create, clone, and reopen portable workspaces with bounded files, APIs, and Git.',
  ),
  _Page(
    slug: 'api-workspaces',
    title: 'Saved API testing',
    description:
        'Build exact saved API workflows and keep a sanitized portable artifact with the project.',
  ),
  _Page(
    slug: 'knowledge-workspace',
    title: 'Edit workspace Markdown',
    description:
        'Edit project Markdown with bounded files, conflict checks, context, and derived knowledge.',
  ),
  _Page(
    slug: 'knowledge-graph',
    title: 'Relationships and graph',
    description:
        'Explore clean local and workspace relationships, filters, accessible lists, link editing, and undo.',
  ),
  _Page(
    slug: 'structured-knowledge-okf',
    title: 'Structure checks (OKF)',
    description:
        'Check official OKF v0.2 requirements separately from warnings, advice, and extensions.',
  ),
  _Page(
    slug: 'okf-conversion-migration',
    title: 'Analyze, improve, and migrate project knowledge',
    description:
        'Analyze existing Markdown first, then use bounded reviewable improvements.',
  ),
  _Page(
    slug: 'unified-search',
    title: 'Search this workspace',
    description:
        'Search the active workspace snapshot without mixing unrelated local data.',
  ),
  _Page(
    slug: 'diff-git',
    title: 'Compare files and scoped Git',
    description:
        'Compare content and keep trusted Git actions strictly inside the workspace boundary.',
  ),
  _Page(
    slug: 'project-folder-structure',
    title: 'Create a project knowledge structure',
    description:
        'Create a portable starter structure and link ordinary Markdown safely.',
  ),
  _Page(
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    description:
        'Resolve workspace, manifest, graph, automation, Git, file, API, and layout problems.',
  ),
  _Page(
    slug: 'faq',
    title: 'Frequently asked questions',
    description:
        'Quick answers about purpose, everyday use, folders, graphs, APIs, OKF, backups, and onboarding.',
  ),
];

final _htmlEscape = HtmlEscape(HtmlEscapeMode.element);

Future<void> main(List<String> arguments) async {
  final siteRoot = File.fromUri(Platform.script).parent.parent;
  final selected = arguments.isEmpty
      ? _pages
      : _pages
            .where((page) => arguments.contains(page.slug))
            .toList(growable: false);

  if (selected.isEmpty) {
    stderr.writeln(
      'No known page was selected. Use: '
      '${_pages.map((page) => page.slug).join(', ')}',
    );
    exitCode = 64;
    return;
  }

  final searchFile = File(
    '${siteRoot.path}${Platform.pathSeparator}assets'
    '${Platform.pathSeparator}js${Platform.pathSeparator}search-index.js',
  );
  final searchEntries = await _readSearchEntries(searchFile);

  for (final page in selected) {
    await _refreshPage(siteRoot, page, searchEntries);
    stdout.writeln('Refreshed manual/${page.slug}.html');
  }

  const encoder = JsonEncoder();
  await searchFile.writeAsString(
    'window.DEVDESK_SEARCH_INDEX = ${encoder.convert(searchEntries)};\n',
    encoding: utf8,
  );
  stdout.writeln('Refreshed assets/js/search-index.js');
  await _refreshSharedBrand(siteRoot);
  stdout.writeln('Refreshed shared website positioning');
}

Future<void> _refreshPage(
  Directory siteRoot,
  _Page page,
  List<Map<String, dynamic>> searchEntries,
) async {
  final separator = Platform.pathSeparator;
  final markdownFile = File(
    '${siteRoot.path}${separator}content$separator${page.slug}.md',
  );
  final htmlFile = File(
    '${siteRoot.path}${separator}manual$separator${page.slug}.html',
  );

  final source = await markdownFile.readAsString(encoding: utf8);
  final body = markdownToHtml(source, extensionSet: ExtensionSet.gitHubWeb);
  final rendered = _addHeadingAnchors(body);
  var document = await htmlFile.readAsString(encoding: utf8);

  final metaStart = document.indexOf('<div class="doc-meta">');
  final bodyStart = document.indexOf('</div>', metaStart) + '</div>'.length;
  final footerStart = document.indexOf(
    '<div class="article-footer">',
    bodyStart,
  );
  if (metaStart < 0 || bodyStart < '</div>'.length || footerStart < 0) {
    throw FormatException(
      'Could not locate article markers in ${htmlFile.path}',
    );
  }
  document = document.replaceRange(
    bodyStart,
    footerStart,
    '\n${rendered.html}\n',
  );

  final tocStart = document.indexOf('<aside class="toc"');
  final tocEnd = document.indexOf('</aside>', tocStart) + '</aside>'.length;
  if (tocStart < 0 || tocEnd < '</aside>'.length) {
    throw FormatException('Could not locate page outline in ${htmlFile.path}');
  }
  document = document.replaceRange(
    tocStart,
    tocEnd,
    _renderToc(rendered.headings),
  );

  document = document.replaceFirst(
    RegExp(r'<meta name="description" content="[^"]*">'),
    '<meta name="description" '
    'content="${_htmlEscape.convert(page.description)}">',
  );
  document = document.replaceFirst(
    RegExp(r'<title>.*?</title>'),
    '<title>${_htmlEscape.convert(page.title)} · DevDesk Manual</title>',
  );
  await htmlFile.writeAsString(document, encoding: utf8);

  final url = 'manual/${page.slug}.html';
  final searchEntry = searchEntries.firstWhere(
    (entry) => entry['url'] == url,
    orElse: () => throw StateError('Search entry not found for $url'),
  );
  searchEntry['title'] = page.title;
  searchEntry['summary'] = page.description;
  searchEntry['text'] = _plainText(body);
}

class _Heading {
  const _Heading({required this.level, required this.id, required this.text});

  final int level;
  final String id;
  final String text;
}

class _RenderedPage {
  const _RenderedPage(this.html, this.headings);

  final String html;
  final List<_Heading> headings;
}

_RenderedPage _addHeadingAnchors(String body) {
  final headings = <_Heading>[];
  final usedIds = <String, int>{};
  final headingPattern = RegExp(
    r'<h([1-3])(?:\s[^>]*)?>(.*?)</h\1>',
    caseSensitive: false,
    dotAll: true,
  );
  final html = body.replaceAllMapped(headingPattern, (match) {
    final level = int.parse(match.group(1)!);
    final inner = match.group(2)!;
    final text = _plainText(inner);
    final base = _slug(text);
    final count = (usedIds[base] ?? 0) + 1;
    usedIds[base] = count;
    final id = count == 1 ? base : '$base-$count';
    headings.add(_Heading(level: level, id: id, text: text));
    return '<h$level id="$id">$inner'
        '<a class="heading-anchor" href="#$id" '
        'aria-label="Link to ${_htmlEscape.convert(text)}">#</a>'
        '</h$level>';
  });
  return _RenderedPage(html, headings);
}

String _renderToc(List<_Heading> headings) {
  final links = headings
      .where((heading) => heading.level == 2 || heading.level == 3)
      .map(
        (heading) =>
            '<a class="level-${heading.level}" href="#${heading.id}">'
            '${_htmlEscape.convert(heading.text)}</a>',
      )
      .join();
  return '<aside class="toc" aria-label="On this page">'
      '<h2>On this page</h2>$links</aside>';
}

String _plainText(String value) {
  final fragment = html_parser.parseFragment(value);
  return (fragment.text ?? '').replaceAll(RegExp(r'\s+'), ' ').trim();
}

String _slug(String value) {
  final slug = value
      .toLowerCase()
      .replaceAll(RegExp(r'[^a-z0-9]+'), '-')
      .replaceAll(RegExp(r'^-+|-+$'), '');
  return slug.isEmpty ? 'section' : slug;
}

Future<List<Map<String, dynamic>>> _readSearchEntries(File file) async {
  final source = await file.readAsString(encoding: utf8);
  final start = source.indexOf('[');
  final end = source.lastIndexOf(']');
  if (start < 0 || end < start) {
    throw const FormatException('Search index does not contain a JSON array.');
  }
  final decoded = jsonDecode(source.substring(start, end + 1)) as List<dynamic>;
  return decoded
      .map((entry) => Map<String, dynamic>.from(entry as Map))
      .toList(growable: true);
}

Future<void> _refreshSharedBrand(Directory siteRoot) async {
  final files = <File>[
    File('${siteRoot.path}${Platform.pathSeparator}404.html'),
    File('${siteRoot.path}${Platform.pathSeparator}downloads.html'),
    ...Directory(
      '${siteRoot.path}${Platform.pathSeparator}manual',
    ).listSync().whereType<File>().where((file) => file.path.endsWith('.html')),
  ];
  for (final file in files) {
    var source = await file.readAsString(encoding: utf8);
    source = source
        .replaceAll(
          '<button class="search-btn" type="button" data-search>',
          '<button class="search-btn" type="button" data-search '
              'aria-label="Search manual">',
        )
        .replaceAll('Developer workspace', 'Your files. Your workspace.')
        .replaceAll(
          'Local knowledge, APIs, and developer tools',
          'Plans, knowledge, APIs, and developer tools',
        )
        .replaceAll(
          '>Developer Workspaces</a>',
          '>Folders, portability, and Git</a>',
        )
        .replaceAll('>Knowledge Workspace</a>', '>Edit workspace Markdown</a>')
        .replaceAll('>Knowledge Graph</a>', '>Relationships and graph</a>')
        .replaceAll(
          '<h2>Structured Knowledge / OKF</h2>',
          '<h2>Structure checks (OKF)</h2>',
        )
        .replaceAll(
          '>Structured Knowledge and OKF</a>',
          '>Structure checks (OKF)</a>',
        )
        .replaceAll('>API Workspaces</a>', '>Saved API testing</a>')
        .replaceAll('>Unified Search</a>', '>Search this workspace</a>')
        .replaceAll(
          '>Diff Workspace and local Git</a>',
          '>Compare files and scoped Git</a>',
        );
    await file.writeAsString(source, encoding: utf8);
  }
}
