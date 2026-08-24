# Privacy and security

DevDesk is local-first, but some tools deliberately communicate with destinations you choose.

## Project data stays in your folder

Markdown, OpenAPI, JSON, and other project artifacts remain in the selected folder. DevDesk may keep device-local registry entries, caches, graph positions, drafts, recovery journals, automation history, recent state, permissions, and trust choices.

`project.devdesk` is portable project configuration. It cannot carry secrets, credentials, absolute paths, commands, scripts, environment variables, execution trust, or personal UI state.

Opening and indexing a project are data operations. They do not run commands, Git, scripts, terminals, AI tools, computations, attesters, or network requests.

## AI Agent Connector

The Windows and Android connector is off until you start it. It binds only to
the local device loopback address and requires a random access URL. On Android,
the compatible MCP client must run on the same device and DevDesk must remain
open.

Safe metadata, a bounded project map, graph links, issues, and OKF status are
read-only. **Share redacted workspace text**, change proposals, and scheduled
read-only checks are separate permissions that are off by default. Project-text
sharing covers bounded source, configuration, test, and Markdown reads plus
token-budgeted context packs. DevDesk skips generated folders, links, common
credential paths, binary or non-UTF-8 files, and applies conservative secret
redaction. A scheduled graph-health check stores its plan and run log locally
and cannot edit project files.

A proposal does not write a file. Only **Approve and apply** inside DevDesk can save it, and the save fails when the original file changed.

The external connector does not include an AI provider or AI account and does
not expose terminal, delete, approval, or Git-push tools. Your external AI
client decides where requested connector context is processed.

## AI Workbench, terminal, parallel workers, and browser sessions

The optional in-app AI Workbench connects only to a provider or compatible
local endpoint that you configure. DevDesk does not include free model usage or
a DevDesk-operated model proxy. Provider credentials use protected platform
storage where supported and are excluded from project files and supported
portable exports.

Completed user and assistant messages, bounded redacted run evidence, memory,
pins, proposal links, and recovery checkpoints may remain in DevDesk's private
local storage. Transient tool arguments/results, provider continuation values,
and private model reasoning are not exported as a portable transcript.

Trusted Windows workspaces may use explicitly approved terminal commands,
terminal plans, detected verification, Git worktrees, and an isolated Edge
Browser Agent. Command classification and approval are safety controls, not an
operating-system sandbox: an approved process runs with the current Windows
user's authority. Android does not provide the Windows terminal, Git worktree,
or Edge automation path.

Parallel implementation workers stay inside isolated Git worktrees and cannot
approve their own integration. The main workspace changes only through the
normal reviewed proposal path.

Browser automation uses a temporary Edge profile separate from the normal
browser profile. Sensitive sign-in uses an explicit User control handoff. The
temporary profile is deleted on a best-effort basis when the session closes;
browser cookies and storage are not part of supported portable exports.

See [AI Workbench and coding agents](ai-workbench.html) for the exact platform,
approval, verification, and browser limitations.

## AI Harness attachments, notifications, and routines

AI Harness reads a device file only after the user selects it. Safe text is
bounded and redacted locally. Supported images are transient vision input for
the selected provider request and are not copied into chat history or backups.

Notification Center records, read state, routine schedules, and routine prompts
stay in local DevDesk storage and can be included in a backup. A routine
prepares a reviewable prompt; it does not automatically send, reply, or post.

The current release does not request access to WhatsApp, Facebook, or other
apps' notifications. Those platform-sensitive capabilities remain a separate
roadmap phase requiring prominent consent, revocation, per-app controls, device
tests, and Store-policy review.

## User-initiated network actions

Network activity can occur when you:

- send an API request;
- fetch supported public GitHub content;
- validate a link;
- check the public release record for the current Android or Windows build;
- open a store, support, privacy, portfolio, or other external page.

The Windows download action opens the official Microsoft Store listing. The
Android listing is publicly available on Google Play.

The update check downloads only a small public JSON record from the official
DevDesk website. The installed version comparison happens on your device;
DevDesk does not send workspace content, API data, credentials, or the result
of that comparison to the website.

The destination can receive request content, your public IP address, and normal connection information.

## Protected secrets

Android uses a Keystore-backed boundary and Windows uses DPAPI where supported. Protected secrets are excluded from supported portable backups and exports.

## Files, clipboard, and exports

DevDesk accesses files or folders after you choose them. Exported files and clipboard content are outside DevDesk's private storage boundary.

Removing a workspace registration or clearing private app data does not delete external project folders.

A Reinstall Recovery Kit contains redacted independent application records and
a sanitized workspace reconnection catalog. It excludes raw Android permission
URIs, protected secrets, execution trust, and AI connector access keys. Treat
the exported JSON as sensitive because ordinary notes, URLs, file location
hints, or other confidential non-secret content may still be present.

## Execution trust

Local Git or another bounded execution feature requires a separate device-local user decision. A project manifest cannot grant this trust, and opening a project never runs commands automatically.

## Report safely

Use public support only for non-sensitive reports. Use the private security advisory or developer email for vulnerabilities. Never post tokens, credentials, private request bodies, proprietary code, or personal data publicly.
