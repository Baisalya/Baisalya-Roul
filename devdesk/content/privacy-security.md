# Privacy and security

DevDesk is local-first, but some tools deliberately communicate with destinations you choose.

## Project data stays in your folder

Markdown, OpenAPI, JSON, and other project artifacts remain in the selected folder. DevDesk may keep device-local registry entries, caches, graph positions, drafts, recovery journals, automation history, recent state, permissions, and trust choices.

`project.devdesk` is portable project configuration. It cannot carry secrets, credentials, absolute paths, commands, scripts, environment variables, execution trust, or personal UI state.

Opening and indexing a project are data operations. They do not run commands, Git, scripts, terminals, AI tools, computations, attesters, or network requests.

## AI Agent Connector

The Windows connector is off until you start it. It binds only to the local loopback address and requires a random access URL.

Safe metadata, graph links, issues, and OKF status are read-only. Markdown text sharing and change proposals are separate permissions that are off by default.

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

## Execution trust

Local Git or another bounded execution feature requires a separate device-local user decision. A project manifest cannot grant this trust, and opening a project never runs commands automatically.

## Report safely

Use public support only for non-sensitive reports. Use the private security advisory or developer email for vulnerabilities. Never post tokens, credentials, private request bodies, proprietary code, or personal data publicly.
