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
6. Review **Reconnect external workspaces** and select each original folder.
7. Re-enter protected secrets and re-approve trust only when needed.

Imports are staged and use rollback protection if mutation fails.

## What a backup does not include

External project folders, exported files, Git repositories, and protected
secrets remain separate. The recovery kit records a workspace ID, name,
portable status, platform, and human-readable location hint; it does not copy
the folder or restore operating-system permission grants.

## Before uninstalling on Android or Windows

1. Open **Settings → Data backup → Export Reinstall Recovery Kit**.
2. Save the kit outside DevDesk and verify that the file exists.
3. Back up workspace folders independently using a normal file copy or Git.
4. After reinstall, import the kit.
5. Select **Reconnect a workspace** for every recorded folder. Android always
   requires the folder permission again.

An app cannot safely create a last-minute backup after the operating system has
already started uninstalling it. Export first.

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
