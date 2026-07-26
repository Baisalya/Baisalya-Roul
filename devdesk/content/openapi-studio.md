# OpenAPI Studio

OpenAPI Studio parses an API contract locally, lets you inspect its operations and schemas, and can generate an API Workspaces collection.

## Supported documents

The parser supports:

- Swagger 2.0.
- OpenAPI 3.0.
- OpenAPI 3.1.
- JSON.
- YAML.

The maximum parsing size is 10 MB. `info.title` is required. Paths must start with `/`.

The visible editor label currently says OpenAPI 3.x. The underlying local parser also converts supported Swagger 2.0 input.

## Reference handling

Local `$ref` references are resolved with safe depth limits. Remote references are not fetched automatically and must be bundled into the local document set before parsing.

This keeps parsing deterministic and avoids silently contacting external servers.

## Minimal example

```yaml
openapi: 3.0.3
info:
  title: Customer API
  version: 1.0.0
servers:
  - url: https://api.example.com
paths:
  /customers:
    get:
      operationId: listCustomers
      summary: List customers
      responses:
        '200':
          description: Successful response
```

## Validate and inspect

1. Open **OpenAPI Studio**.
2. Paste the JSON or YAML document.
3. Select **Validate and inspect**.
4. Review the title, OpenAPI version, operation count, and schema count.
5. Inspect every operation's method, path, summary, and source pointer.
6. Inspect component schema names, types, and property counts.

Validation is structural. It does not contact the API and does not prove that the described server is reachable, secure, or safe.

## Create a collection

After validation, select **Create collection**. The generated collection can include:

- Stable collection and request identifiers.
- Tag-based folders.
- Methods and paths.
- Operation summary and source pointer.
- Path, query, header, and cookie parameters.
- Required and optional parameter notes.
- Request content type and generated/example body.
- Response examples.
- Supported security scheme mapping.
- Environment `baseUrl` from the first server URL.

Generated requests are drafts. Review unresolved variables, credentials, file fields, example bodies, and the exact request preview before sending.

## Swagger 2.0 conversion

Supported Swagger 2.0 fields are rewritten into the internal OpenAPI model, including definitions, security definitions, body/form parameters, response schemas, host/basePath/schemes, and reference paths where representable.

Migration can still lose source-specific extensions or behavior. Keep the original Swagger file in version control.

## Stable synchronization

The service layer can synchronize a previously generated collection with a new contract while preserving user-authored request details such as:

- Assertions.
- Extraction rules.
- Local variables.
- Example response.
- Notes and selected editable fields.

Stable IDs are derived from the API structure to make changes meaningful. The current OpenAPI Studio page does not yet expose a dedicated synchronization button; this capability exists in the service layer.

## Markdown generation

The service can generate linked Markdown documentation from the parsed contract. The current visible page focuses on inspect and create-collection actions, so use the available application export workflow when documentation generation is wired to the UI.

## Breaking-change comparison

The comparison service can identify:

- Removed operations.
- Removed schemas.
- Newly required parameters.
- Removed schema properties.
- Changed property types.
- Added operations as non-breaking changes.

Complex JSON Schema compatibility and real business compatibility still require human review. For example, narrowing an enum or changing undocumented semantics may be breaking even when a simple structural comparison does not flag it.

## OpenAPI contract assertions

API Workspaces can use an OpenAPI contract assertion to compare a live response with an expected operation response. Combine it with status, JSONPath, timing, header, and business assertions.

A contract-valid response can still contain the wrong customer, wrong permission decision, or stale business state.

## Recommended workflow

1. Keep the API contract in version control.
2. Bundle required references.
3. Validate and inspect locally.
4. Review servers, parameters, bodies, responses, schemas, examples, and security.
5. Create or synchronize a collection.
6. Put target values in environments.
7. Put credentials in protected variables.
8. Add assertions and extraction rules.
9. Review the exact prepared request.
10. Run against a safe test environment before production.

## OpenAPI and OKF

OpenAPI describes an API contract. OKF can describe the surrounding knowledge: ownership, decisions, runbooks, sources, trust, lifecycle, and links to the contract. They are complementary and should remain portable files.

## Privacy

Parsing and collection generation are local. The specification can still contain internal URLs, proprietary schemas, or personal example data. Review it before export, issue attachment, or public sharing. Network activity starts only when a generated request is deliberately sent.
