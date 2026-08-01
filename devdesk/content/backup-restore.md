# Backup and restore

DevDesk can export and import versioned local application data. The recommended
pre-uninstall export is a **Reinstall Recovery Kit**.

## Export

- **Export Reinstall Recovery Kit:** save independent DevDesk data plus a safe
  workspace reconnection catalog as JSON outside DevDesk.
- **Copy Backup JSON:** copy a conservatively redacted backup.

Protected secret values, Android permission URIs, execution trust, and AI
connector access keys are excluded.

## Import

1. Select a backup file or paste backup JSON.
2. Review the import preview.
3. Choose **Replace** or **Merge**.
4. Confirm the operation.
5. Reopen important tools and verify their state.
6. Open **Reconnect Recorded Workspaces**.
7. Review the workspace names and location hints, then select **Reconnect a
   workspace**.
8. Select the original folder. Repeat for any other recorded workspace.
9. Re-enter protected secrets and re-approve trust only when needed.

Imports are staged and use rollback protection if mutation fails.

## What a backup does not include

External project folders, exported files, Git repositories, and protected
secrets remain separate. The recovery kit records a workspace ID, name,
portable status, platform, and human-readable location hint; it does not copy
the folder or restore operating-system permission grants.

The current version-3 recovery format includes the reconnection catalog. Older
supported backups can still import their independent records, but they may not
contain a workspace list; reconnect those folders manually. The stored
reconnection list is replaced by the catalog from the most recently imported
kit, even when the independent records are merged.

## Before uninstalling on Android or Windows

Settings shows a **Recovery readiness** card with the date of the last completed
file export and the number of registered external workspaces. Open its
**Pre-uninstall checklist** before removing the app.

1. Open **Settings > Data backup > Export Reinstall Recovery Kit**.
2. Save the kit outside DevDesk and verify that the file exists.
3. Back up workspace folders independently using a normal file copy or Git.
4. After reinstall, import the kit.
5. Open **Reconnect Recorded Workspaces**, then select **Reconnect a
   workspace** for every recorded folder. Windows requires you to select the
   folder again; Android also requires the system folder permission again.

An app cannot safely create a last-minute backup after the operating system has
already started uninstalling it. Export first.

## Windows and Android handoff

The recovery kit restores supported independent DevDesk data and a reconnection
catalog; it does not move external project folders. Copy or sync those folders
separately, reopen `project.devdesk`, and grant permission again.

Android supports editing, graph, Canvas, agent context, and reviewed proposals.
Windows provides local Git CLI actions and allowlisted verification adapters
after explicit workspace execution trust. Continue verification on Windows when
a mobile change requires project commands.

## Safety

Keep backups private. Redaction cannot guarantee that every confidential value is recognized.

## Before a major operation

1. Export a backup.
2. Save it to a private location.
3. Verify the file exists and is not empty.
4. Keep external project folders under their own backup or version-control strategy.
5. After import, reopen important tools and verify state.

## Replace versus merge

- **Replace** uses the imported supported records as the new local set.
- **Merge** combines supported records according to the import rules.

Always read the preview because conflicts and duplicate identifiers can produce different outcomes.
