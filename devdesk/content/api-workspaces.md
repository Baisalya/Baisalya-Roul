# API Workspaces

API Workspaces organize saved HTTP requests, collections, folders, environments, examples, assertions, extraction rules, history, and reports.

## Create a request

1. Create or open a workspace.
2. Add a collection or request.
3. Choose the HTTP method.
4. Enter the destination URL.
5. Configure query parameters, headers, authorization, cookies, or body.
6. Select an environment.
7. Review the destination and select **Send**.

## Environments and secrets

Use protected variables for credentials. Protected values use platform security boundaries where available and are excluded from supported portable backups and exports.

## Results

Inspect status, timing, headers, and bounded response content. Large, binary, malformed, or timed-out responses are handled with limits and safe error states.

## Assertions and extraction

Assertions check response conditions. Extraction rules can save selected response values for later requests. Avoid extracting secrets into ordinary unprotected variables.

## History and examples

History is stored locally with application limits. Saving a history entry as a request or example creates a reusable copy.

## Network privacy

The destination server receives the request content you choose to send and normal connection information such as your public IP address. DevDesk does not proxy requests through a DevDesk server.

## Build a request step by step

1. Open or create an API workspace.
2. Create a collection such as `Customer Service`.
3. Create a request and select `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, or another supported method.
4. Enter an HTTPS URL.
5. Add query parameters in the parameter editor instead of manually concatenating unescaped values.
6. Add headers and authorization.
7. Choose the body type expected by the server.
8. Select the intended environment.
9. Resolve variable previews and check the final destination.
10. Select **Send**.

## Example request

```http
POST https://api.example.com/customers
Authorization: Bearer {{access_token}}
Content-Type: application/json

{
  "name": "Example Customer",
  "email": "customer@example.com"
}
```

## Response review

Check all of these—not only a green status color:

- HTTP status code
- Duration
- Headers such as content type and caching
- Body format and error details
- Assertion results
- Extracted values
- Whether the response contains secrets or personal data before copying

## Body modes

Common modes include raw text/JSON and form-based input. For multipart content, use the provided form-field/file UI; do not type a multipart boundary manually.
