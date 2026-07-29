# Analyze, improve, and migrate project knowledge

Use this workflow when the folder already contains Markdown files.

DevDesk analyzes first and writes only after you review a file-by-file plan.
The normal Markdown body and unknown metadata are preserved.

## Before starting

1. Save all open files.
2. Make a ZIP backup or Git checkpoint.
3. Close another editor if it may keep writing to the same files.
4. Open the intended DevDesk workspace.

Opening Structure and OKF does not modify the project.

## Analyze the folder

1. Open **Developer tools > Structure and OKF**.
2. Wait for **Analyzing portable structured knowledge...**.
3. Read **Required fixes** first.
4. Read **Spec warnings**.
5. Treat **DevDesk recommendations** as optional.
6. Use the finding filters when the list is long.

Select **Refresh analysis** after files change outside DevDesk.

## Prepare the conversion plan

1. Select **Review safe fixes**.
2. Read **Turn this folder into structured knowledge**.
3. Choose a **Project profile**.
4. Review every switch.
5. Select **Analyze and preview**.

Default options in the current app:

- Project profile: **Software project**
- **Suggest missing descriptions:** on
- **Mark newly structured documents as draft:** on
- **Migrate compatible v0.1 metadata:** on
- **Create or update indexes:** on
- **Record the reviewed migration in log.md:** on
- Migration actor: `devdesk-migration/1.0`
- Legacy verification actor: empty

Leave **Legacy verification actor** empty unless you know who or what actually
performed the old verification. DevDesk does not invent that event.

## What each option does

### Suggest missing descriptions

Uses the first readable paragraph as a deterministic suggestion. It skips
headings, lists, tables, comments, and code fences.

### Mark newly structured documents as draft

Avoids presenting inferred metadata as already stable.

### Migrate compatible v0.1 metadata

Can map supported older fields:

- `timestamp` to `generated`;
- `verified_at` to `verified` only when a real reviewer actor is supplied;
- `review_after` to `stale_after`;
- `active` to `stable`;
- `deprecated: true` to `status: deprecated`;
- compatible citation footnotes to source entries.

The old field is removed only when its supported replacement exists.

### Create or update indexes

Creates a root `index.md` and useful folder indexes. DevDesk-managed sections
are updated without replacing custom prose.

### Record the reviewed migration in log.md

Adds an optional newest-first migration entry after you approve the plan.

## Review the preview

The preview displays:

- number of files created;
- number of files updated;
- relative path of every affected file;
- why the change is proposed;
- proposed content;
- unchanged or skipped files.

Check:

1. The selected workspace is correct.
2. Suggested types fit the file.
3. Suggested descriptions are factual.
4. Draft status is appropriate.
5. No real source or verification was invented.
6. Index links point to the correct relative paths.

Select **Cancel** when anything is unclear. No project file is changed.

Select **Apply reviewed plan** only after completing the review.

## What DevDesk preserves

The current implementation preserves:

- Markdown body text;
- unknown frontmatter fields;
- existing wiki links;
- custom index prose outside DevDesk markers;
- reserved files containing producer metadata that cannot be moved safely;
- external edits made after planning.

New managed relationships use standard Markdown links for portability.

## Conflict, rollback, and undo

The plan stores the expected fingerprint of each existing file.

- If a file changed after planning, DevDesk stops.
- A durable recovery journal is stored before the first project write.
- On a partial failure, unchanged DevDesk writes are rolled back in reverse.
- External changes are never silently replaced.
- A successful managed plan can remain undoable after restart.

After a conflict, keep the external edit, refresh analysis, and create a new
plan.

## Version behavior

- No declared version: DevDesk performs best-effort v0.2 analysis.
- Declared v0.1: compatible migration can be previewed.
- Declared v0.2: normal supported analysis and reviewed changes.
- Unknown future version: diagnostic read-only analysis; generation is
  disabled.

## If the result is not what you expected

- **No changes are needed:** the deterministic metadata is already current.
- **Some files are skipped:** open the skipped reason; DevDesk may be preserving
  producer metadata.
- **Apply stopped:** refresh because an external file changed.
- **Indexes still missing:** select **Preview indexes** separately.
- **Required fix remains:** manually repair malformed YAML or a reserved-file
  structure that cannot be changed safely.
