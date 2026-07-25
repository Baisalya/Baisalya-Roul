# OKF bundle structure


```text
my-project-knowledge/
├── index.md                     # Bundle entry point; may declare okf_version
├── log.md                       # Optional update history, newest date first
├── architecture/
│   ├── index.md                 # Optional directory listing
│   ├── system-overview.md       # One concept
│   └── data-flow.md             # One concept
├── api/
│   ├── index.md
│   └── customer-api.md
├── decisions/
│   └── adr-001-local-storage.md
├── runbooks/
│   └── release-checklist.md
└── references/                  # Optional mirrored source material or scripts
    └── api-schema.md
```


## Concept ID

The concept ID is its path from the bundle root without `.md`.

```text
api/customer-api.md  →  api/customer-api
```

## Reserved filenames

- `index.md` is a directory listing for progressive disclosure.
- `log.md` is an optional update history, newest date first.
- Do not use those names for normal concept documents.

## Root index and version

A root `index.md` may declare the version:

```markdown
---
okf_version: "0.2"
---
# Project Knowledge

## Architecture

- [System overview](architecture/system-overview.md) - High-level boundaries.
```

Subdirectory `index.md` files should not carry arbitrary concept frontmatter.

## Directory index example

```markdown
# API concepts

- [Customer API](customer-api.md) - Creates and reads customer records.
- [Authentication](authentication.md) - Token and permission requirements.

# Related groups

- [Runbooks](../runbooks/) - Operational procedures.
```

## Log example

```markdown
# Directory Update Log

## 2026-07-25
- **Update**: Added [Customer API](api/customer-api.md).

## 2026-07-20
- **Initialization**: Created the initial bundle structure.
```
