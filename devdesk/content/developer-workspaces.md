# Folders, portability, and scoped Git

A Developer Workspace connects DevDesk to a project folder you own. Source files remain in place; DevDesk does not create a private cloud copy.

## Create a new project

1. On Home, select **New workspace**.
2. Choose Personal, Study, Business, Research / writing, Software, or Blank.
3. Enter a workspace name.
4. Review the exact folders, Markdown files, and `project.devdesk` that will be created.
5. Choose the parent folder.
6. DevDesk creates one new child folder and opens the unified workspace shell.

If the child folder or a destination file already exists, creation stops safely. A failed transaction is removed only when the transaction marker, exact created paths, and recorded fingerprints still match. If another app or person added or changed anything, DevDesk preserves the folder for review.

## Open an existing folder

### Add `project.devdesk` and open

Use this when you want portable project identity and settings. The manifest is created only when absent and writable.

### Open once without writing

Use this when the folder must remain unchanged. The registration exists only on the current device until you later add a manifest.

### Open an existing manifest

Choose `project.devdesk`. DevDesk validates it and restores the project by its stable ID. Moving the folder does not change that identity.

Invalid UTF-8, invalid JSON, duplicate keys, duplicate case variants, mismatched IDs, forbidden content, and unsupported future versions are never silently overwritten. Future versions can open for diagnostic read-only analysis.

## What `project.devdesk` contains

The schema-v1 file is ordinary UTF-8 JSON. It can contain:

- format and schema version;
- stable project ID and display name;
- project-relative knowledge roots;
- excluded paths;
- OKF mode;
- enabled project tools;
- optional project-relative artifact or source hints.

It cannot contain:

- passwords, tokens, cookies, credentials, or private keys;
- absolute paths;
- commands, scripts, tasks, or environment variables;
- execution trust;
- recent files, graph positions, drafts, permissions, or other personal state.

## Canonical example

```json
{
  "format": "devdesk.workspace",
  "knowledge": {
    "okf": "detect",
    "roots": ["."]
  },
  "name": "Example Project",
  "projectId": "7f85d807-62af-4cfe-8f1f-d1f0b70c1bc4",
  "root": ".",
  "schemaVersion": 1,
  "tools": {
    "markdown": {
      "enabled": true
    }
  }
}
```

Use DevDesk to create the manifest whenever possible; do not copy the example UUID into multiple projects.

## Unified workspace and advanced explorer

The primary workspace combines:

- Overview, Inbox, Today, Tasks, Notes, Files, and Views;
- List, Board, Calendar, Timeline, Outline, and graph projections of ordinary Markdown;
- selected-item details and typed relationships;
- suggested changes, developer tools, help, and settings;
- compact drawer/details-sheet layouts and wide navigation/inspector layouts.

Opening a compatible tool keeps the active project and selected file attached.

DevDesk drops the selected file when it is incompatible with the tool. For
example, opening JSON Tools or OpenAPI Studio while `HOW_TO_TEST.txt` is
selected opens that tool's project landing page instead of passing the text
file or falling back to unrelated global data.

| Project action | DevDesk behavior |
|---|---|
| Open `.txt`, `.log`, or supported source text from **Files** | Opens the workspace text editor. Diff remains an explicit **Open with** option. |
| Open JSON Tools without a selected `.json` file | Shows only compatible JSON files in the active workspace and offers **Create in workspace**. |
| Open OpenAPI Studio without a selected `.json`, `.yaml`, or `.yml` file | Shows only compatible files in the active workspace and can create an OpenAPI YAML or JSON starter there. |
| Open an independent file outside a workspace | Keeps it independent. It is not assigned, copied, or imported automatically. |
| Save a workspace text file | Uses conflict-protected workspace save. **Save As** exports an independent copy. |

Files created from a project tool use a workspace-relative path and exclusive
creation, so an existing file is never replaced. A nested parent folder must
already exist. Explicitly copy, import, or assign an outside file before using
it as content in a particular workspace.

The earlier **Workspace Hub** remains under **Files → Open explorer**. It provides the bounded project tree, breadcrumb navigation, nested-folder browsing, safe **New file**/**New folder** actions, detailed project capabilities, and exact project-file selection.

### Browse a real project, not a copied vault

The explorer enumerates metadata inside the selected root and applies the same hidden/generated/excluded-path policy as other project discovery. It does not load every file into memory. Directories appear before files. Search can find a nested path; selecting a folder opens it, while selecting a file makes that project-relative path available to compatible tools.

The breadcrumb always starts at **Root**. Use it to move back from `docs/architecture` to `docs` or the main project folder without closing the Workspace.

### Create a file or folder

Use the toolbar or explorer actions:

1. Open the destination folder in the breadcrumb.
2. Select **New file** or **New folder**.
3. For a file, enter its name and choose Markdown, portable API workspace, JSON, YAML, HTTP request, text, or empty file.
4. DevDesk adds the selected extension when the name does not already have one.
5. DevDesk generates minimal starter content and selects the new file.

Creation is exclusive. If the name already exists, the action stops and leaves the existing file untouched. Names containing traversal separators, control characters, Windows-reserved characters, reserved device names, or trailing spaces/dots are rejected before the filesystem call.

Markdown creation is sent directly to the incremental project index. Other files become visible by invalidating the bounded project tree; external watching continues to handle changes made by other developer tools.

### Recover from an incompatible tool selection

A file-specific tool does not silently open unrelated global data. JSON Tools
and OpenAPI Studio provide **Choose workspace file**, which lists only
compatible files in the active project, plus **Create in workspace** when a
safe starter is available. Creation stays inside the workspace and never
replaces an existing file. Back returns to the same Workspace without changing
project content.

## Git clone and portable reopen

A professional portable project can use the repository root or a nested
workspace:

```text
shopdesk/
  .git/
  README.md
  docs/
    project.devdesk
    devdesk-api-workspace.json
    Home.md
    architecture.md
  lib/
    main.dart
```

The responsibilities are separate:

| Item | Purpose | Share in Git? |
|---|---|---|
| `project.devdesk` | Stable DevDesk identity and relative configuration | Yes |
| Markdown, JSON, YAML, OpenAPI, source | Actual project-owned work | Yes, according to normal project policy |
| `devdesk-api-workspace.json` | Sanitized API structure | Yes |
| `.git/` | Local Git metadata created by clone/init | No; Git manages it |
| tokens, cookies, history, machine network settings, trust, UI state | Device-local private state | No |

After `git clone`, open `docs/project.devdesk`. DevDesk reconstructs the local
registry from `projectId`, uses the manifest directory as the workspace root,
discovers the parent Git repository when Git status is explicitly opened, and
opens the workspace shell. The user does not recreate the project or manually rebuild
its Markdown graph/API structure.

Opening a valid manifest still performs data-only discovery. It does not run Git, API requests, hooks, project scripts, or build commands.

## Project API artifact

When **Developer tools → API testing** is opened without the portable API artifact, a writable project automatically receives:

```text
devdesk-api-workspace.json
```

The initial document has a stable project-derived API workspace ID and valid DevDesk API workspace structure. Opening the file on the same device refreshes the matching local cache instead of making duplicates. Structural API edits are debounced and written back with the fingerprint captured when the file was opened.

Every project write is sanitized. The shareable document excludes:

- tokens, passwords, API keys, protected variables, cookies, and OAuth credentials;
- request/response history and runner reports;
- favourite/archive and last-used state;
- proxy/TLS/Local Agent settings, execution trust, and filesystem permission grants.

Protected local secrets can be reapplied after a project-file refresh. List items are matched by stable `id` (or variable `key`) so a Git reorder cannot redirect one environment or request's credential to another. If an item was removed, its obsolete secret is not copied to a different item.

If Git, an editor, or another DevDesk instance changes the file after it was opened, the expected fingerprint no longer matches. DevDesk stops the save and asks the user to reopen rather than overwriting the external change.

## Automation modes and recovery

| Mode | Project-write behavior |
|---|---|
| Safe automatic | Applies only deterministic reversible managed maintenance |
| Review changes | Stores a durable plan until you accept or reject it |
| Manual | Requires an explicit action before every write |

Recovery information is recorded before a managed batch. Partial failures roll back only unchanged DevDesk writes. External edits are preserved. A successful managed plan can remain undoable after restarting DevDesk.

## Android access

Workspace file selection and creation stay inside the granted Android document
tree. A file chosen independently through another Android picker stays
independent until you explicitly place, import, or assign it to the workspace.

Tap `project.devdesk` in a compatible Files provider and choose **Open DevDesk
project**. Android then asks you to select the folder that directly contains
the file. Android grants a document-tree URI, not a normal filesystem path.
DevDesk keeps that URI opaque and uses only capabilities supplied by the
provider.

If permission is revoked, re-select the same folder instead of creating a duplicate workspace.

## Windows folders and Git

The installed Windows setup or MSIX gives `project.devdesk` the DevDesk icon.
Double-clicking a valid manifest can cold-start DevDesk or activate its project
in an already-running window. A portable ZIP cannot register file associations;
use **Open with → DevDesk** or install the setup package. When DevDesk branding
changes, an app update replaces the registered icon source, although Explorer
can briefly retain an older icon in its cache.

Windows local folders can also use filtered, debounced file watching.

Git status requires a separate device-local execution-trust decision. DevDesk
resolves `git rev-parse --show-toplevel`, then keeps the repository root and
selected workspace root as separate boundaries. If Git belongs to a parent
folder, status and recent history use only the repository-relative workspace
pathspec. Diff, stage, unstage, and protected discard validate every selected
path against the folder containing `project.devdesk`; changes elsewhere in the
parent repository are excluded and cannot make a scoped mutation stale.

Opening the manifest never grants trust or runs Git.

Removing a workspace registration never deletes its project folder.
