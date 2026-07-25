# Edit graph connections

DevDesk can edit outgoing connections from the active note without creating a separate graph database. It writes ordinary Markdown inside a clearly marked managed block.

## Managed block format

```markdown
<!-- Connections below are managed by DevDesk and remain normal Markdown links. -->
<!-- devdesk:graph-connections:start -->
- [[Architecture]]
- [[API Contract]]
<!-- devdesk:graph-connections:end -->
```

## Add a connection

1. Open the source note.
2. Open the graph and enable **Edit Markdown connections**.
3. Select a target node marked as available to connect.
4. Review the pending change.
5. Save and re-index.

## Remove a connection

DevDesk removes only a link that belongs to the managed block. A manually written link elsewhere is locked from this graph action to avoid silently deleting authored prose.

## Incoming links

An incoming marker means another note links to the active note. Selecting it can offer to add a reverse outgoing connection, but it must not rewrite the other source note silently.

## Safety behavior

- Self-connections are blocked.
- Existing unsaved edits prevent an automatic forced save.
- The file remains ordinary Markdown.
- Open the target note before changing connections that originate there.
