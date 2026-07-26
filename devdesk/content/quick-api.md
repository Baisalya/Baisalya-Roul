# Quick API

Quick API is a compact screen for one-off HTTP testing. It is useful when you want to diagnose one endpoint without creating a complete saved workspace.

## Use Quick API when

- You need one temporary request.
- You are checking a health endpoint.
- You want to reproduce a small cURL request.
- You need a bounded response viewer and code snippets.
- You are working in a small Android, split-screen, freeform, or Windows window.

Move to [API Workspaces](api-workspaces.html) when the request needs reusable environments, protected variables, inherited auth, multiple related requests, assertions, extraction, examples, runner reports, or long-term documentation.

## Build the request

1. Select the method.
2. Enter the URL.
3. Choose the maximum response size.
4. Add query parameters.
5. Add headers.
6. Configure body and authorization/environment helpers.
7. Review credentials and files.
8. Select **Send**.

For a large or exact download, use **Send and stream response to file**. An active request can be cancelled.

## Request tabs

### Params

Add query names and values as rows. Use this editor instead of manually joining unescaped values into the URL.

### Headers

Add request headers. Protect credentials and do not duplicate `Content-Type` unless the endpoint requires a deliberate override.

### Body

Enter supported body content. The Quick API screen disables GET request bodies. Use the saved workspace editor for the complete body model, binary files, richer multipart workflows, and request-level tests.

### Auth / Environments

Select an environment helper, edit base URL values, insert `{{baseUrl}}`, and configure request authentication. Quick API is not the best place to maintain multiple production secrets over time.

## Send safely

Before sending, confirm:

- The scheme and host.
- The environment/base URL.
- Authorization and cookies.
- Query parameters.
- Request body.
- File destination when streaming.
- Maximum response size.

A locally created request still transmits data to the remote endpoint.

## Response summary

Quick API shows:

- Status code.
- Response duration.
- Size.
- Preview-truncated state.
- Saved-to-file state.

## Response tabs

### Pretty

Shows formatted text or a bounded binary preview. Image, hex, and Base64 views are used where appropriate.

### Raw

Shows the raw bounded response text.

### Headers

Shows response headers.

### Timeline / Info

Shows method, final URL, status, response time, and header count.

### Code Snippets

Generates:

- cURL.
- Dart `http`.
- JavaScript `fetch`.

Generated snippets are starting points. Review encoding, platform APIs, file handling, redirects, and secrets before using them in production code.

## History

Quick API keeps a small local history. You can reload, duplicate, or delete an entry. **Clear history** removes all saved Quick API requests.

Protected request-history handling can omit or redact sensitive values, but ordinary URLs and bodies may still be confidential.

## Import and export

Quick API can import a compatible collection after showing a safety preview and can export a small collection. Use API Workspaces for detailed migration reports, nested organization, environments, assertions, and documentation export.

## Common failures

### DNS or connection error

Confirm the hostname, internet connection, VPN, proxy, firewall, and server availability.

### TLS error

Do not disable certificate verification blindly. Confirm date/time, certificate chain, host name, and development CA setup.

### Timeout

Check server performance and response size. Increase limits only when the endpoint behavior is understood.

### Empty or malformed response

Review status, headers, content type, raw body, and server logs. A body parser error may be caused by the server returning HTML or plain text instead of JSON.

## Privacy

The destination receives the selected method, URL, headers, authorization, query values, cookies, body, files, and normal network information such as your public IP address. DevDesk does not relay the request through a DevDesk-operated server.
