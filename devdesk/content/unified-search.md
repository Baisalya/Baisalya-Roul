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

## Worked example: find a decision in one project

Suppose your active workspace contains `notes/site-visit.md` and `decisions/report-format.md`. The second document has a heading **Photo report handover**. Search for a distinctive title or indexed heading term such as `handover`, then inspect the project-relative path before opening a result. The path helps distinguish the actual decision from another note that merely mentions the same subject.

Open the result and confirm the document contains the decision you need. Search results help locate indexed information; they do not establish whether a note is current or approved. If the decision has been superseded, follow its link to the replacement rather than treating the first match as the latest instruction.

Use a short, distinctive term when a long phrase returns nothing. Confirm the query targets a supported title, path, tag, type or indexed heading instead of assuming every byte in every attached PDF, image or binary file is searchable. Project search is not a general disk scan.

## When a changed file is missing

First verify the file belongs to the active workspace and that it was saved. A similarly named document in Downloads or another project will not appear simply because it exists on the device. Check the project-relative path in the workspace's file view, then use the refresh path described above where live watching is unavailable.

After refreshing, compare Search with Graph or backlinks for the same Markdown document. They share a snapshot, so this is a useful way to check that a newly added heading or link has reached the derived views. If a result still points to old content, record whether the edit was made inside DevDesk or in an external editor and whether a refresh completed.

For a support report, provide the app version, platform, sanitized relative path, the query and a minimal fictional document that reproduces the issue. Avoid sending a complete private workspace. See [Relationships and graph](knowledge-graph.html) for link discovery and [Folders, portability, and scoped Git](developer-workspaces.html) for the workspace boundary.
