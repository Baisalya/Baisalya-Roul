# Snippets and Notes

Snippets/Notes stores reusable developer text locally.

## Create a snippet

1. Add a title.
2. Choose or enter a language or category.
3. Add the reusable content.
4. Save and search it later.

## Good uses

- Command examples
- Boilerplate
- Checklists
- Small private notes
- Troubleshooting steps

## Sensitive values

Do not save production credentials in an ordinary snippet. Protected API variables are a better location for supported request credentials.

## Export and clipboard

Review content before copying or exporting. Clipboard managers and synchronized clipboards can retain copied text.

## Useful snippet format

```text
Title: Flutter release checks
Language/category: PowerShell
Content:
flutter clean
flutter pub get
flutter analyze
flutter test
flutter build appbundle --release
```

Keep sensitive values in a supported protected API variable rather than an ordinary snippet.

## Worked example: a reusable export review

Create a snippet titled **PDF handover review** and use a recognizable category such as `Checklist`. Add the following plain text, save it, then search for `handover` to find it again:

```text
PDF handover review
1. Open the exported PDF in a separate viewer.
2. Check page order and orientation.
3. Read small captions at normal zoom.
4. Confirm the intended project and visit date.
5. Keep a separate copy of the original records.
```

This is useful because it records a repeatable check rather than one particular customer's files. When you reuse it, copy the checklist into the current task and record the actual outcome there. Keep the reusable snippet free of personal names, private attachment paths and customer identifiers.

For a command snippet, include the working directory requirement, the target platform and the expected result in the surrounding note. A command that succeeded in one workspace might fail in another because a dependency or toolchain differs. Read a command before running it; storing text does not establish that it is safe for the current project.

## Keep snippets easy to maintain

Prefer one task per snippet and a title that names the task. **Windows release checks** is easier to find than **Useful stuff 2**. Put example values in the content and explain what must be replaced. If a procedure changes, update the reusable version and check any copies already used in active project documentation.

If a search does not find your snippet, try a distinctive word from its title or content and confirm you are using the snippets tool rather than project file search. Independent tool data and workspace Markdown serve different purposes. For a procedure that needs to travel with a project or be reviewed in Git, create a Markdown file inside that workspace instead.

Local storage still needs a recovery plan. Copy or export important reusable text through the supported controls, verify the saved file and keep an independent copy where appropriate. See [Backup and restore](backup-restore.html) for the distinction between app data and project folders.
