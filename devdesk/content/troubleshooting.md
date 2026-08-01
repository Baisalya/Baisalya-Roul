# Troubleshooting

## A project does not open

- Confirm the folder and `project.devdesk` still exist.
- On Android, select the folder that directly contains the manifest.
- Re-select the folder if Android access was revoked.
- Check Windows permissions, removable-drive availability, and antivirus locks.
- Review any corrupt, duplicate, mismatched, or future-version diagnostic. DevDesk will not overwrite that manifest automatically.

## Workspace shows no files or tools

- Clear workspace Search and check **Files**.
- Use **Files → Open explorer**, then use the breadcrumb to return to **Root**
  or open the intended nested folder.
- Select a file compatible with the intended specialist tool.
- Review manifest knowledge roots and excluded paths.
- Check whether the tool is disabled in `project.devdesk`.
- Select **Refresh project index**.
- Grant local trust only when a tool clearly explains that bounded execution is required.

If a file-specific page cannot use the selection, choose **Choose a project file** or Back. DevDesk returns to the same Workspace instead of falling back to global data.

## Graph is empty, cluttered, or outdated

- Save the source note.
- Select **Fit view**.
- Clear filters.
- Hover a node to focus its immediate neighborhood.
- Reduce **Link width** if you increased it.
- Check Labels, Orphans, and Depth.
- Inspect unresolved and ambiguous links.
- Refresh the project index when watching is unavailable.

## A managed plan cannot apply

- Refresh analysis and create a new plan.
- Check write permission.
- Resolve malformed YAML.
- Keep external edits and review conflicts.
- Open **Review changes** for a queued plan.
- Use **Undo** only while affected files still match the applied result.

## Git status is unavailable

- Use an eligible local Windows project.
- Confirm the selected workspace is inside the intended Git repository.
- If Git belongs to a parent folder, confirm the Git page shows the expected repository-relative workspace scope.
- Files outside that scope are intentionally absent and cannot be staged or unstaged from the workspace.
- Open **Developer tools → Git status** and grant device-local execution trust
  only after reviewing the displayed workspace boundary.
- Confirm `git` is installed.
- Refresh before stage or unstage.

## API request fails

- Check the final URL and HTTPS.
- Verify environment variables, authorization, cookies, and headers.
- Check timeout, certificate, proxy, and network errors.
- Confirm the endpoint accepts the selected body type.

## Check for Updates cannot finish

- Confirm that the official [Downloads page](../downloads.html) opens in your
  browser.
- Check your internet connection, proxy, VPN, firewall, and device date/time.
- Open **Settings → About → Check for Updates** again after reconnecting.
- Android should use Google Play; Windows should use Microsoft Store.

DevDesk remains usable when an initial update check cannot reach the release
record. It never downloads or installs an update silently.

## Portable API workspace does not update

- Confirm **Developer tools → API testing** opened the intended project API
  JSON.
- Confirm the project supports conflict-safe replacement.
- If Git, an editor, or another instance changed the file, reopen it before making further API edits.
- Never solve a portable-save issue by putting credentials into ordinary JSON fields; protected secrets are intentionally local.

## A file cannot be saved

- Confirm the target is writable.
- Check whether another program changed it.
- Avoid invalid names and paths.
- New-file and new-folder creation never replaces an existing path; choose another name.
- Keep Android document-tree access active.

## UI looks cramped

Resize the Android freeform or Windows window, close optional panels, or keep advanced controls collapsed. DevDesk supports responsive layouts rather than requiring one fixed orientation.

## AI Agent Connector does not connect

- The connector is available on Windows and Android. On Android, use an MCP
  client on the same device and keep DevDesk open.
- Keep DevDesk open and confirm it shows **Running**.
- Copy the current Codex, Gemini CLI, or compatible MCP endpoint configuration
  again.
- Restart or refresh MCP servers in the AI client.
- Another program may already use local port `45873`.
- If you rotated the access key, remove the old URL.

If a tool says no workspace is selected, open a workspace and repeat the request. If document reading or proposals are refused, enable only the required permission.

If approval fails, keep the newer Markdown file and ask the agent to read it again.

## Data reset or recovery

Export a Settings backup before a major change. Clear All Data removes DevDesk-private records but does not delete external project folders.

## Windows manifest launch opens the wrong state

- Confirm the selected filename is exactly `project.devdesk`.
- Close duplicate old DevDesk processes if operating-system activation is misconfigured.
- Open the manifest again; a running supported build forwards it to the existing main window.
