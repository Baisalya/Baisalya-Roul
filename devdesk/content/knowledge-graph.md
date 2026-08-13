# Relationships and graph

The graph visualizes relationships resolved from saved Markdown links. Markdown remains the source of truth; DevDesk does not require a separate graph database.

## Local and Workspace views

- **Local:** active note plus nearby outgoing links and backlinks.
- **Workspace:** a bounded view of indexed relationships across the active project.

Use **Depth** to expand the Local neighborhood. Local and Workspace now have the same replay action: select the small floating play button or open **Timeline** in the controls panel. DevDesk replays the currently selected scope instead of switching back to Workspace.

## Professional graph controls

Open **Controls** to use filters, color groups, timeline, display, and layout forces. These choices are optional device-local presentation preferences. They do not rewrite Markdown or add portable metadata.

### Filters

Type ordinary words to match titles and paths, or use focused terms such as:

- `tag:api` for a tag;
- `type:note` for an item type;
- `status:todo` for a status;
- `folder:docs` for a project folder;
- `link:release` for a relationship target.

The panel can also include or hide tag nodes, attachments, existing files only, unresolved targets, and orphans. An active-filter summary remains visible on the canvas with **Clear filters** so an empty graph is recoverable.

### Color groups

Select **New color group**, give the group a name, enter the same query syntax used by filters, and choose a color. The first enabled group that matches a note wins. Toggle, edit, or delete a group from the panel.

Groups help distinguish research, API, release, study, or other user-defined areas. Color remains supplementary: labels, paths, type, focus, and the legend continue to communicate meaning.

### Timeline and floating replay

Timeline reveals notes in created-date order. When a valid `created` property is unavailable, DevDesk uses the file's indexed modified date as the fallback.

- Select **Play** to start or pause.
- Drag the slider to inspect a point in workspace history.
- Choose a playback speed.
- Use the floating play button on the graph when the controls panel is closed.
- At the end, the floating action becomes **Replay**.

The floating control is intentionally small and labeled on hover or focus. It works for both Local and Workspace scope. Playback changes only what is visible; it does not edit dates or files.

## Professional focus behavior

The graph keeps dense projects readable:

- connections remain thin at every zoom level;
- links use soft curves instead of heavy rods;
- reciprocal links use separate curved lanes;
- hovering a node emphasizes only its immediate neighborhood;
- unrelated nodes and links remain as quiet context;
- arrows appear on focused connections to show outgoing direction;
- the selected node uses a clear surface, border, and readable label.
- force-directed spacing resolves visible label collisions after layout;
- very large graphs switch to a bounded roomy layout instead of running an expensive all-pairs simulation;
- residual overlaps are placed into open positions dynamically for the current window.

## Navigate and arrange

- Select a node to open its document.
- Pan with touch, mouse, or trackpad.
- Use **+** and **-** or a canvas gesture to zoom.
- Use **Fit view** after changing filters, depth, or window size.
- Drag a node to save a preferred device-local position.
- With the graph focused, use arrow keys to select a nearby node, Enter to open
  it, and Escape to clear selection.

When zoomed far out, non-selected labels collapse into compact type-colored nodes. The selected note remains labeled. Hover a compact node to see its title, path, and connection count.

## Display controls

The header reports visible notes, links, and orphans. **Options** always includes
a legend, so node meaning is not communicated by color alone. Active filters
remain visible with a **Clear filters** action, including in an empty result.

| Control | Effect |
|---|---|
| Local / Workspace | Switches between neighborhood and bounded project graph |
| Depth | Adds relationship steps to the Local view |
| `+` / `-` | Zooms the complete canvas |
| Fit view | Centers and scales visible nodes |
| Node size | Changes node rendering size |
| Link thickness | Adjusts connection emphasis inside a safe range |
| Labels | Shows or hides node titles |
| Arrows | Shows direction on focused links |
| Orphans | Includes or hides unconnected notes |
| Text fade | Controls when non-selected labels simplify while zooming out |

Link thickness is deliberately bounded so zooming or moving the control cannot turn connections into opaque bands.

## Layout forces

The **Forces** section changes the Workspace layout without changing project files:

| Force | What it changes |
|---|---|
| Center force | Pulls the complete layout toward the viewport center |
| Repel force | Creates space between nodes and labels |
| Link force | Pulls connected notes toward their preferred relationship distance |
| Link distance | Changes the preferred space along a connection |

Select **Reset forces** if the graph becomes too loose or tight. DevDesk fits the graph again after a meaningful control change. On a dense project, increase repel or link distance slightly, then use **Fit view**. Extreme values remain bounded for usability.

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
- Reduce **Link thickness** if you increased it.
- Reset forces, then increase **Repel force** or **Link distance** gradually when labels still feel crowded.
- Hide tag nodes, attachments, unresolved targets, or orphans when they are not part of the current question.
- Pause Timeline or move its slider to the end when expected nodes have not appeared yet.
- Inspect unresolved and ambiguous links.
- Refresh the project index when watching is unavailable.
