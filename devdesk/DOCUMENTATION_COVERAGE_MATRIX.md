# DevDesk documentation coverage matrix

## Evidence status

The static site and its documentation sources are directly verifiable. The
Flutter application lives in the separate reviewed DevDesk repository at
`C:\Users\baish\StudioProjects\devdesk`. Rows with application source paths were
checked against that code; older feature rows retain their original evidence
limits instead of inventing verification.

| Actual or published feature | Source/evidence files | Entry point | User purpose | Manual section | Existing tests | Missing documentation or source | Safety warning required |
|---|---|---|---|---|---|---|---|
| Create workspace from profile | `content/getting-started.md`, `content/developer-workspaces.md` | Home > New workspace | Start a user-owned folder | Global manual: First Five Minutes | Static link/content validation | Flutter flow source unavailable | Existing path is never replaced |
| Open existing folder | `content/developer-workspaces.md` | Home > Open folder | Use current files | Understanding a Workspace | Static validation | Flutter picker tests unavailable | Open once versus portable manifest |
| `project.devdesk` portability | `content/developer-workspaces.md`, `content/faq.md` | Open manifest | Reopen after copy/clone | Understanding a Workspace | Static validation | Manifest parser source unavailable | Never store secrets or commands |
| Planning views | `content/getting-started.md`, `content/interface-tour.md` | Workspace > Tasks / Views | Plan and track work | Planning Your Work | Static validation | Widget/view tests unavailable | Same source item across views |
| Project file explorer | `content/developer-workspaces.md` | Files > Open explorer | Browse/create nested files | Markdown Beginners | Static validation | Filesystem adapter tests unavailable | Exclusive create; block unsafe names |
| Markdown editing | `content/markdown-basics.md`, `content/knowledge-workspace.md` | Notes / Edit Markdown | Write portable notes | Markdown Beginners | Static validation | Editor widget tests unavailable | External edits must not be overwritten |
| Links and backlinks | `content/links-backlinks-nodes.md` | Markdown editor / inspector | Connect notes | Connecting Notes | Static validation | Parser/navigation tests unavailable | Review broken/ambiguous links |
| Properties/frontmatter | `content/frontmatter-properties.md` | Properties | Organize by metadata | Properties and Metadata | Static validation | Properties UI tests unavailable | Malformed YAML blocks save/analysis |
| Knowledge graph | `content/knowledge-graph.md` | Views > Relationships | Explore connections | Knowledge Graph | Static validation | Canvas/responsive tests unavailable | Graph does not prove truth |
| AI Agent Connector | `C:\Users\baish\StudioProjects\devdesk\lib\features\agent_connector\`; `content/agent-connector.md` | Settings > DevDesk Agent Connector | Let an MCP-compatible client use selected workspace structure | Connect an AI Agent; AI Agent Connector | Protocol, loopback transport, permissions, proposal, approval, responsive widget, and static production tests; full current suite is a release gate | Physical third-party Codex/Gemini end-to-end connection remains a release smoke check | Loopback only; compatible client must be on the same device; optional text/proposals off by default; no direct writes; review AI-provider privacy |
| AI Harness, Workbench, and coding agents | `C:\Users\baish\StudioProjects\devdesk\lib\features\ai_workbench\`; `lib\features\ai\`; `lib\features\ai_parallel_agents\`; `lib\features\browser_agent\`; `content/ai-workbench.md` | All tools > AI Harness; project AI Workbench | Use an in-app provider for everyday prompts, bounded text/photo input, reviewed coding, verification, parallel workers, and browser evidence | AI Harness, Workbench, and coding agents | Multimodal provider encoding, focused harness/workbench/project-intelligence/parallel-agent/Browser Agent suites; static manual validation | Live provider, clean-MSIX, physical-device, and secure-login smoke tests remain release checks | Image bytes are transient; Windows commands use current-user authority, not an OS sandbox; Android has no Windows terminal/worktree/Edge path |
| Notifications and AI routines | `C:\Users\baish\StudioProjects\devdesk\lib\features\notifications\`; `content/notifications-routines.md` | Bell > Notifications & Routines | Review local app alerts and schedule review-first prompts | Notifications and AI routines | Domain, due-recovery, recurrence, action, analysis, and static manual tests | OS background notifications/widgets and other-app notification access remain later native phases | Phase 1 checks while app runs and recovers the latest missed occurrence at next launch; no silent send/reply/post |
| Graph connection editing | `content/graph-connection-editing.md` | Graph > Edit links | Add/remove portable links | Connecting Notes | Static validation | Conflict/undo tests unavailable | Only managed block can be removed |
| Workspace search | `content/unified-search.md` | Search workspace | Find project content | Search and Navigation | Static validation | Indexer tests unavailable | Keep results workspace-scoped |
| OKF validation and concept creation | `C:\Users\baish\StudioProjects\devdesk\lib\features\okf\presentation\okf_dashboard_page.dart`; `domain/okf_validator.dart`; `domain/okf_template_service.dart` | Developer tools > Structure and OKF | Analyze portable structure and create a concept | Open Knowledge Format; Structure checks; Concepts and metadata | 27 targeted OKF service/widget tests passed; static website validation | Full application source remains external to this website repository | Required vs optional findings; creating a concept writes a new file and never replaces an existing path |
| OKF reviewed conversion and managed plans | `C:\Users\baish\StudioProjects\devdesk\lib\features\okf\data\okf_workspace_service.dart`; `domain/okf_models.dart`; `domain/okf_metadata.dart` | Review safe fixes > Analyze and preview > Apply reviewed plan | Improve existing Markdown with preview, conflict checks, recovery, rollback, and undo | Open Knowledge Format; Analyze, improve, and migrate | 27 targeted OKF service/widget tests passed; static website validation | Physical Android provider behavior remains a release-time check | Back up; review every proposed file; stale fingerprints stop writes; external edits are preserved |
| Quick API | `content/quick-api.md` | API Studio > Quick API | Send one request | API Workspaces | Static validation | Network/widget tests unavailable | Review URL, auth, body, destination |
| Saved API workspaces | `content/api-workspaces.md` | API Studio | Reuse collections and environments | API Workspaces | Static validation | Engine/UI source unavailable | Portable structure excludes secrets |
| API environments/secrets | `content/api-environments-secrets.md` | API workspace > Environments | Switch targets safely | API Workspaces | Static validation | Keystore/DPAPI tests unavailable | Least privilege; do not export secrets |
| Assertions/extraction/runner | `content/api-assertions-extraction.md` | Saved request / Runner | Repeat response checks | API Workspaces | Static validation | Runner tests unavailable | Stale extracted values can mislead |
| OpenAPI Studio | `content/openapi-studio.md` | Developer tools > OpenAPI | Inspect contract/create collection | OpenAPI Studio | Static validation | Parser/collection tests unavailable | Validation does not prove server safety |
| JSON Tools | `content/json-tools.md` | All tools > JSON | Format/validate structured data | JSON Tools | Static validation | Utility tests unavailable | Review sensitive clipboard/export data |
| Scoped Git | `content/diff-git.md`, `content/developer-workspaces.md` | Developer tools > Git status | Review/stage bounded changes | Git Tools | Static validation | Process/pathspec tests unavailable | Trust is local; scope must not broaden |
| Backup/import | `content/backup-restore.md` | Settings > Backup | Protect app data | Moving and Backing Up | Static validation | Import rollback tests unavailable | External folders and secrets are separate |
| Settings/onboarding | `content/settings-appearance.md` | Settings | Theme, manuals, replay onboarding | Windows/Android guides | Static validation | App navigation tests unavailable | Clear All Data removes private records |
| Windows install/update | `content/downloads-installation.md`, `assets/js/site-config.js` | Downloads / Microsoft Store | Install/update Windows app | Windows Guide | Release content validator | MSIX/Windows source absent | Use official Store listing |
| Android production | `content/downloads-installation.md`, `assets/js/site-config.js` | Downloads / support | Join test and install | Android Guide | Release content validator | Android packaging source absent | Do not expose tester addresses |
| Privacy/security | `content/privacy-security.md` | Settings / manual | Understand data boundaries | Privacy and Security | Static validation | Fresh code-level network audit unavailable | API/external destinations receive data |
| Troubleshooting | `content/troubleshooting.md` | Help / manual | Recover common failures | Troubleshooting | Static validation | In-app deep-link tests unavailable | Preserve external edits and backups |

## Coverage action completed

- Added one beginner-first global manual with 24 required subject sections.
- Added a complete “My First App Project” walkthrough.
- Expanded the searchable manual to 49 topics with a visual feature atlas,
  Diagram Studio, workspace workbench, and separate AI Workbench guide.
- Added an app-matched HTML/CSS preview to every manual page without embedding
  private workspace screenshots.
- Added global-manual navigation and official deeper-learning links.
- Added explicit Store/production/install/update guidance.
- Added the Windows AI Agent Connector guide, global-manual section, search
  entry, safety guidance, and verified code/test evidence.
- Added a distinct in-app AI Workbench module covering provider setup,
  review-first changes, Windows execution boundaries, verification, parallel
  worktrees, Browser Agent handoff, Android limits, and release evidence.

## Coverage action blocked by missing source

- In-app Settings/About/Help Store buttons.
- In-app manual routes, onboarding replay navigation, tooltips, and empty states.
- Windows/Android launcher and package icons.
- Flutter navigation, link-launch, responsive, text-scale, and platform tests.
