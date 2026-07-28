# Create a project knowledge structure

The easiest method is **Home → New workspace**. Choose a profile, review the
exact starter files, and select a parent folder. DevDesk creates the workspace
folder and `project.devdesk` safely. You can then add ordinary Markdown with
DevDesk or any editor.

## Recommended starter structure

```text
my-project/
├── project.devdesk
├── index.md
├── architecture/
│   ├── index.md
│   └── system-overview.md
├── api/
│   └── customer-api.md
├── decisions/
│   └── adr-001-local-storage.md
└── runbooks/
    └── release-checklist.md
```

The structure is optional. `project.devdesk` decides which project-relative roots DevDesk indexes and which paths it excludes.

## Add a first document

Save this as `architecture/system-overview.md`:

```markdown
---
type: Architecture
title: System overview
description: A high-level map of the application and its major boundaries.
tags: [architecture, overview]
status: draft
---

# Purpose

Explain what the system does and who uses it.

# Components

- Mobile and desktop application
- Local data storage
- API destinations selected by the user

# Related knowledge

See the [Customer API](../api/customer-api.md) and the
[Release runbook](../runbooks/release-checklist.md).
```

## Add a root index

```markdown
# Project Knowledge

- [System overview](architecture/system-overview.md)
- [Customer API](api/customer-api.md)
- [Release runbook](runbooks/release-checklist.md)
```

If the project is an OKF v0.2 bundle, the root index may declare:

```markdown
---
okf_version: "0.2"
---
```

`project.devdesk` is DevDesk project configuration. It is not an OKF concept and does not replace `index.md`.

## Keep the folder portable

- Use project-relative paths.
- Keep important knowledge in Markdown, not only in device-local state.
- Keep secrets out of Markdown and `project.devdesk`.
- Commit or back up the folder before large changes.
- Prefer standard Markdown links when interoperability matters.
