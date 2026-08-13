# Workspace workbench, tabs, and tools

The workspace workbench keeps files, focused tools, Source Control, context, and optional terminals inside one project window. Opening a compatible file or workspace tool creates or activates a project tab instead of sending you to a disconnected standalone screen.

## Understand the workspace layout

- **Activity rail:** switch between Project files, workspace views, Knowledge, Developer tools, Source Control, AI Agent, and settings-related project areas.
- **Project tree:** browse the selected folder, open files, create compatible files or folders, and use contextual actions.
- **Editor tabs:** keep project files and tools open in one persistent work area.
- **Main surface:** edit the active file or use the active workspace-scoped tool.
- **Context panel:** inspect properties, relationships, outline, or other information supported by the active surface.
- **Status area:** shows the selected workspace and file boundary.

When API Studio, Diagram Studio, Visual Canvas, Knowledge graph, JSON Tools, OpenAPI Studio, Diff, Source Control, or another compatible tool opens here, it receives only this workspace context. Independent tool data remains separate.

## Manage many tabs

DevDesk keeps at most five tabs visible in the strip. When more are open:

- a dropdown with a numbered badge appears at the right;
- the active tab always remains visible, even when it was previously hidden;
- selecting a hidden tab brings it into the visible set;
- unsaved tabs show a small dirty indicator in both the strip and hidden-tab menu.

Right-click a visible tab on Windows for **Close**, **Close Others**, **Close to the Right**, **Close Saved**, **Close All**, or **Reopen Closed Editor**. The close button remains available for pointer and keyboard use. If a tab has unsaved changes, DevDesk asks you to save or discard instead of closing silently.

Five visible tabs is a clarity limit, not a limit on the number of open resources. The hidden-tab dropdown keeps the strip readable while preserving access to every open tab.

## Developer tools inside a workspace

Open **Developer tools** to see three useful groups:

- **Used in this workspace:** tools detected from real project artifacts, such as Markdown, a knowledge graph, `.flowchart`, `.canvas`, OpenAPI, JSON, saved API workspace, OKF, or Git content.
- **Recently used in this workspace:** tools opened for this project before.
- **Other workspace tools:** compatible tools available to add now.

Select **Add tool** for a compact picker. The chosen tool opens as a project tab and becomes recent for this workspace. Professional cards use a distinct visual motif for each tool and explain whether the item is a saved project artifact, a derived project view, or simply workspace-ready.

If a selected file is compatible, its contextual **Open with** actions appear first. Examples:

| Selected project file | Useful project actions |
|---|---|
| `.md` or `.markdown` | Edit Markdown, Structure check, Compare, Knowledge graph |
| `.flowchart` | Diagram Studio, view source as text |
| `.canvas` | Visual Canvas, view source as text |
| `.json` | JSON Tools; API workspace or OpenAPI when compatible |
| `.yaml` or `.yml` | OpenAPI Studio, Compare |
| supported source or text | Project text editor, Compare |

Creating a workspace-ready JSON, OpenAPI, API, Canvas, or diagram artifact uses a new project path and does not silently replace an existing file.

## Source Control and project terminals

Source Control is contextual to the current workspace. On a trusted local Windows project it can show:

- changed files and staged state;
- a selected-file diff;
- commit history and commit details;
- branch information and explicit branch creation;
- fetch, fast-forward pull, and push actions;
- resizable changes, history, branch, and details panels.

Opening Source Control activates its contextual left pane so the Project tree is not duplicated beside a second changes list. Git operations remain explicit and are scoped to the detected repository root. Check that root before initializing or changing a repository.

The **Project terminals** area lists supported installed shells such as PowerShell, Command Prompt, or Git Bash. Opening one is an explicit Windows action and uses the project folder as its working directory. Terminal actions require local execution trust. Android and non-local workspaces do not gain a bundled desktop toolchain.

Opening a workspace never runs Git, a shell, a package script, a test, or another command automatically.

## Responsive behavior

- On a wide Windows window, the activity rail, Project tree, editor, and optional context panel can remain visible together.
- When a focused tool such as API Studio or Diagram Studio needs room, DevDesk may collapse the Project tree automatically. This changes layout only; the workspace remains open.
- On Android phones or narrow freeform windows, labels and secondary actions move into compact navigation, bottom sheets, or overflow menus.
- Resizable panels stay within safe minimum and maximum widths so the main editor remains usable.

Use **Ctrl+B** on Windows when you deliberately want to keep the main sidebar hidden. Reopen Project files from the activity rail when you need the tree again.

## Safe working habits

1. Confirm the workspace name before creating or saving a file.
2. Watch for the unsaved indicator before closing a tab or window.
3. Check the project path and repository root before Git or terminal work.
4. Use the hidden-tab dropdown instead of opening duplicate copies of the same resource.
5. Keep secrets and device-local trust out of portable project files.

Continue with [Diagram Studio](diagram-studio.html), [Relationships and graph](knowledge-graph.html), [Saved API testing](api-workspaces.html), or [Compare files and scoped Git](diff-git.html).

