# Compare files and workspace-scoped Git

Diff Workspace compares text, files, folders, supported GitHub content, or a selected local Git repository.

## Compare text or files

1. Choose the comparison mode.
2. Enter or select both sides.
3. Run the comparison.
4. Review additions, deletions, and unchanged context.

## Source control from a workspace

Eligible local Windows projects can open a focused Source Control page:

1. Open the workspace.
2. Open **Developer tools → Source control**.
3. If asked, choose **Allow Git inspection** after reviewing the exact folder.
   DevDesk runs no Git command before approval.
4. If Git is missing, install Git for Windows and choose **Check again**.
5. If the folder is not inside a repository, choose **Initialize Git
   repository** and confirm the exact location.
6. Stage or unstage a selected path explicitly.
7. Enter a commit message and create a local commit after reviewing the staged
   files.

Opening `project.devdesk` never grants trust. Trust is private to the current device and can be revoked.

### Professional setup states

| State | DevDesk response |
|---|---|
| Trust required | Shows a neutral consent screen scoped to this workspace and device. |
| Git missing | Shows the official Git for Windows link and **Check again**. |
| No repository | Shows **Initialize Git repository** instead of a generic failure. |
| Repository ready | Shows workspace-scoped status, changes, history, branches, and local commit controls. |
| Android document tree | Preserves Android's provider boundary and explains the Windows handoff. |
| Unexpected command failure | Shows a safe diagnostic code and retry action. |

Initialization creates only `.git` in the displayed workspace root. It does
not change or stage existing files, create a commit or remote, connect an
account, or use the network. DevDesk refuses to create a nested repository
when the workspace is already inside a parent repository.

### Parent repository with a strict workspace scope

When the user explicitly opens Git status, DevDesk resolves the real repository
root with:

```text
git rev-parse --show-toplevel
```

The result may be the selected workspace or a parent folder. DevDesk separately
records the folder containing `project.devdesk` and shows the repository-relative
scope on the Git page. A nested `shopdesk/docs` workspace therefore uses only
the `docs` pathspec even though Git belongs to `shopdesk`.

After a normal clone, opening `docs/project.devdesk` restores the nested
workspace identity. The manifest does not contain `.git` data, remotes,
credentials, or trust.

## Safety boundaries

- Status and recent history include only the selected workspace pathspec.
- Displayed file paths are relative to the selected workspace.
- Diff, stage, unstage, and protected discard cannot escape that workspace.
- Unrelated parent-repository changes do not invalidate a scoped fingerprint.
- Absolute and cross-workspace paths are rejected.
- Stage and unstage require explicit actions.
- Local commits are explicit, fingerprint-checked, and use `--no-verify` so
  repository hooks are not executed.
- DevDesk does not fetch, pull, push, change remotes, run hooks, or manage
  credentials.
- A Git commit records the repository's staged index. When the DevDesk
  workspace is nested inside a parent repository, first confirm with your
  normal Git client that unrelated parent-repository files are not already
  staged. Use the normal Git client instead whenever the staged boundary is
  uncertain.
- Use your normal Git client for remote operations and conflict resolution.

## GitHub comparison

Supported GitHub comparison fetches only the public URL or content you select. It is a user-initiated network action.
