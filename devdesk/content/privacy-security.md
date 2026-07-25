# Privacy and security

DevDesk is local-first, but some tools deliberately communicate with destinations you select.

## Local by default

Documents, workspaces, histories, settings, indexes, and snippets are stored locally according to the feature and platform.

## User-initiated network actions

Network activity can occur when you:

- Send an API request
- Fetch supported public GitHub content
- Validate a link
- Open a store, support, privacy, portfolio, or other external page

The destination can receive request content, your public IP address, and normal connection information.

## Protected secrets

Android uses a Keystore-backed boundary and Windows uses DPAPI where supported. Protected secrets are excluded from supported portable backups and exports.

## Files and clipboard

DevDesk accesses files or folders after you choose them. Exported files and clipboard content are outside DevDesk's private storage boundary.

## Reporting a problem

Use the public support repository only for non-sensitive reports. Use the private security-advisory channel or developer email for vulnerabilities and never post tokens, credentials, private bodies, or proprietary code publicly.

## Before sending an API request

Review:

- Final URL and environment
- Authorization and cookies
- Query parameters
- Body and attached files
- Whether HTTPS is used
- Whether the destination is trusted

Redaction of stored/exported output does not remove credentials from a request you deliberately send.

## Public support versus private security

Use public Issues only for non-sensitive bug reports. Use the private security advisory or developer privacy email for vulnerabilities. Never post tokens, private request bodies, proprietary code, or personal data publicly.

## Official policy

The website links to the canonical hosted Privacy Policy. The policy—not a summary page—is the authoritative disclosure for the released build.
