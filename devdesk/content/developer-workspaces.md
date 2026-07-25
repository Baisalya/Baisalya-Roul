# Developer Workspaces

Developer Workspaces register local project folders without copying them into a DevDesk cloud account.

## When to use

Use a workspace when a folder contains Markdown documentation, technical decisions, API notes, runbooks, or project knowledge that should remain in ordinary files.

## Add a workspace

1. Open **Developer Workspaces**.
2. Select **Add workspace**.
3. Choose **Import existing folder** or create a named workspace.
4. Select a folder through the platform picker.
5. Open the registered workspace.

Removing a workspace registration does not delete its source files.

## What DevDesk indexes

DevDesk can inspect supported Markdown files, frontmatter, headings, tags, wiki links, normal Markdown links, backlinks, unresolved references, and graph relationships.

## Health and permissions

A workspace can become read-only or unavailable if its folder moves or Android access is lost. Re-select the folder instead of creating a duplicate registration.

## Android notes

Android access depends on the folder location and the picker permission provided by the operating system. Keep the selected folder available and avoid moving it while DevDesk is open.

## Windows notes

Windows workspaces use selected local paths. Network drives, removable drives, permission changes, or antivirus locks can make a workspace temporarily unavailable.

## Safety

DevDesk does not delete source files when you remove a workspace. A write action should show a preview or confirmation when it can change multiple documents.

## Recommended first folder

A useful workspace normally contains ordinary `.md` files grouped by purpose:

```text
project-docs/
├── index.md
├── architecture/
├── api/
├── decisions/
├── runbooks/
└── references/
```

DevDesk does not require this exact structure. It scans supported Markdown and builds relationships from the content.

## Register versus copy

Registering a workspace tells DevDesk where the folder is. It does not create a cloud copy. Removing the registration does not delete the folder.

## Re-index after external changes

When another editor changes files:

1. Save or discard any unsaved DevDesk edit.
2. Refresh or rebuild the workspace index.
3. Review conflict warnings before overwriting.
4. Re-select the folder if Android permission was lost or the path moved.
