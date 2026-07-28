# Edit workspace Markdown

Project Markdown is the main editor for files inside an active Developer Workspace. It uses the same bounded project snapshot as Graph, Search, backlinks, issues, and OKF health.

## Open a project document

1. Open the workspace.
2. Select a Markdown item or select a Markdown file under **Files**.
3. Open **Developer tools → Edit Markdown**.
4. Edit, preview, or use split view.
5. Save before leaving when changes are pending.

For deeper nested-file browsing, use **Files → Open explorer**, select the
Markdown file, and open **Project Markdown**.

## Main areas

- **Document browser:** project-relative Markdown allowed by the manifest.
- **Editor:** edit the active file.
- **Preview:** render Markdown safely.
- **Inspector:** properties, outline, outgoing links, backlinks, and issues.
- **Focused graph:** open the graph as the primary canvas.

## Safe file behavior

- New documents use exclusive creation.
- Existing documents use fingerprint conflict checks.
- An external change is reported instead of overwritten.
- Recoverable unsaved drafts remain device-local.
- Files outside allowed project roots or inside excluded paths are not silently added.

## Watch and refresh

Supported Windows folders use filtered, debounced, coalesced watching. DevDesk suppresses its own write echoes and reparses only affected Markdown paths when safe.

If watching is unavailable, refresh derived workspace information from
**Suggested changes** or the advanced explorer. An uncertain incremental update
falls back to a bounded full refresh.

## Project context in other tools

Compatible tools opened from the workspace receive the active project and
selected file:

- JSON can open a compatible JSON file;
- OpenAPI can open a supported specification;
- Diff can compare a selected project file;
- Search remains limited to the active project;
- Structured Knowledge uses the same configured roots and exclusions.

## Which Markdown editor should I use?

- **Project Markdown:** project files, graph, search, OKF, watching, and conflicts.
- **Markdown Editor:** one standalone file.
- **Markdown Vault:** personal notes managed inside DevDesk.
