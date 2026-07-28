# Search this workspace

Unified Search finds indexed information inside the active project.

## Search in project context

1. Open the workspace.
2. Use workspace Search for a quick filter, or open
   **Developer tools → Search workspace** for the full indexed search.
3. Search titles, project-relative paths, tags, types, or indexed headings.
4. Open a result to return to that file with project context preserved.

Search does not silently mix results from unrelated workspaces when a project is active.

## One shared snapshot

Search, Graph, backlinks, issues, and OKF health use the same project snapshot. After refresh, these views agree about which documents and links exist.

## Keep the index current

- Supported Windows folders use filtered, debounced watching.
- Only affected Markdown paths are reparsed when safe.
- DevDesk suppresses its own file-write echoes.
- An uncertain incremental update falls back to a bounded full refresh.
- On roots without live watching, refresh from **Suggested changes** or
  **Files → Open explorer**.

Queries and indexed content remain local. Searching does not make a network request.
