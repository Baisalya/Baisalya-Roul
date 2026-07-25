# Analyze, convert, and migrate folders

DevDesk can inspect an existing Markdown folder and prepare a proposed OKF v0.2 structure. The process should remain deterministic and reviewable.

## Analyze an existing folder

1. Register the folder as a Developer Workspace.
2. Open **Structured Knowledge**.
3. Select **Review fixes** or the folder-analysis action.
4. Choose a project profile when offered.
5. Review every proposed file operation.
6. Apply only after paths, types, titles, and bodies are correct.
7. Re-run validation.

## What DevDesk can suggest

- A title from frontmatter, first H1, or filename.
- A concept type based on explicit rules or the selected profile.
- A one-line description.
- Tags based on existing metadata and selected deterministic rules.
- Root `okf_version` declaration.
- Directory indexes.
- A newest-first log entry.
- Compatible v0.1-to-v0.2 metadata migration.

## What DevDesk must not invent

- A source that does not exist.
- A human verification event that did not happen.
- A trusted status merely because a file parsed successfully.
- A claim or relationship unsupported by the original content.

## v0.1 migration concepts

A migration preview may normalize legacy fields into v0.2 families while preserving unknown keys and Markdown body text. Always keep a version-control commit or backup before bulk conversion.

## Conflict protection

A prepared plan can become stale if files change. DevDesk compares current file identity/content with the plan and should refuse unsafe application rather than overwriting newer external changes.
