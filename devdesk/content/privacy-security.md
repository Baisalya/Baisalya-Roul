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

DevDesk does not include an AI provider, AI account, analytics, terminal tool, delete tool, or Git push tool. Your AI client decides where requested context is processed.

## User-initiated network actions

Network activity can occur when you:

- send an API request;
- fetch supported public GitHub content;
- validate a link;
- check the public release record for the current Android or Windows build;
- open a store, support, privacy, portfolio, or other external page.

The Windows download action opens the official Microsoft Store listing. The
Android listing is currently a closed test and may require an approved tester
account.

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
