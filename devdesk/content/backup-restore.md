# Backup and restore

DevDesk can export and import versioned local application data.

## Export

- **Export Backup File:** save JSON to a location you choose.
- **Copy Backup JSON:** copy a conservatively redacted backup.

Protected secret values are excluded from supported DevDesk backups.

## Import

1. Select a backup file or paste backup JSON.
2. Review the import preview.
3. Choose **Replace** or **Merge**.
4. Confirm the operation.
5. Reopen important tools and verify their state.

Imports are staged and use rollback protection if mutation fails.

## What a backup does not include

External project folders, exported files, Git repositories, and protected secrets remain separate.

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
