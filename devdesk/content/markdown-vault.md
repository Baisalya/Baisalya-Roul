# Markdown Vault

Markdown Vault is a local personal wiki for notes managed inside DevDesk.

## Use it for

- Personal technical notes
- Reusable reference pages
- Linked ideas and backlinks
- Tags, favourites, and pinned notes
- Quick switcher and command palette workflows

## Basic workflow

1. Create or select a note.
2. Edit Markdown and optional frontmatter.
3. Add `[[Wiki links]]` or standard Markdown links.
4. Save and inspect backlinks.
5. Pin or favourite frequently used notes.

## Secret-aware content

Vault metadata can mark sensitive values. Copy and export paths apply conservative masking where supported, but always review output before sharing.

## External files

Markdown Vault is different from a registered Developer Workspace. Use Developer Workspaces when you need to work directly with an existing project folder.

## Keyboard

Windows users can use the quick switcher, command palette, save shortcut, and keyboard navigation shown in tooltips.

## Vault versus project workspace

| Markdown Vault | Developer Workspace |
|---|---|
| Notes managed inside DevDesk storage | Existing external project folder |
| Personal reference and quick capture | Project documentation shared through normal files |
| Vault-specific favourites and navigation | Filesystem, graph, OKF, and project-oriented workflows |

## Simple note example

```markdown
---
tags: [flutter, release]
---
# Android release checklist

- Run `flutter analyze`
- Run tests
- Build the app bundle
- Review [[Signing notes]]
```
