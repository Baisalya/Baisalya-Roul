# Diff Workspace and local Git

Diff Workspace compares text, files, folders, supported GitHub content, or a selected local Git repository.

## Text and file comparison

1. Choose the comparison mode.
2. Enter or select both sides.
3. Run the comparison.
4. Review additions, deletions, and unchanged context.

## Local Git on Windows

When supported, select a local repository to inspect status, remotes, commits, and diffs. Staging, unstaging, or guarded discard actions affect the selected repository.

A guarded discard creates recovery information before replacing tracked changes.

## GitHub comparison

Supported GitHub actions fetch only the public URL or content you select. This is a user-initiated network action.

## Safety

- Review the selected repository path.
- Do not discard changes you have not backed up.
- DevDesk does not perform background pull, fetch, or push.
- DevDesk does not manage Git credentials.

## Read a diff

```diff
- old value
+ new value
  unchanged context
```

## Stage and unstage

- **Stage** selects changes for the next commit.
- **Unstage** removes them from the staged set without deleting the working change.
- **Guarded discard** is destructive to the working change, so DevDesk creates recovery information first where implemented.

## No automatic network Git

Local Git inspection does not imply background fetch, pull, push, or credential management. Review the selected repository and use your normal Git client for remote operations.
