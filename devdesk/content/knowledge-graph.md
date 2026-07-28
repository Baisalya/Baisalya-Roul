# Relationships and graph

The graph visualizes relationships resolved from saved Markdown links. Markdown remains the source of truth; DevDesk does not require a separate graph database.

## Local and Workspace views

- **Local:** active note plus nearby outgoing links and backlinks.
- **Workspace:** a bounded view of indexed relationships across the active project.

Use **Depth** to expand the Local neighborhood. Use title, path, type, or tag filters to narrow either view.

## Professional focus behavior

The graph keeps dense projects readable:

- connections remain thin at every zoom level;
- links use soft curves instead of heavy rods;
- reciprocal links use separate curved lanes;
- hovering a node emphasizes only its immediate neighborhood;
- unrelated nodes and links remain as quiet context;
- arrows appear on focused connections to show outgoing direction;
- the selected node uses a clear surface, border, and readable label.

## Navigate and arrange

- Select a node to open its document.
- Pan with touch, mouse, or trackpad.
- Use **+** and **-** or a canvas gesture to zoom.
- Use **Fit view** after changing filters, depth, or window size.
- Drag a node to save a preferred device-local position.

When zoomed far out, non-selected labels collapse into compact type-colored nodes. The selected note remains labeled. Hover a compact node to see its title, path, and connection count.

## Display controls

| Control | Effect |
|---|---|
| Local / Workspace | Switches between neighborhood and bounded project graph |
| Depth | Adds relationship steps to the Local view |
| `+` / `-` | Zooms the complete canvas |
| Fit view | Centers and scales visible nodes |
| Node size | Changes node rendering size |
| Link width | Adjusts connection emphasis inside a safe range |
| Labels | Shows or hides node titles |
| Arrows | Shows direction on focused links |
| Orphans | Includes or hides unconnected notes |

Link width is deliberately bounded so zooming or moving the control cannot turn connections into opaque bands.

## Edit connections

1. Open the source note.
2. Select **Edit links**.
3. Select a target node.
4. Finish link editing.

DevDesk writes portable standard Markdown links inside its managed block. It can remove only links it created there. Manual links, wiki links, and prose outside the block are preserved.

Connection badges distinguish managed outgoing, manual outgoing, incoming, and available targets without relying on color alone.

If the source already has unsaved text, the connection stays in the draft instead of forcing a save. **Undo** restores the previous content while safe. An external edit blocks undo instead of being overwritten.

## What a graph edge means

- A link proves only that one file references another.
- It does not prove that either claim is correct or verified.
- Node size reflects layout and connection rules, not truth or priority.
- An orphan may be an intentional draft.
- Broken or ambiguous links are diagnostics, not reasons to delete content automatically.

## Troubleshooting

- Save the active Markdown file.
- Select **Fit view**.
- Clear filters.
- Hover one node to isolate its neighborhood.
- Reduce **Link width** if you increased it.
- Inspect unresolved and ambiguous links.
- Refresh the project index when watching is unavailable.
