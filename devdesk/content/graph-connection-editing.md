# Edit graph connections

DevDesk can add or remove an outgoing relationship without making you type link syntax. The result remains ordinary portable Markdown.

## Managed block format

```markdown
<!-- Connections below are managed by DevDesk and remain normal Markdown links. -->
<!-- devdesk:graph-connections:start -->
- [Architecture](Architecture.md)
- [API Contract](API%20Contract.md)
<!-- devdesk:graph-connections:end -->
```

Existing older wiki links remain readable, but new graph-managed relationships use standard Markdown links.

## Add a connection

1. Open the source note.
2. Open the focused graph.
3. Select **Edit links**.
4. Select a target marked as available.
5. Finish link editing.

The visible graph updates immediately. A clean source can save through the conflict-safe file boundary. If the source has unsaved text, the connection remains in the draft until you save the document.

## Remove a connection

DevDesk removes only a relationship inside its managed block. A manually authored Markdown link or wiki link outside the block is locked from graph removal.

## Connection badges

- **Link:** managed outgoing relationship; select to remove.
- **Lock:** manual outgoing relationship; edit the note to remove.
- **Incoming arrow:** another note links here; select to add the reverse outgoing link.
- **Plus:** no outgoing relationship; select to add one.

## Undo

After a managed connection change, select **Undo** to restore the exact prior source while it remains safe. A later source edit can supersede undo. If an external program changed the file, undo stops and keeps that external change.

## Safety rules

- Self-links are blocked.
- Existing paths are resolved inside the project boundary.
- Manual prose is not rewritten.
- The active source note is the only note changed by this action.
- Saving uses expected fingerprints to prevent stale overwrite.
