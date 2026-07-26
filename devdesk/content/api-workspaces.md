# API Workspaces

API Workspaces is the main saved-workflow area of DevDesk API Studio. It is designed for exact, reusable API work while keeping data local by default.

A workspace can contain collections, recursive folders, requests, environments, workspace/collection/folder/request variables, inherited authentication, cookies, examples, assertions, extraction rules, history, runner reports, documentation, and network settings.

## When to use it

Use API Workspaces when you need any of the following:

- More than one related request.
- Development, staging, and production environments.
- Protected tokens or credentials.
- Inherited authentication.
- Reusable response assertions or extraction rules.
- Collection runs and reports.
- Postman, HAR, Insomnia, cURL, or Bruno migration.
- OpenAPI-generated collections.
- Exported API documentation.

Use **Quick API** for a temporary one-off request that does not need this structure.

## Interface tour

After opening a workspace, the main sections are:

### Collections

Create collections, nested folders, and saved requests. The request tree supports search, duplication, moving a request to the collection root, and item deletion. Each workspace card shows request, folder, and environment counts and can be favourited or archived.

### Environments

Create named target configurations such as Development, Staging, and Production. Each environment can supply `baseUrl` plus ordinary or protected variables.

### Variables

Manage shared workspace variables and inspect temporary values produced by extraction rules. Request-local variables are edited inside each request.

### History

Filter, inspect, re-run, or save a history item as a request. Clear history when a shared device should no longer retain request and response details.

### Runner

Run the selected collection with optional delay and stop-on-failure behavior. Review total, passed, failed, skipped, average response time, and every request result.

### Settings

Edit workspace name, description, documentation, secret persistence, cookie state, preflight, proxy, TLS, and Local Agent settings.

## Create a workspace and collection

1. Select **Create workspace**.
2. Enter a meaningful name, such as `Customer Service API`.
3. Create a collection for one API or bounded service area.
4. Add folders such as `Authentication`, `Customers`, and `Reports`.
5. Create requests at collection root or inside a folder.
6. Add an environment before using shared base URLs or secrets.

A good hierarchy keeps authentication and variables close enough to reuse but prevents unrelated services from accidentally sharing credentials.

## Request editor

A saved request includes:

- Name and documentation notes.
- Method and URL.
- Timeout and maximum response size.
- Redirect policy and importance marker.
- Ordered query and header rows.
- Authentication.
- Body and attached files.
- Request-local variables.
- Assertions and extraction rules.
- Expected response note and example response.

### Methods and URLs

The visible method list includes `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS`.

Use variables rather than copying environment-specific values:

```text
{{baseUrl}}/customers/{{customerId}}
```

DevDesk shows an unresolved-variable warning and normally prevents sending until missing values are fixed.

### Ordered duplicate fields

Query, header, URL-encoded form, and multipart rows preserve order. Duplicate names can be retained. Each row can be disabled without deleting its value.

This matters for APIs that intentionally use repeated query values:

```text
GET /reports?tag=paid&tag=priority
```

Do not replace repeated values with a comma-separated value unless the API contract requires that format.

### Exact request preview

Before sending, inspect **Exact request preview**. It displays:

- Final method and encoded URL.
- Redacted prepared headers.
- Body kind and byte size when known.
- Unresolved variables.
- A reproducible redacted cURL command.

The preview is the best place to catch the wrong environment, accidental query duplication, malformed encoding, or a credential pointed at the wrong host.

## Authentication

Available authentication modes are:

- Inherit.
- No auth.
- Bearer token.
- Basic auth.
- API key header.
- API key query.
- OAuth 2.0.

Inheritance resolves from request to folder, collection, then workspace. Use **No auth** to explicitly override inherited credentials.

OAuth 2.0 configuration supports authorization code, authorization code with PKCE, client credentials, and device authorization. It can store issuer and endpoint information, discover OpenID configuration, acquire tokens, refresh them, and revoke them when the provider supports those actions.

For secret-storage details, see [API environments and protected secrets](api-environments-secrets.html).

## Request body modes

The saved request editor supports:

- None.
- Raw JSON.
- Raw text.
- XML.
- HTML.
- YAML.
- GraphQL.
- Raw binary file.
- URL-encoded form.
- Multipart form-data with text rows and file parts.

### JSON

Use **Format JSON** or **Minify** only after the editor confirms that the body is valid JSON.

```json
{
  "name": "Example Customer",
  "email": "customer@example.com"
}
```

### Binary file

Choose the file using the picker. Review file name, MIME type, and destination before sending.

### Multipart

Add text rows and one or more files. Each file can have field name and content type metadata. Let DevDesk generate the multipart boundary.

**Do not manually set a multipart boundary** unless you are intentionally constructing the complete raw body outside the multipart editor.

## Send, cancel, and stream

Select **Send** for the normal bounded viewer. Select **Send to file** for a large or exact download. Active requests can be cancelled.

Request execution includes bounded response reading and separate failure categories for DNS, connection, TLS, proxy, timeout, cancellation, CORS, protocol, and server-response problems. A stalled or oversized response should stop safely rather than consume unlimited memory.

## Response viewer

The response area can show:

- Status code, duration, and total size.
- Preview-truncated or saved-to-file badges.
- Pretty/raw body view.
- Search within a large preview.
- Image preview.
- Hex and Base64 binary previews.
- Response headers.
- Response cookies.
- Assertion results.
- Extraction results.

Check more than the status color. A `200` response can still contain a business error, stale data, unexpected schema, or authentication warning.

## History and examples

History is local and bounded. A history item can be re-run or saved as a request. Saved examples and documentation improve onboarding and Markdown export, but they must not contain live tokens, personal data, or proprietary payloads that should not be retained.

## Collection runner

The visible runner is suitable for direct local checks:

1. Select a collection.
2. Choose stop-on-failure behavior.
3. Add an optional delay.
4. Run.
5. Review the per-request and summary results.

Assertions determine pass/fail status. Extraction rules can feed later requests during the workflow.

## Headless CLI

The repository includes a CLI for exported workspaces:

```text
dart run tool/devdesk_api_cli.dart api run path/to/workspace.json \
  --environment Staging \
  --collection "Customer Service API" \
  --iterations 2 \
  --concurrency 2 \
  --retries 1 \
  --backoff 250 \
  --rate 5 \
  --stop-on-failure \
  --report junit \
  --output build/api-report.xml
```

The CLI also supports folder ID, repeatable tags, CSV/JSON iteration data, delay, JSON secrets from stdin, and JSON, JUnit, HTML, or Markdown reports. Failed requests or assertions produce a non-zero failure exit.

Secret environment variables use:

```text
DEVDESK_SECRET_<VARIABLE_NAME>
```

For example, `accessToken` becomes `DEVDESK_SECRET_ACCESS_TOKEN`.

## Import compatibility

The importer can recognize DevDesk workspace/collection JSON and common external formats including Postman 2.x, HAR, Insomnia, cURL, Bruno JSON, and `.bru` text.

Before import, DevDesk reports:

- Source type.
- Collection, folder, request, and environment counts.
- Detected secret count.
- Unsupported features with exact source paths.

Choose **Import without secrets** unless the source and current device are trusted. Save the unsupported-feature report when a migration needs review.

## Export options

- Sanitized DevDesk workspace JSON.
- DevDesk lossless collection JSON.
- Postman Collection 2.1 JSON.
- Markdown API documentation.

Supported Postman export retains ordering, disabled rows, nested folders, files, auth, variables, and examples where representable. No conversion format can represent every source-specific behavior, so review the exported file before relying on it as a migration backup.

## Workspace documentation

Settings includes:

- Overview Markdown.
- Base URL explanation.
- Authentication instructions.

Keep operational guidance here so exported API documentation explains how to use the collection without embedding credentials.

## Network controls

Workspace network settings include:

- Cookie jar and clear-cookie action.
- Network preflight.
- System, direct, HTTP, HTTPS, and SOCKS proxy modes.
- Proxy authentication and no-proxy hosts.
- PEM client certificate/private key.
- Custom CA files.
- Exact-host development certificate exceptions.
- DevDesk Local Agent pairing on a loopback endpoint.

Certificate exceptions are development tools, not general security fixes.

## Advanced implementation status

The uploaded project contains tested engine foundations for:

- Advanced automation and report generation.
- OpenAPI synchronization, comparison, and contract checks.
- GraphQL execution/subscriptions.
- WebSocket, Socket.IO, and SSE streams.
- gRPC and MQTT adapters.
- Canonical Git-friendly workspace bundles.
- Semantic diff and three-way merge.
- Local comments, encrypted peer sync, secret grants, and audit records.

The current API Workspaces screen primarily exposes HTTP/HTTPS requests, GraphQL body mode, import/export, response analysis, environments, tests, and the collection runner. Dedicated interactive screens for every protocol and collaboration capability are not visible in this build. This distinction prevents the manual from promising controls that the current UI does not show.

## Privacy and security boundary

Creating and storing a request is local. Sending it is not offline: the selected URL, headers, authorization, query values, cookies, body, and files are transmitted to the selected destination, which also receives normal connection data such as your public IP address.

DevDesk does not make an endpoint safe, private, or trustworthy. Review the exact prepared request before every sensitive send.
