# Compare files and workspace-scoped Git

Diff Workspace compares text, files, folders, supported GitHub content, or a selected local Git repository.

## Compare text or files

1. Choose the comparison mode.
2. Enter or select both sides.
3. Run the comparison.
4. Review additions, deletions, and unchanged context.

## Git status from a workspace

Eligible local Windows projects can open a focused Git status page:

1. Open the workspace.
2. Open **Developer tools → Git status**. The action appears after a Git
   repository is detected.
3. Grant device-local execution trust after reviewing the displayed boundary.
4. Refresh status.
5. Stage or unstage a selected path explicitly.

Opening `project.devdesk` never grants trust. Trust is private to the current device and can be revoked.

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
- DevDesk does not automatically fetch, pull, push, commit, run hooks, or manage credentials.
- Use your normal Git client for remote operations.

## GitHub comparison

Supported GitHub comparison fetches only the public URL or content you select. It is a user-initiated network action.
