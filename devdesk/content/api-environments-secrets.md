# API environments and protected secrets

An environment is a named set of values for a target such as Development, Staging, or Production. It prevents the same request from being copied only to change a base URL or credential.

## Example environment

```text
Environment: Staging
baseUrl       = https://staging-api.example.com
clientId      = devdesk-test
accessToken   = [protected]
customerId    = cus_123
```

A request can reference those values:

```text
{{baseUrl}}/customers/{{customerId}}
```

## Create and select an environment

1. Open the API workspace.
2. Select **Environments**.
3. Create or select an environment.
4. Give it a clear name.
5. Enter the base URL.
6. Add variables.
7. Mark credentials as secret.
8. Select the environment before sending.

The special environment `baseUrl` field is available as `{{baseUrl}}` unless an enabled environment variable already defines that exact key.

## Variable scopes and precedence

DevDesk resolves variable values in this order, with later scopes overriding earlier ones:

1. Workspace variables.
2. Collection variables.
3. Folder variables.
4. Active environment variables and environment map values.
5. Temporary variables, including extraction results during a run.
6. Request-local variables.

This means a request-local `customerId` overrides an environment `customerId` for that request only.

### Naming rules

Variable placeholders use names such as:

```text
{{baseUrl}}
{{customer_id}}
{{access-token}}
```

Names are case-sensitive. `baseUrl`, `base_url`, and `BaseUrl` are different keys. Disabled variables do not participate in resolution.

## Where variables work

Variables can resolve inside:

- Request URLs.
- Query names and values.
- Header names and values.
- Authentication fields.
- OAuth endpoints, IDs, secrets, scopes, and tokens.
- Raw request bodies.
- Form names and values.
- Multipart file metadata and paths.

The exact request preview lists unresolved names before execution.

## Inherited authentication

Authentication can be set at workspace, collection, folder, or request level. A request with **Inherit** uses the nearest explicit setting:

1. Request, when not Inherit.
2. Folder.
3. Collection.
4. Workspace.
5. No auth when no scope supplies a configuration.

Set a request to **No auth** when it must not receive inherited credentials.

## Supported authentication

- Bearer token.
- Basic username/password.
- API key header.
- API key query.
- OAuth 2.0.

Mark token-like header rows as secret even when they are not created by the authentication editor.

## OAuth 2.0

OAuth configuration can store:

- Grant type.
- Issuer.
- Authorization endpoint.
- Token endpoint.
- Device authorization endpoint.
- Revocation endpoint.
- Client ID and client secret.
- Redirect URI.
- Scopes.
- Access token and refresh token.
- Token type and expiration.

Supported grant foundations are authorization code, authorization code with PKCE, client credentials, and device authorization.

### Recommended OAuth practice

- Prefer PKCE for public mobile or desktop clients.
- Use loopback redirect URIs only with providers that allow them.
- Do not embed confidential server client secrets in a public distributed app.
- Request the minimum scopes required.
- Revoke temporary tokens after testing.
- Never copy refresh tokens into examples or public reports.

The editor can discover OpenID configuration, get a token, refresh it, and revoke it when the provider exposes the required endpoints.

## Protected storage boundary

Secret values use a platform-specific local boundary:

- Android: Keystore-backed encryption key.
- Windows: DPAPI for the current Windows user.

Protected values are excluded from supported sanitized exports, portable backups, logs, and common clipboard flows. Protection at rest does not prevent a secret from being sent when a request deliberately uses it.

## Save secrets in this workspace

Secret persistence is opt-in. Keep **Save secrets in this workspace** disabled when:

- The device is shared.
- The OS account is not trusted.
- The workspace came from an untrusted import.
- The token is short-lived and can be provided at run time.

When enabling persistence, confirm that local account security, device encryption, screen lock, and backups are appropriate for the data.

## Importing secrets

The import preview shows whether a source contains secrets. Choose **Import without secrets** unless you control the source and trust the destination device.

An unsupported-feature report is separate from secret detection. Read both before accepting a migration.

## CLI secrets

For headless runs, prefer environment variables or JSON on stdin rather than committing values into exported workspace JSON.

```text
DEVDESK_SECRET_ACCESS_TOKEN=example
```

or:

```text
{"accessToken":"example"}
```

passed with `--secrets-stdin`.

## Cookie jar

The workspace cookie jar retains cookies across related requests. This is useful for session-based APIs but can silently keep the previous user signed in.

Clear cookies when:

- Switching test accounts.
- Moving from staging to production.
- Reproducing a fresh login.
- Sharing the device.
- Completing a sensitive test.

## Proxy settings

Available proxy modes are system, direct, HTTP, HTTPS, and SOCKS. HTTP/HTTPS/SOCKS modes can include host, port, username, password, and comma-separated no-proxy hosts.

A no-proxy entry can be an exact host, `*`, or a wildcard suffix such as:

```text
*.internal.example.com
```

Do not route production credentials through an untrusted proxy.

## TLS and client certificates

TLS settings can reference:

- PEM client certificate.
- PEM private key.
- Certificate/private-key password.
- One or more custom CA files.
- Exact hosts allowed to use a bad development certificate.

A development certificate exception weakens normal certificate verification for that host. Remove it after the local test and never use a broad exception as a production fix.

## DevDesk Local Agent

The Local Agent setting uses a loopback endpoint and one-time pairing code to establish a short-lived token. Keep it loopback-only. Do not expose the agent port through a router, public firewall rule, tunnel, or untrusted LAN.

## Network preflight

Run preflight before diagnosing a complex request. It helps separate DNS, connection, TLS, proxy, localhost, CORS, and platform limitations from application-level API errors.

## Before sending to production

- Confirm the active environment.
- Read the exact resolved URL.
- Check inherited auth.
- Check cookie state.
- Review proxy and TLS settings.
- Confirm attached files.
- Use a least-privilege credential.
- Back up or snapshot server data before destructive testing.
