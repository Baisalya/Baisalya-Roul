# DevDesk documentation audit — 2026-08-13

## Scope

This audit compared the static product/manual website in this directory with
the current DevDesk application source at
`C:\Users\baish\StudioProjects\devdesk`. The website repository was clean at
the start of the audit. The application repository contained in-progress graph
work, so this report describes those controls as current implementation under
review rather than a released Store guarantee.

## What was already strong

- 45 searchable beginner and focused manual pages.
- Complete manual, platform installation, privacy, backup, API, OpenAPI, JSON,
  Markdown, OKF, Git, AI Agent Connector, structured-view, and Canvas guidance.
- Offline search, service worker caching, responsive sidebar, theme support,
  static support assistant, sitemap, and manifest.
- Maintained Markdown sources and a Dart generator/validator.

## Missing or materially outdated guidance found

| Gap | Current application evidence | Risk to users | Upgrade |
|---|---|---|---|
| No Diagram Studio guide | `lib/features/flowchart/` and `/flowchart` routing | Users could not discover project diagrams, templates, shapes, export, or responsive controls | Added `diagram-studio` source and generated guide |
| Workbench was explained only in fragments | `lib/features/workbench/` and workspace shell | Five visible tabs, hidden editors, contextual panels, Source Control, and terminals were hard to learn | Added one end-to-end workbench guide |
| Graph guide covered only basic options | current `knowledge_graph_view.dart` and preferences models | Groups, timeline, Local replay, floating play, forces, and large-graph spacing had no user explanation | Expanded the graph guide and troubleshooting |
| Git guide said remote operations did not exist | `GitService.fetch`, `pullFastForward`, `push`, and branch methods | Public guidance contradicted current explicit controls | Updated remote-operation boundaries and warnings |
| Manual was text-first | 45 focused pages with only occasional raster images | New users had to know a tool name before recognizing its screen | Added reusable HTML/CSS app previews to every topic |
| No visual product map | no visual atlas route | Users could not compare Canvas, Diagram, Graph, and structured views quickly | Added searchable/filterable visual feature atlas |

## Design decisions

- Reused the app's dark workbench structure, blue selection state, project
  tree, tool cards, graph panel, shape library, request builder, Source Control,
  and agent-review patterns.
- Built scenes from HTML and CSS so they remain responsive, theme-independent,
  privacy-safe, and maintainable without a folder of stale screenshots.
- Kept illustrations non-interactive and labeled as guidance. Links open the
  real focused instructions.
- Used one mapping script for all focused pages so a new guide can receive a
  relevant visual by adding one slug-to-scene entry.

## Ongoing maintenance rule

When a user-facing route, label, workspace tool, platform limit, or safety
boundary changes in the app, update its Markdown source, the visual scene map,
the search entry, and the coverage matrix in the same documentation release.

