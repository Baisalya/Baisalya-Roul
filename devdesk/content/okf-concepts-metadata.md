# OKF concepts and metadata

Every concept is one Markdown file with YAML frontmatter followed by a normal Markdown body.

## Minimal conformant concept

```markdown
---
type: Reference
---
# Local storage decision

The application keeps primary project content in user-selected files.
```

## Recommended practical concept

```markdown
---
type: Architecture Decision
title: Use local-first storage
description: Records why the application keeps project content on the device.
tags: [architecture, privacy, storage]
generated: { by: human:baishalya, at: 2026-07-25T10:00:00Z }
status: stable
stale_after: 2027-01-25
---
# Decision

Use local storage for project knowledge.

# Consequences

- Work remains available without a DevDesk cloud account.
- Users manage external backup and synchronization choices.
```

## Type

Choose a descriptive type. There is no central registry. Examples:

- `Architecture`
- `Architecture Decision`
- `API Endpoint`
- `Playbook`
- `Runbook`
- `Reference`
- `Metric`
- `Attested Computation`

Consumers should treat unknown types as generic concepts rather than failing.

## Resource

Use `resource` when the concept describes a canonical asset:

```yaml
resource: https://api.example.com/openapi.json
```

It may also be a bundle-relative or relative path.

## Tags

Tags are short cross-cutting categories:

```yaml
tags: [api, customer, security]
```

Do not create a tag for every word. Use a small consistent vocabulary.
