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
    slug: 'user-manual',
    title: 'Complete user manual',
    description:
        'A beginner-first guide to local-first workspaces, focused AI project context, reviewed changes, knowledge, APIs, Git, backup, and platform help.',
  ),
  _Page(
    slug: 'visual-feature-guide',
    title: 'Visual feature guide',
    description:
        'Recognize every major DevDesk screen through app-matched HTML and CSS illustrations, then open the exact focused guide.',
  ),
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
    slug: 'workspace-workbench',
    title: 'Workspace workbench, tabs, and tools',
    description:
        'Manage five visible tabs, hidden editors, contextual tools, Source Control, project terminals, and responsive workspace panels.',
  ),
  _Page(
    slug: 'downloads-installation',
    title: 'Downloads and installation',
    description:
        'Install or update DevDesk from Microsoft Store or get it on Google Play.',
  ),
  _Page(
    slug: 'backup-restore',
    title: 'Backup, reinstall, and restore',
    description:
        'Protect independent data, reconnect external workspaces, and recover safely after reinstall.',
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
    slug: 'json-tools',
    title: 'JSON Tools',
    description:
        'Validate, format, and save JSON while keeping workspace and independent files separate.',
  ),
  _Page(
    slug: 'openapi-studio',
    title: 'OpenAPI Studio',
    description:
        'Validate OpenAPI documents and choose or create project-scoped specifications safely.',
  ),
  _Page(
    slug: 'knowledge-workspace',
    title: 'Edit workspace Markdown',
    description:
        'Edit project Markdown with bounded files, conflict checks, context, and derived knowledge.',
  ),
  _Page(
    slug: 'markdown-editor',
    title: 'Markdown Editor',
    description:
        'Write one portable Markdown file with syntax highlighting, outline, focus, find, preview, and conflict-safe saves.',
  ),
  _Page(
    slug: 'knowledge-graph',
    title: 'Relationships and graph',
    description:
        'Explore clean local and workspace relationships, filters, accessible lists, link editing, and undo.',
  ),
  _Page(
    slug: 'structured-views',
    title: 'Structured workspace views',
    description:
        'Compare Markdown-backed work in safe tables, cards, maps, and portable saved views.',
  ),
  _Page(
    slug: 'visual-canvas',
    title: 'Visual Canvas',
    description:
        'Brainstorm with portable JSON Canvas nodes, groups, links, and connections.',
  ),
  _Page(
    slug: 'diagram-studio',
    title: 'Diagram Studio',
    description:
        'Create flowcharts, software diagrams, mind maps, research maps, and study plans in portable project files with PNG or SVG export.',
  ),
  _Page(
    slug: 'agent-connector',
    title: 'AI Agent Connector',
    description:
        'Connect Codex, Gemini CLI, or another MCP client to selected DevDesk workspace context with explicit permissions and review-only changes.',
  ),
  _Page(
    slug: 'ai-workbench',
    title: 'AI Harness, Workbench, and coding agents',
    description:
        'Use standalone review-first AI with bounded files and photos, or use project coding, Windows verification, parallel worktrees, and the isolated Edge Browser Agent safely.',
  ),
  _Page(
    slug: 'notifications-routines',
    title: 'Notifications and AI routines',
    description:
        'Review local alerts and schedule AI prompts that always wait for user confirmation.',
  ),
  _Page(
    slug: 'structured-knowledge-okf',
    title: 'Structure checks (OKF)',
    description:
        'Follow the real app buttons to analyze Markdown, preview safe fixes, create a concept, and understand every finding.',
  ),
  _Page(
    slug: 'okf-bundle-structure',
    title: 'OKF bundle structure',
    description:
        'Understand concepts, indexes, logs, and the smallest useful portable folder layout.',
  ),
  _Page(
    slug: 'okf-concepts-metadata',
    title: 'OKF concepts and metadata',
    description:
        'Create a first structured concept with the app form and understand each field.',
  ),
  _Page(
    slug: 'okf-conversion-migration',
    title: 'Analyze, improve, and migrate project knowledge',
    description:
        'Convert existing Markdown through an exact previewed, conflict-safe, recoverable workflow.',
  ),
  _Page(
    slug: 'okf-trust-sources-lifecycle',
    title: 'Sources, trust, freshness, and lifecycle',
    description:
        'Add real sources, record actual verification, and manage draft, stable, stale, or deprecated content.',
  ),
  _Page(
    slug: 'okf-attested-computation',
    title: 'Attested Computation',
    description:
        'Document an advanced computation contract without executing code or inventing attestation results.',
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
  _Page(
    slug: 'settings-appearance',
    title: 'Settings and appearance',
    description:
        'Adjust appearance, reopen onboarding and manuals, use Store access, and understand local reset.',
  ),
  _Page(
    slug: 'keyboard-shortcuts',
    title: 'Keyboard shortcuts and accessibility',
    description:
        'Use keyboard navigation, conflict-safe saves, and accessible controls.',
  ),
  _Page(
    slug: 'privacy-security',
    title: 'Privacy and security',
    description:
        'Understand local-first files, protected values, execution trust, and user-initiated network actions.',
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
  if (!htmlFile.existsSync()) {
    final template = File(
      '${siteRoot.path}${separator}manual${separator}getting-started.html',
    );
    await htmlFile.writeAsString(
      await template.readAsString(encoding: utf8),
      encoding: utf8,
    );
  }
  var document = await htmlFile.readAsString(encoding: utf8);
  document = _prepareManualTemplate(document, page.slug);

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
    '\n${_secureExternalLinks(rendered.html)}\n',
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
  var searchEntry = <String, dynamic>{};
  for (final entry in searchEntries) {
    if (entry['url'] == url) {
      searchEntry = entry;
      break;
    }
  }
  if (searchEntry.isEmpty) {
    searchEntry = <String, dynamic>{'group': 'Start here', 'url': url};
    searchEntries.insert(0, searchEntry);
  }
  searchEntry['title'] = page.title;
  searchEntry['summary'] = page.description;
  searchEntry['text'] = _plainText(body);
  if (page.slug == 'agent-connector' ||
      page.slug == 'ai-workbench' ||
      page.slug == 'notifications-routines') {
    searchEntry['group'] = 'Safety and reference';
  }
  if (page.slug == 'diagram-studio') {
    searchEntry['group'] = 'Knowledge and Markdown';
  }
}

String _prepareManualTemplate(String source, String slug) {
  source = source.replaceAll(
    '>AI Workbench and coding agents</a>',
    '>AI Harness, Workbench, and coding agents</a>',
  );
  const startHeading = '<h2>Start here</h2>';
  const knowledgeGraphLink =
      '<a class="" href="../manual/knowledge-graph.html">'
      'Relationships and graph</a>';
  const safetyHeading = '<h2>Safety and reference</h2>';
  final userManualLink = slug == 'user-manual'
      ? '<a class="active" href="../manual/user-manual.html" '
          'aria-current="page">Complete user manual</a>'
      : '<a class="" href="../manual/user-manual.html">'
          'Complete user manual</a>';
  if (!source.contains('>Complete user manual</a>')) {
    source = source.replaceFirst(
      startHeading,
      '$startHeading\n$userManualLink',
    );
  }
  for (final page in const <(String, String)>[
    ('workspace-workbench', 'Workspace workbench and tabs'),
    ('visual-feature-guide', 'Visual feature guide'),
  ]) {
    final link = slug == page.$1
        ? '<a class="active" href="../manual/${page.$1}.html" '
            'aria-current="page">${page.$2}</a>'
        : '<a class="" href="../manual/${page.$1}.html">${page.$2}</a>';
    if (!source.contains('>${page.$2}</a>')) {
      source = source.replaceFirst(startHeading, '$startHeading\n$link');
    }
    if (slug == page.$1) {
      source = source.replaceFirst(
        '<a class="" href="../manual/${page.$1}.html">${page.$2}</a>',
        link,
      );
      source = source.replaceFirst(
        '<a class="active" href="../manual/getting-started.html" '
            'aria-current="page">Getting started</a>',
        '<a class="" href="../manual/getting-started.html">Getting started</a>',
      );
    } else {
      source = source.replaceFirst(
        '<a class="active" href="../manual/${page.$1}.html" '
            'aria-current="page">${page.$2}</a>',
        '<a class="" href="../manual/${page.$1}.html">${page.$2}</a>',
      );
    }
  }
  for (final page in const <(String, String)>[
    ('agent-connector', 'AI Agent Connector'),
    ('ai-workbench', 'AI Harness, Workbench, and coding agents'),
    ('notifications-routines', 'Notifications and AI routines'),
  ]) {
    final link = slug == page.$1
        ? '<a class="active" href="../manual/${page.$1}.html" '
            'aria-current="page">${page.$2}</a>'
        : '<a class="" href="../manual/${page.$1}.html">${page.$2}</a>';
    if (!source.contains('>${page.$2}</a>')) {
      source = source.replaceFirst(safetyHeading, '$safetyHeading\n$link');
    }
    if (slug == page.$1) {
      source = source.replaceFirst(
        '<a class="" href="../manual/${page.$1}.html">${page.$2}</a>',
        link,
      );
    } else {
      source = source.replaceFirst(
        '<a class="active" href="../manual/${page.$1}.html" '
            'aria-current="page">${page.$2}</a>',
        '<a class="" href="../manual/${page.$1}.html">${page.$2}</a>',
      );
    }
  }
  if (slug == 'user-manual') {
    source = source.replaceFirst(
      '<a class="active" href="../manual/getting-started.html" '
          'aria-current="page">Getting started</a>',
      '<a class="" href="../manual/getting-started.html">Getting started</a>',
    );
    source = source.replaceFirst(
      RegExp(r'<div class="article-footer">.*?</div></article>', dotAll: true),
      '<div class="article-footer"><span></span>'
      '<a class="pager" href="getting-started.html">'
      '<small>Next</small><strong>Getting started</strong></a>'
      '</div></article>',
    );
  }
  if (slug == 'agent-connector') {
    source = source.replaceFirst(
      '<a class="active" href="../manual/getting-started.html" '
          'aria-current="page">Getting started</a>',
      '<a class="" href="../manual/getting-started.html">Getting started</a>',
    );
    source = source.replaceFirst(
      '<span>Start here</span></div><div class="doc-meta">'
          '<span class="doc-chip">Start here</span>'
          '<span class="doc-chip">Offline documentation</span>'
          '<span class="doc-chip">Android + Windows</span>',
      '<span>AI Agent Connector</span></div><div class="doc-meta">'
          '<span class="doc-chip">Safety and reference</span>'
          '<span class="doc-chip">Local MCP</span>'
          '<span class="doc-chip">Windows + Android</span>',
    );
    source = source.replaceFirst(
      RegExp(r'<div class="article-footer">.*?</div></article>', dotAll: true),
      '<div class="article-footer">'
      '<a class="pager" href="settings-appearance.html">'
      '<small>Previous</small><strong>Settings and appearance</strong></a>'
      '<a class="pager" href="privacy-security.html">'
      '<small>Next</small><strong>Privacy and security</strong></a>'
      '</div></article>',
    );
  }
  for (final page in const <(String, String)>[
    ('structured-views', 'Structured workspace views'),
    ('visual-canvas', 'Visual Canvas'),
    ('diagram-studio', 'Diagram Studio'),
  ]) {
    final link = slug == page.$1
        ? '<a class="active" href="../manual/${page.$1}.html" '
            'aria-current="page">${page.$2}</a>'
        : '<a class="" href="../manual/${page.$1}.html">${page.$2}</a>';
    if (!source.contains('>${page.$2}</a>')) {
      source = source.replaceFirst(
        knowledgeGraphLink,
        '$knowledgeGraphLink\n$link',
      );
    }
    if (slug == page.$1) {
      source = source.replaceFirst(
        '<a class="" href="../manual/${page.$1}.html">${page.$2}</a>',
        link,
      );
      source = source.replaceFirst(
        '<a class="active" href="../manual/getting-started.html" '
            'aria-current="page">Getting started</a>',
        '<a class="" href="../manual/getting-started.html">Getting started</a>',
      );
    } else {
      source = source.replaceFirst(
        '<a class="active" href="../manual/${page.$1}.html" '
            'aria-current="page">${page.$2}</a>',
        '<a class="" href="../manual/${page.$1}.html">${page.$2}</a>',
      );
    }
  }
  if (!source.contains('>Demo project</a>')) {
    source = source.replaceFirst(
      'href="../downloads.html">Downloads</a>',
      'href="../downloads.html">Downloads</a>\n'
          '    <a class="nav-demo" href="../downloads.html#agent-demo">'
          'Demo project</a>',
    );
  }
  final pageChrome = switch (slug) {
    'visual-feature-guide' => (
        'Visual feature guide',
        'Visual guide',
        'HTML + CSS previews',
        'Android + Windows',
      ),
    'workspace-workbench' => (
        'Workspace workbench and tabs',
        'Workspace',
        'Project context',
        'Windows + Android',
      ),
    'diagram-studio' => (
        'Diagram Studio',
        'Visual tools',
        'Portable .flowchart',
        'Android + Windows',
      ),
    'ai-workbench' => (
        'AI Harness, Workbench, and coding agents',
        'AI Harness',
        'Files + photos',
        'Windows + Android',
      ),
    'notifications-routines' => (
        'Notifications and AI routines',
        'Local notifications',
        'Review-first schedules',
        'Windows + Android',
      ),
    _ => null,
  };
  if (pageChrome != null) {
    source = source.replaceFirst(
      '<span>Start here</span></div><div class="doc-meta">'
          '<span class="doc-chip">Start here</span>'
          '<span class="doc-chip">Offline documentation</span>'
          '<span class="doc-chip">Android + Windows</span>',
      '<span>${pageChrome.$1}</span></div><div class="doc-meta">'
          '<span class="doc-chip">${pageChrome.$2}</span>'
          '<span class="doc-chip">${pageChrome.$3}</span>'
          '<span class="doc-chip">${pageChrome.$4}</span>',
    );
  }
  final footer = switch (slug) {
    'visual-feature-guide' => '<div class="article-footer"><span></span>'
        '<a class="pager" href="getting-started.html">'
        '<small>Next</small><strong>Getting started</strong></a></div>',
    'workspace-workbench' => '<div class="article-footer">'
        '<a class="pager" href="interface-tour.html">'
        '<small>Previous</small><strong>Interface tour</strong></a>'
        '<a class="pager" href="developer-workspaces.html">'
        '<small>Next</small><strong>Folders and portability</strong></a></div>',
    'diagram-studio' => '<div class="article-footer">'
        '<a class="pager" href="visual-canvas.html">'
        '<small>Previous</small><strong>Visual Canvas</strong></a>'
        '<a class="pager" href="structured-views.html">'
        '<small>Next</small><strong>Structured workspace views</strong></a></div>',
    'ai-workbench' => '<div class="article-footer">'
        '<a class="pager" href="agent-connector.html">'
        '<small>Previous</small><strong>AI Agent Connector</strong></a>'
        '<a class="pager" href="notifications-routines.html">'
        '<small>Next</small><strong>Notifications and AI routines</strong></a></div>',
    'notifications-routines' => '<div class="article-footer">'
        '<a class="pager" href="ai-workbench.html">'
        '<small>Previous</small><strong>AI Harness and Workbench</strong></a>'
        '<a class="pager" href="privacy-security.html">'
        '<small>Next</small><strong>Privacy and security</strong></a></div>',
    _ => null,
  };
  if (footer != null) {
    source = source.replaceFirst(
      RegExp(r'<div class="article-footer">.*?</div>', dotAll: true),
      footer,
    );
  }
  return source
      .replaceAll(
        'href="../manual/getting-started.html">Manual</a>',
        'href="../manual/user-manual.html">Manual</a>',
      )
      .replaceAll(
        '<a href="getting-started.html">Manual</a>',
        '<a href="user-manual.html">Manual</a>',
      );
}

String _secureExternalLinks(String source) {
  return source.replaceAllMapped(
    RegExp(r'<a href="https?://[^"]+"'),
    (match) => '${match.group(0)} target="_blank" '
        'rel="noopener noreferrer"',
  );
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
        (heading) => '<a class="level-${heading.level}" href="#${heading.id}">'
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
    final isManualPage = file.parent.path.endsWith(
      '${Platform.pathSeparator}manual',
    );
    final isUserManual = file.uri.pathSegments.last == 'user-manual.html';
    if (isManualPage) {
      final slug = file.uri.pathSegments.last.replaceFirst('.html', '');
      source = _prepareManualTemplate(source, slug);
      if (!source.contains('manual-visuals.js')) {
        source = source.replaceFirst(
          '<script defer src="../assets/js/app.js"></script>',
          '<script defer src="../assets/js/app.js"></script>'
              '<script defer src="../assets/js/manual-visuals.js"></script>',
        );
      }
    }
    if (isManualPage && !source.contains('>Complete user manual</a>')) {
      final link = isUserManual
          ? '<a class="active" href="../manual/user-manual.html" '
              'aria-current="page">Complete user manual</a>'
          : '<a class="" href="../manual/user-manual.html">'
              'Complete user manual</a>';
      source = source.replaceFirst(
        '<h2>Start here</h2>',
        '<h2>Start here</h2>\n$link',
      );
    }
    if (isManualPage && !source.contains('>AI Agent Connector</a>')) {
      final isAgentConnector =
          file.uri.pathSegments.last == 'agent-connector.html';
      final link = isAgentConnector
          ? '<a class="active" href="../manual/agent-connector.html" '
              'aria-current="page">AI Agent Connector</a>'
          : '<a class="" href="../manual/agent-connector.html">'
              'AI Agent Connector</a>';
      source = source.replaceFirst(
        '<h2>Safety and reference</h2>',
        '<h2>Safety and reference</h2>\n$link',
      );
    }
    source = source
        .replaceAll(
          '<button class="search-btn" type="button" data-search>',
          '<button class="search-btn" type="button" data-search '
              'aria-label="Search manual">',
        )
        .replaceAll('Developer workspace', 'Your files. Your workspace.')
        .replaceAll(
          'Local knowledge, APIs, and developer tools',
          'Everyday work, study, research, and software',
        )
        .replaceAll(
          'Plans, knowledge, APIs, and developer tools',
          'Everyday work, study, research, and software',
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
        )
        .replaceAll(
          'href="../manual/getting-started.html">Manual</a>',
          'href="../manual/user-manual.html">Manual</a>',
        )
        .replaceAll(
          '<a href="getting-started.html">Manual</a>',
          '<a href="user-manual.html">Manual</a>',
        )
        .replaceAll(
          'https://baisalya.github.io/devdesk-support/privacy-policy.html',
          'https://baisalya.github.io/Baisalya-Roul/devdesk/privacy-policy.html',
        )
        .replaceAll(
          '<link rel="icon" href="../assets/img/devdesk-logo.png">',
          '<link rel="icon" type="image/png" sizes="64x64" '
              'href="../assets/img/devdesk-logo-64.png">',
        )
        .replaceAll(
          '<link rel="icon" href="assets/img/devdesk-logo.png">',
          '<link rel="icon" type="image/png" sizes="64x64" '
              'href="assets/img/devdesk-logo-64.png">',
        )
        .replaceAll(
          '<img src="../assets/img/devdesk-logo.png" alt="">',
          '<img src="../assets/img/devdesk-logo-128.png" '
              'alt="DevDesk application logo">',
        )
        .replaceAll(
          '<img src="assets/img/devdesk-logo.png" alt="">',
          '<img src="assets/img/devdesk-logo-128.png" '
              'alt="DevDesk application logo">',
        )
        .replaceAll('rel="noopener"', 'rel="noopener noreferrer"');
    await file.writeAsString(source, encoding: utf8);
  }
}
