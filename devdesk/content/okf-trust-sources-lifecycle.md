# Sources, trust, freshness, and lifecycle

OKF v0.2 makes provenance and review signals explicit while keeping them optional.

## Sources

```yaml
sources:
  - id: api-spec
    resource: ../references/customer-openapi.yaml
    title: Customer API OpenAPI document
    author: team:api-platform
    last_modified: 2026-07-20
```

Within each source entry, `resource` is required. `id` is useful when the body attributes a claim with a matching footnote.

```markdown
The endpoint returns HTTP 201 after creation.[^api-spec]

[^api-spec]: Customer API OpenAPI document
```

## Generated

```yaml
generated: { by: human:baishalya, at: 2026-07-25T10:00:00Z }
```

Actor convention:

- `human:<id>` for a person
- `process:<id>` for deterministic automation
- `<producer>/<version>` for an agent or producer tool

## Verified

```yaml
verified:
  - { by: human:baishalya, at: 2026-07-25T11:00:00Z }
  - { by: process:nightly-api-check, at: 2026-07-26T02:00:00Z }
```

Derived trust tier:

- No `verified`: unverified
- Only non-human verifiers: machine-confirmed
- At least one `human:` verifier: human-reviewed

Trust tier is advisory, not access control.

## Lifecycle

```yaml
status: draft        # draft | stable | deprecated
stale_after: 2026-12-31
```

Absent `status` means stable. Content becomes stale on or after `stale_after`; stale does not automatically mean false.

## Deprecation

Explain the replacement in the body with a normal link:

```markdown
# Deprecated

Use the [Customer API v2](customer-api-v2.md) instead.
```
