# Visual Canvas

Visual Canvas opens the portable `.canvas` JSON format for brainstorming,
architecture sketches, and spatial project maps. A Canvas may stay independent
outside every workspace or belong to one selected workspace.

## Create a Canvas

1. Open **All tools > Visual Canvas**, or open a `.canvas` file.
2. Add a text, file, link, or group node.
3. Drag nodes to arrange them; pan or zoom the surface as needed.
4. Use connection mode to select a source and target, then optionally add a
   label and arrow direction.
5. Use color, edit, delete, undo, redo, and **Fit view** to refine the board.
6. Save in the workspace, or use **Save As** for an independent copy.

File nodes use paths relative to the Canvas or workspace. Link nodes remain
ordinary URLs and are never fetched merely because the Canvas opens.

## Portability and conflict protection

DevDesk preserves unknown root, node, and edge fields while reading and saving
valid Canvas files. Existing files use a fingerprint before replacement. If
another app changes the file first, DevDesk reports the conflict instead of
silently overwriting it.

Invalid JSON, duplicate node IDs, or missing node references produce a
source-preserving error state. Correct the source or open another file; DevDesk
does not rewrite a damaged Canvas automatically.

## Safety and platform behavior

Canvas content is data only. Opening it does not run scripts, Git, project
commands, URLs, or embedded code. Bounded node and edge limits keep an
unexpected file from exhausting the interface.

Windows and Android use the same portable file. On a narrow or freeform Android
window, creation and editing actions move into compact menus rather than
disappearing.
