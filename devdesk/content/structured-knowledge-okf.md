# Structure checks (OKF)

This is the easiest place to make a folder easier to browse and maintain.

You do not need to understand OKF before starting. DevDesk reads the Markdown
files that are already in your workspace. It then shows what is required, what
is optional, and what it can change safely.

**OKF** means **Open Knowledge Format**. In DevDesk, an OKF concept is still an
ordinary Markdown file. The file remains readable in other editors.

## Do I need OKF?

Use Structure checks when you want to:

- give Markdown files consistent titles and types;
- create folder indexes;
- see which notes are draft, stale, or reviewed;
- record where important information came from;
- move the folder to another computer without losing its structure.

You can ignore this tool when you only need a few normal notes. OKF is optional.

## Safest first-time workflow

1. Open your workspace.
2. Open **Developer tools**.
3. Select **Structure and OKF**.
4. Wait for **Analyzing portable structured knowledge...** to finish.
5. Read the status at the top of the page.
6. Select **Review safe fixes**.
7. Leave **Project profile** set to **Software project** for a normal software
   workspace.
8. Keep **Suggest missing descriptions** enabled if you want DevDesk to use the
   first readable paragraph as a suggestion.
9. Keep **Mark newly structured documents as draft** enabled.
10. Keep **Create or update indexes** enabled.
11. Select **Analyze and preview**.
12. Review every proposed file.
13. Check the number of files created and updated.
14. Select **Apply reviewed plan** only when the preview is correct.

**Expected result:** DevDesk adds or improves portable YAML metadata and
managed indexes. It does not replace the normal Markdown body.

**Nothing should change before step 14.** **Analyze and preview** creates a
proposal, not an immediate write.

## Understand the first screen

The top status cards include:

- **Concepts:** normal Markdown concept files found.
- **Valid:** concepts without required errors.
- **Required fixes:** problems that currently prevent OKF v0.2 conformance.
- **Spec warnings:** malformed or unknown optional structures.
- **Human reviewed:** concepts with a real `human:` verification event.
- **Machine confirmed:** concepts verified only by a process or producer.
- **Unverified:** concepts with no verification event.
- **Stale:** concepts whose `stale_after` date has arrived.
- **Draft:** work not yet presented as stable.
- **Deprecated:** old content kept for history.
- **With sources:** concepts with provenance entries.
- **Computations:** advanced Attested Computation concepts.

These numbers describe the files. They do not rank the truth or importance of a
note.

## Required and optional findings

| Website/app label | What it means | What to do |
|---|---|---|
| Required fixes | An official supported OKF v0.2 rule is not met | Fix these first |
| Specification warnings | Optional data is malformed or unknown | Review the affected field |
| DevDesk recommendations | A useful improvement, not an OKF requirement | Apply only when helpful |
| Information | Context that needs no change | Read or ignore |

For a normal concept file, the current app treats these as the main required
rules:

1. The file has parseable YAML frontmatter.
2. The frontmatter contains a non-empty `type`.

If reserved `index.md` or `log.md` files exist, they must follow their reserved
structure.

Missing optional fields, unknown concept types, broken links, and missing
indexes do not automatically make a bundle non-conformant.

## What Review safe fixes can suggest

The current app can deterministically suggest:

- a `type` from the filename, title, path, and selected project profile;
- a title from the first heading or filename;
- a description from the first readable paragraph;
- a YAML list when old tags are stored as comma-separated text;
- `draft` status for newly structured files;
- compatible OKF v0.1 to v0.2 metadata changes;
- root and folder indexes;
- an optional newest-first `log.md` entry.

It preserves:

- the normal Markdown body;
- unknown frontmatter fields;
- custom prose outside DevDesk-managed index markers;
- existing files that it cannot update safely.

## Project profile

Choose the profile that best matches the folder:

- **General knowledge:** mixed notes and references.
- **Software project:** plans, architecture, APIs, decisions, and releases.
- **API documentation:** endpoints and API collections.
- **Data and catalog:** datasets, schemas, and data assets.
- **Operations and runbooks:** playbooks, policies, incidents, and procedures.

The profile only helps DevDesk suggest a missing type. It does not move files or
change their meaning.

## Create one new concept

1. Select **Create concept**.
2. Keep **Template** set to **Project documentation** for a simple first file.
3. Enter a **Title**, for example `Release checklist`.
4. Check the suggested **Relative Markdown path**.
5. Add a short **One-line description**.
6. Add a few comma-separated **Tags** if useful.
7. Keep **Status** as `draft` until the content is reviewed.
8. Keep **Generated by** as `devdesk/1.0`, or use a valid actor such as
   `human:baishalya`.
9. Leave advanced optional fields empty.
10. Select **Create**.

**Expected result:** A new Markdown file appears at the displayed relative path.
DevDesk never replaces an existing file with the same path.

See [OKF concepts and metadata](okf-concepts-metadata.html) for every field.

## Manual knowledge maintenance

Use these only when you know the information is true:

- **Record verification:** record a check that actually happened.
- **Add source:** identify a real source or resource.
- **Update lifecycle:** choose `draft`, `stable`, or `deprecated`.
- **Preview indexes:** preview managed folder indexes.
- **Add log entry:** add a dated summary to the optional `log.md`.

DevDesk does not invent any of these facts for you.

## Preview, apply, recovery, and undo

Before applying a managed plan, DevDesk stores the affected paths, expected file
fingerprints, and before/after content in a private recovery journal.

- If a file changed after the preview, DevDesk stops instead of replacing it.
- If part of a batch fails, verified unchanged DevDesk writes are rolled back.
- An external edit is preserved.
- A successful managed plan can remain undoable after restart.
- A queued review plan can be accepted or rejected explicitly.

Use the **Undo last managed OKF plan** toolbar action only while the affected
files still match the applied result.

## Read-only situations

Analysis remains available, but write actions are disabled when:

- the project manifest is a future unsupported version;
- the bundle declares an unknown OKF version;
- the current platform or selected folder does not provide write capability.

Unknown future OKF versions receive best-effort diagnostic analysis only.

## What analysis never does

Opening or refreshing Structure and OKF does not:

- run scripts, terminals, Git, tasks, AI tools, or computations;
- send network requests;
- fetch sources;
- execute an attester;
- invent knowledge, provenance, verification, lifecycle, or trust conclusions.

## If something does not work

- **No knowledge report:** open a workspace containing Markdown and refresh.
- **Required fix remains:** open its file path and fix malformed YAML or the
  missing `type`.
- **Plan says no changes are needed:** the deterministic fields are already
  current.
- **Concept cannot be created:** check the path and confirm the file does not
  already exist.
- **Apply stops:** refresh analysis because a file may have changed externally.
- **Write actions are disabled:** read the lock message at the top of the page.

For folder layout details, see [OKF bundle structure](okf-bundle-structure.html).
For converting existing notes, see
[Analyze, improve, and migrate project knowledge](okf-conversion-migration.html).
