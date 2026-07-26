# Assertions, extraction, examples, and history

These features turn individual requests into repeatable API checks without requiring arbitrary operating-system scripts in the visible request editor.

## Assertions

An assertion checks an observed response condition. Each saved assertion has a type, optional target, and expected value.

### Status and timing

- Status code equals.
- Status code range.
- Response time less than a threshold.

Examples:

```text
Status code equals
Expected: 201
```

```text
Status code range
Expected: 200-299
```

```text
Response time < ms
Expected: 750
```

### JSON

- JSONPath exists.
- JSONPath equals.
- JSON array length.
- Numeric comparison.
- JSON Schema validation.

```text
JSON path exists
Target: $.data.customer.id
```

```text
JSON path equals
Target: $.data.customer.status
Expected: active
```

Use JSON Schema for structural checks and smaller JSONPath assertions for business-critical values. A schema-valid response can still contain the wrong business data.

### XML

- XPath exists.
- XPath equals.

```text
XPath equals
Target: /customer/status/text()
Expected: active
```

### Headers and cookies

- Header exists.
- Header equals.
- Header pattern.
- Cookie exists.
- Cookie equals.

```text
Header pattern
Target: content-type
Expected: application/(json|problem\+json)
```

Header names are case-insensitive at protocol level, but keep documentation spelling consistent.

### Body and contract

- Body contains.
- Body content type.
- Body size less than a byte limit.
- Snapshot equals.
- OpenAPI contract.

Snapshot checks are useful for stable fixtures. Update a snapshot only after reviewing the intentional difference. OpenAPI checks compare the live response with the selected API contract; they do not prove that the API's business behavior is correct.

## Reading assertion results

The response **Assertions** tab shows the assertion name, pass/fail state, and message. A failed assertion means the observed response did not match the rule. It does not necessarily mean the network request failed or DevDesk crashed.

The collection runner counts failed assertions as request failures according to run policy.

## Extraction rules

Extraction stores a selected part of a response for later requests.

Supported sources are:

- JSONPath.
- Response header.
- Bounded regular-expression match from the response body.

Each rule defines source, path/header/regex, destination variable, scope, and whether the result is secret.

### Example: login then use token

Login response:

```json
{
  "access_token": "temporary-token",
  "expires_in": 900
}
```

Extraction:

```text
Source: JSON path
Path: $.access_token
Variable: accessToken
Scope: temporary
Secret: yes
```

Later request:

```text
Authorization: Bearer {{accessToken}}
```

### Scope choice

- **Temporary**: best for tokens and IDs produced during one run.
- **Workspace**: reusable across environments; avoid for target-specific values.
- **Environment**: useful for environment-specific IDs or non-secret state.

Request-local variables have higher resolution priority than temporary, environment, collection/folder, and workspace values.

### Extraction safety

- Mark tokens, session IDs, reset links, and password-like values as secret.
- Keep regex bounded and specific.
- Do not extract personal data only because it is convenient.
- Clear or overwrite stale values when changing accounts.
- Review a failed extraction before later requests run with an old value.

## Examples

A request can save:

- Expected response note.
- Example response body.

Use examples for onboarding and generated documentation. Replace live values with safe placeholders:

```json
{
  "id": "cus_example",
  "email": "customer@example.com"
}
```

Never store live passwords, access tokens, private customer data, or proprietary production payloads in an example.

## Workspace documentation

Workspace Settings includes overview Markdown, base URL explanation, and authentication instructions. These notes are included in generated Markdown API documentation and should explain required setup without embedding credentials.

## History

History can contain:

- Final URL.
- Method.
- Status and timing.
- Saved request structure.
- Response preview.
- Assertion and extraction results.

From History you can filter entries, inspect them, save one as a request, re-run it, or clear the workspace history.

History is local but still sensitive. Redaction reduces accidental disclosure; it does not guarantee that every ordinary body value is safe to share.

## In-app collection runner

The visible runner supports:

- Selected collection execution.
- Stop on failure.
- Delay between requests.
- Live and final result summary.

The summary includes total, passed, failed, skipped, and average response time.

## Advanced automation and CLI

The repository automation runner and CLI support:

- Multiple iterations.
- CSV or JSON data rows.
- Folder and tag selection.
- Concurrency from 1 to 32.
- Delay.
- Retries and exponential backoff.
- Global requests-per-second limit.
- Stop-on-error or failed assertion.
- Baseline comparison.
- JSON, JUnit, HTML, and Markdown reports.
- Non-zero failure exit code.

Example:

```text
dart run tool/devdesk_api_cli.dart api run workspace.json \
  --environment Staging \
  --data test-data.csv \
  --iterations 3 \
  --concurrency 2 \
  --retries 2 \
  --report html \
  --output build/api-report.html
```

## Safe script boundary

The repository contains a versioned declarative safe-script model with no direct filesystem or operating-system API, explicit network allowlists, imported-script review gates, cancellation, redacted console output, and operation/state/time limits.

The current API Workspaces screen does not provide a general JavaScript-like script editor. Do not expect arbitrary Postman scripts to execute automatically after import. Unsupported behavior should appear in the import report rather than run silently.

## Sharing reports

Before sharing a report:

- Search for tokens and cookies.
- Remove private URLs and customer data.
- Review failed assertion messages.
- Confirm that example and snapshot content is safe.
- Prefer a sanitized reproduction with test credentials.
