# Verified DevDesk feature inventory

## Verification scope

The requested tree contains the portfolio and the static DevDesk
product/download/manual website. It does **not** contain the Flutter application
source (`pubspec.yaml`, `lib/`, `android/`, or `windows/`).

This inventory therefore distinguishes:

- **Static site implementation:** verified directly in this repository.
- **Published product behavior:** grounded in the 41 maintained Markdown topics
  and existing generated manual, which state that they were reviewed against
  the application source on 2026-07-28.
- **Unavailable for fresh source verification:** application widgets, routing,
  packaging, launcher icons, manifests, signing, and Flutter tests.

No unavailable application behavior is reported as newly implemented.

## Static site implementation

| Surface | Real source |
|---|---|
| Portfolio DevDesk project card | `../index.html`, `../style.css` |
| DevDesk product landing page | `index.html` |
| Platform download cards | `downloads.html`, `assets/js/site-config.js`, `assets/js/app.js` |
| Responsive/light/dark design | `assets/css/styles.css`, `assets/js/app.js` |
| Searchable manual | `assets/js/search-index.js`, `assets/js/app.js`, `manual/*.html` |
| Source documentation | `content/*.md` |
| Manual generation | `tool/refresh_manual.dart` |
| Link/asset/fragment validation | `tool/validate_site.dart` |
| Offline cache | `sw.js` |
| PWA metadata | `site.webmanifest` |

## Published product behavior

| Area | Verified documented behavior |
|---|---|
| Workspaces | Create from profiles, open folder once, or add/open `project.devdesk` |
| Everyday planning | Overview, Inbox, Today, Tasks, Notes, List, Board, Calendar, Timeline, Outline |
| Files | Bounded project explorer, nested folders, exclusive file/folder creation |
| Markdown | Standalone, vault, and project-aware editing paths |
| Knowledge | Links, backlinks, properties, search, issues, local/workspace graph |
| Graph writes | Standard Markdown managed block, one source note, conflict-safe undo |
| OKF | Open Knowledge Format v0.2 checks with required/warning/advice/extension separation |
| API | Quick API and saved API workspaces with collections, environments, assertions, extraction, runner, imports/exports |
| OpenAPI | Swagger 2.0/OpenAPI 3.0/3.1 local inspection and collection generation |
| JSON/utilities | JSON, JWT decode, Regex, Base64, URL, Timestamp, UUID, snippets, README |
| Git | Explicit local trust; status/diff/stage/unstage/protected discard scoped to workspace |
| Backup | Versioned application-data export/import; external project folders remain separate |
| Privacy | Local-first project files; user-initiated API/external-link network actions |
| Platforms | Windows and Android documented; macOS/iOS not publicly released |

## Source gap

Fresh verification and modification of the complete Flutter app requires its
source to be placed inside `C:\Users\baish\Baisalya-Roul` or explicit approval
to add another project path to the task scope.
