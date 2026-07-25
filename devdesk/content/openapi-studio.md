# OpenAPI Studio

OpenAPI Studio loads OpenAPI 3.x documents in JSON or YAML.

## Main workflows

- Inspect paths, operations, schemas, parameters, and security definitions.
- Generate API workspace collections.
- Produce linked Markdown documentation.
- Compare specification structures.

## Load a document

1. Open OpenAPI Studio.
2. Select a JSON or YAML specification.
3. Review validation results.
4. Browse operations and schemas.
5. Generate a collection or documentation only after reviewing the preview.

## Limitations

A valid OpenAPI document can describe an API without proving that the endpoint is reachable or safe. Generated requests may still need environment values, credentials, or example bodies.

## Privacy

Parsing happens locally. A generated request reaches a server only when you deliberately send it from an API tool.

## Minimal OpenAPI example

```yaml
openapi: 3.0.3
info:
  title: Customer API
  version: 1.0.0
paths:
  /customers:
    get:
      summary: List customers
      responses:
        '200':
          description: Successful response
```

## Recommended workflow

1. Load the specification.
2. Resolve structural validation errors.
3. Inspect servers, paths, operations, parameters, request bodies, schemas, and security schemes.
4. Generate a collection preview.
5. Add environment values separately; do not bake secrets into the specification.
6. Send a request only after checking the destination server.

## OpenAPI and OKF

OpenAPI describes the API contract. OKF can describe surrounding knowledge, decisions, runbooks, ownership, trust, and links to the OpenAPI resource. One does not replace the other.
