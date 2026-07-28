# DevDesk website build report

## Delivered

- Standalone static website
- 41 detailed manual pages
- Home, downloads, 404, offline cache, search index, theme and responsive navigation
- Android/Windows download links with transparent macOS availability
- Original DevDesk logo, Structured Knowledge icon and onboarding illustrations
- Source Markdown for every generated manual page

## Important download-link status

- Android URL: `https://play.google.com/store/apps/details?id=com.baishalya.devdesk` (labelled testing)
- Windows URL: `https://github.com/Baisalya/devdesk-support/releases/latest`
- macOS: disabled / not released

## Documentation coverage

- Installation and interface
- Folder creation commands for PowerShell and macOS/Linux shell
- Markdown, YAML frontmatter, links, backlinks, nodes, graph, and graph editing
- OKF v0.2 bundle, concepts, conversion, migration, trust, sources, lifecycle and Attested Computation
- API Studio request fidelity, environments, OAuth/secrets, proxy/TLS, import/export, assertions, extraction, runner/CLI, Quick API, and Swagger/OpenAPI
- Every dashboard utility
- Backup, settings, privacy, shortcuts, troubleshooting and FAQ

## Validation performed

- Static file generation
- Internal manual links and asset path checks
- Chromium desktop and mobile rendering
- JavaScript console check
- Search UI and theme control smoke test
- ZIP integrity test

## Source note

The website documents currently implemented behavior found in the uploaded project. macOS is not presented as a downloadable release because the app's documented release scope is Android and Windows.

## API Studio documentation update (2026-07-26)

- Rewritten API Workspaces, environments/secrets, assertions/extraction, Quick API, and OpenAPI pages.
- Added exact request, response streaming, import compatibility, CLI, network, and current-UI boundary guidance.
- Regenerated the five matching HTML pages and refreshed offline search text.

## Project workspace and graph documentation update (2026-07-28)

- Documented portable `project.devdesk` creation, opening, validation, and recovery.
- Added Workspace Hub, shared project context, automation modes, durable review/undo, Android document-tree access, Windows activation, and local Git trust.
- Corrected OKF guidance so official v0.2 requirements remain separate from warnings, advice, and extensions.
- Updated the graph manual for thin scale-independent curves, hover focus, compact zoom levels, safe link width, standard managed Markdown links, and conflict-safe undo.
- Refreshed matching HTML pages, website search content, and offline cache version.

## Unified simple-workspace documentation update (2026-07-28)

- Replaced the developer-only first-run story with Home, New workspace profiles,
  ordinary Tasks/Notes, flexible views, and progressive developer tools.
- Documented exact creation preview and fingerprint-safe transaction recovery.
- Documented the unified workspace shell, responsive Android/freeform/Windows
  behavior, nested-file explorer, portable automatic API artifact, and
  parent-repository Git boundary.
- Added `tool/refresh_manual.dart` and regenerated Getting started, Interface
  tour, Portable projects, API Workspaces, the search index, and cache version.

## Current verification evidence (2026-07-28)

- Static website integrity: 45 HTML files and 41 search entries passed local
  link, anchor, asset, replacement-character, and search-target checks.
- DevDesk source: `flutter analyze` passed with no issues.
- DevDesk regression suite: 585 tests passed.
- Windows release build and Android debug APK build passed.
- Physical-device browser/app accessibility and performance-budget runs remain
  release-time manual gates.

## Purpose, USP, and simplified manual update (2026-07-28)

- Established the truthful product promise: **One folder. Every view. Every
  tool. Still your files.**
- Rebuilt the landing page around user benefits, separate everyday/developer
  paths, copy-or-clone portability, scoped Git, trust boundaries, and clear
  calls to action.
- Added plain-language first-use content before technical documentation and
  renamed manual navigation without removing advanced detail or search terms.
- Updated platform messaging without advertising unreleased macOS or iOS
  packages.
- Added a maintained product-positioning brief, official-spec-aware Play
  Store/App Store creative prompts, shared-brand regeneration, and a repeatable
  static-site validator.
- Browser-reviewed desktop and 360 px mobile landing, manual, downloads,
  navigation, search results, and horizontal overflow; no console errors were
  reported.
