# Verified DevDesk feature inventory

## Verification scope

The requested tree contains the portfolio and the static DevDesk
product/download/manual website. It does **not** contain the Flutter application
source (`pubspec.yaml`, `lib/`, `android/`, or `windows/`).

This inventory therefore distinguishes:

- **Static site implementation:** verified directly in this repository.
- **Published product behavior:** grounded in the 48 searchable manual topics
  and generated manual. The workbench, Diagram Studio, and advanced graph
  sections were rechecked against the application source on 2026-08-20.
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
| Advanced graph | Filters, custom color groups, Local/Workspace timeline replay, display and force controls, device-local preferences, collision-aware large layouts |
| Visual tools | Portable JSON Canvas plus Diagram Studio `.flowchart` files with shape libraries, templates, auto layout, and PNG/SVG export |
| Workspace workbench | Project tree, five visible tabs, hidden-tab dropdown, contextual tool cards, scoped Source Control, and explicit Windows project terminals |
| AI Harness and Workbench | Standalone project selector, bounded redacted text files, transient vision input, provider profiles, review-first proposals, Windows terminal plans and verification, background recovery, read-only specialists, isolated worktree workers, and visible Edge Browser Agent handoff |
| Notifications and AI routines | Local unread inbox, action routing, retention controls, Once/Daily/Weekdays/Weekly review-first prompt schedules, and missed-occurrence recovery on next app launch |
| Graph writes | Standard Markdown managed block, one source note, conflict-safe undo |
| OKF | Code-verified Open Knowledge Format v0.2 analysis, concept templates, safe-fix preview, reviewed conversion, managed indexes/log, provenance, verification, lifecycle, recovery journal, rollback, and undo |
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

## DevDesk 1.2.4 — Containers & Kubernetes

- Workspace project tool: Containers & Kubernetes
- Runtime Doctor / Setup Center for Docker CLI/Engine, kubectl, kubeconfig/context, cluster/API, namespace, RBAC and version compatibility
- Capability-driven navigation with clear unavailable/disabled reasons
- Docker Applications view for Compose projects and standalone containers
- Canonical Create Container wizard with Simple/Advanced modes and optional start-after-create
- Docker containers, images, volumes, networks and Compose advanced resource screens
- Provider-neutral local-cluster architecture with guided kind/minikube Create Cluster wizard
- Kubernetes Applications view derived from selectors, owners, Service/Ingress/EndpointSlice relationships and Warning events
- Deterministic Kubernetes troubleshooting for crash loops, image pulls, scheduling, readiness, workload conditions, configuration references, backends and events
- Visual Deploy App builder with generated Deployment/Service YAML, resources and probes
- Split Kubernetes resource areas: Workloads, Pods, Network, Configuration, Storage, Nodes and Events
- Shared YAML deployment transaction: client validate → server dry-run → diff → apply → bounded rollout verification
- Optional workload-scoped rollout recovery; arbitrary Kubernetes Apply is not presented as atomic
- Compatibility Center with JSON/YAML Compatibility Packs, version rules, safe aliases, feature warn/disable and Ed25519 trust support
- Compatibility files are data only; arbitrary executable/shell/PowerShell, identity, credential and dangerous flag injection is blocked
- Exact Kubernetes context/namespace guards plus read-only `kubectl auth can-i --quiet` RBAC preflight for guarded operations
- Shared Container Operation Engine for duplicate/conflicting mutation protection, bounded timeouts and stale-identity protection
- Durable Activity & Safety history with interrupted-operation recovery and no stdout/stderr, environment values, kubeconfig credentials or Kubernetes Secret values
- Protected high-impact Docker/Kubernetes resources and exact destructive confirmations
- Desktop runtime boundary; Android entitlement/product experience does not claim a local or remote container runtime

