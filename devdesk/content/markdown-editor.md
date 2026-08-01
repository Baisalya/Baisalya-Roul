# Markdown Editor

Markdown Editor is a focused editor for one Markdown file at a time.

## Open a file

Use **Open file** and select a supported Markdown document. DevDesk reads the selected file locally.

## Create and save

1. Select **New file**.
2. Write Markdown.
3. Use **Save** or **Save As**.
4. Confirm replacement if an existing file would be overwritten.

## Editor and preview

Choose **Edit**, **Preview**, or **Split**. Wide windows can show source and
rendered output together. Narrow Android and freeform layouts move secondary
actions into compact menus so the text remains readable.

## Useful actions

- New file
- Open file
- Save
- Save As
- Rename internal file
- Delete internal file
- Copy Markdown
- Find and replace
- Outline navigation
- Focus mode

Markdown syntax is highlighted without changing the plain-text file. The footer
reports words, characters, cursor position, and save state. Formatting actions
insert portable Markdown rather than a hidden editor format.

## Safety

External edits are not silently overwritten. DevDesk tracks unsaved state and uses explicit save flows.

## Save choices

- **Save:** writes to the current supported location.
- **Save As:** lets you choose another destination.
- **Internal file rename/delete:** affects DevDesk-managed internal documents, not arbitrary external files without an explicit flow.

## Recommended workflow on Android

Use the system picker, edit, then choose a destination when the platform provides read-copy access rather than direct overwrite.

## Recommended workflow on Windows

When a selected local file can be safely replaced, DevDesk uses guarded replacement. Network paths, symbolic/reparse paths, permission failures, and external identity changes can block overwrite.
