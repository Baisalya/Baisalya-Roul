# YAML frontmatter and properties

Frontmatter is a YAML block at the very top of a Markdown file. The opening and closing lines must each contain exactly three dashes.

```yaml
---
type: API Endpoint
title: Create customer
description: Creates one customer record after validation.
tags: [api, customer, write]
status: stable
---
```

## Basic rules

- Use spaces, not tabs.
- Put a space after `:`.
- Quote text containing special punctuation when uncertain.
- Use YAML lists such as `[api, customer]` or multi-line `- item` entries.
- Do not place frontmatter after the Markdown body.

## Common fields used by DevDesk and OKF

| Field | Purpose |
|---|---|
| `type` | Required by OKF concepts; tells consumers what kind of knowledge this is |
| `title` | Friendly display name |
| `description` | One-sentence summary for search and indexes |
| `resource` | Canonical URI or asset path when the concept describes a real resource |
| `tags` | Cross-cutting categories |
| `generated` | Who or what produced the current content |
| `verified` | Human or process verification events |
| `sources` | Materials from which the concept derives |
| `status` | `draft`, `stable`, or `deprecated` |
| `stale_after` | Absolute date when content should be reviewed |

## Fix a malformed block

Incorrect:

```yaml
---
type API Endpoint
 tags: api, customer
---
```

Correct:

```yaml
---
type: API Endpoint
tags: [api, customer]
---
```

## Properties panel

In Knowledge Workspace, open **Properties** to inspect parsed metadata. Use the editor or Structured Knowledge workflow for changes that must remain portable in the file itself.
