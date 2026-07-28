# Privacy and security

DevDesk is local-first, but some tools deliberately communicate with destinations you choose.

## Project data stays in your folder

Markdown, OpenAPI, JSON, and other project artifacts remain in the selected folder. DevDesk may keep device-local registry entries, caches, graph positions, drafts, recovery journals, automation history, recent state, permissions, and trust choices.

`project.devdesk` is portable project configuration. It cannot carry secrets, credentials, absolute paths, commands, scripts, environment variables, execution trust, or personal UI state.

Opening and indexing a project are data operations. They do not run commands, Git, scripts, terminals, AI tools, computations, attesters, or network requests.

## User-initiated network actions

Network activity can occur when you:

- send an API request;
- fetch supported public GitHub content;
- validate a link;
- open a store, support, privacy, portfolio, or other external page.

The destination can receive request content, your public IP address, and normal connection information.

## Protected secrets

Android uses a Keystore-backed boundary and Windows uses DPAPI where supported. Protected secrets are excluded from supported portable backups and exports.

## Files, clipboard, and exports

DevDesk accesses files or folders after you choose them. Exported files and clipboard content are outside DevDesk's private storage boundary.

Removing a workspace registration or clearing private app data does not delete external project folders.

## Execution trust

Local Git or another bounded execution feature requires a separate device-local user decision. A project manifest cannot grant this trust, and opening a project never runs commands automatically.

## Report safely

Use public support only for non-sensitive reports. Use the private security advisory or developer email for vulnerabilities. Never post tokens, credentials, private request bodies, proprietary code, or personal data publicly.
