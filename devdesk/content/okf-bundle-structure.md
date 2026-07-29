# OKF bundle structure

An OKF bundle is simply the workspace folder that contains your structured
Markdown files.

You do not have to create every folder shown below. Start with one concept and
let **Preview indexes** suggest indexes when the folder grows.

## Small beginner example

```text
my-project/
|-- index.md
|-- concepts/
|   |-- release-checklist.md
|   `-- project-overview.md
|-- decisions/
|   `-- local-storage.md
`-- log.md
```

- `release-checklist.md`, `project-overview.md`, and `local-storage.md` are
  concepts.
- `index.md` is a readable directory entry point.
- `log.md` is an optional dated update history.

All files are normal Markdown.

## Create the structure from the app

1. Open the workspace.
2. Open **Developer tools > Structure and OKF**.
3. Select **Create concept**.
4. Enter a title.
5. Review the suggested relative path.
6. Select **Create**.
7. Return to Structure and OKF.
8. Under **Manual knowledge maintenance**, select **Preview indexes**.
9. Review the proposed `index.md` files.
10. Select **Apply reviewed plan** when the preview is correct.

**Expected result:** DevDesk creates only the concept and reviewed indexes.
Existing custom prose is preserved.

## Concept identity

The portable concept identity is its path from the bundle root without `.md`.

```text
concepts/release-checklist.md
```

becomes:

```text
concepts/release-checklist
```

Moving or renaming the file changes this path-based identity. The optional
`stable_id` field is a DevDesk extension and is not required for OKF
conformance.

## Reserved filenames

### index.md

`index.md` lists concepts and child folders under Markdown headings.

- The root `index.md` may declare `okf_version`.
- A subfolder `index.md` must not contain concept frontmatter.
- Missing indexes are a recommendation, not a conformance failure.

### log.md

`log.md` is an optional update history.

- It uses `## YYYY-MM-DD` headings.
- Newest date sections come first.
- It does not use frontmatter.

Do not use `index.md` or `log.md` as the filename of a normal concept.

## Root index

A generated root index can look like this:

```markdown
---
okf_version: "0.2"
---
# Knowledge Bundle

<!-- devdesk:okf-index:start -->
## Concepts

- [Project overview](concepts/project-overview.md) - Explains the project.
- [Release checklist](concepts/release-checklist.md) - Lists release checks.
<!-- devdesk:okf-index:end -->
```

The root frontmatter may contain only `okf_version`. Put normal concept metadata
in a normal concept file.

DevDesk updates only its managed index section. Custom text outside the managed
markers stays in place.

## Folder index

```markdown
# Concepts

<!-- devdesk:okf-index:start -->
- [Project overview](project-overview.md) - Explains the project.
- [Release checklist](release-checklist.md) - Lists release checks.
<!-- devdesk:okf-index:end -->
```

The current app creates folder indexes only for folders containing concepts or
child concept folders.

## Update log

```markdown
# Directory Update Log

## 2026-07-29
* **Update**: Added the release checklist.

## 2026-07-25
* **Migration**: Reviewed the folder structure.
```

To add an entry:

1. Select **Add log entry**.
2. Enter an **Update summary**.
3. Select **Preview**.
4. Review the proposed `log.md`.
5. Select **Apply reviewed plan**.

DevDesk inserts the entry in newest-first order. If an existing reserved file
contains producer metadata that cannot be relocated safely, DevDesk leaves it
unchanged and asks for manual review.
