# Structured Knowledge / OKF

Structured Knowledge helps turn an existing Markdown project folder into portable, machine-readable knowledge while keeping ordinary Markdown as the primary format.

## What the icon means

The Structured Knowledge mark combines a document, connected concepts, and a verification check. It represents portable Markdown, typed metadata, relationships, and trust signals.

## Analyze a folder

1. Register and open a Developer Workspace.
2. Open **Structured knowledge**.
3. Select **Review fixes**.
4. Choose an appropriate project profile.
5. Review the proposed file-by-file changes.
6. Apply only after the preview is correct.

DevDesk does not silently rewrite the entire folder.

## Automatic suggestions

DevDesk can deterministically suggest titles, types, descriptions, tags, root metadata, indexes, log entries, lifecycle fields, and migration changes. Suggestions are based on existing files and rules, not an online AI service.

## Manual authoring

You can create a concept, add a source, record verification, change lifecycle status, set a staleness date, or generate indexes.

## Trust and lifecycle

Supported lifecycle states include draft, stable, and deprecated. Verification records can identify human, process, or producer confirmation. Do not mark content as human-reviewed unless a person actually reviewed it.

## Migration

A v0.1 bundle can be previewed and migrated toward v0.2 fields. Unknown frontmatter is preserved where possible.

## Safety rules

- Preview before apply.
- Do not invent sources or verification.
- Keep a version-control or backup copy for large conversions.
- Resolve external file changes before applying a stale plan.
- Markdown files remain portable and editable outside DevDesk.

## What OKF is

Open Knowledge Format (OKF) v0.2 is an open, human- and agent-friendly way to represent knowledge as a directory of UTF-8 Markdown files with YAML frontmatter. It is a format—not an account, cloud service, database, or required SDK.

The only always-required concept field is `type`. Unknown types and producer-defined fields must be tolerated. Index files, log files, trust metadata, lifecycle fields, and sources are optional but useful.

## Why DevDesk calls it Structured Knowledge

Most users care about the outcome:

- Existing project notes become easier to navigate.
- Important metadata becomes explicit.
- Files remain portable and Git-friendly.
- Humans and compatible tools can consume the same folder.
- Trust, freshness, and lifecycle can be recorded without hiding them in a proprietary database.

“Open Knowledge Format support” is the technical label underneath that benefit.

## DevDesk workflow

```text
Analyze folder → Review findings → Preview proposed file changes → Approve → Apply safely → Re-index
```

No source or human verification should be invented automatically.
