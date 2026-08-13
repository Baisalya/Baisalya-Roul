# Diagram Studio

Diagram Studio creates professional diagrams inside DevDesk without requiring a cloud account or a proprietary online canvas. It stores the editable source as a portable `.flowchart` JSON file and can export a presentation copy as PNG or SVG.

Use Diagram Studio for flowcharts, software architecture, UML or ER sketches, networks, organization charts, mind maps, research maps, literature maps, study plans, and thesis planning. Use [Visual Canvas](visual-canvas.html) instead when you want a looser spatial board made from text, file, link, and group cards.

## Create a diagram in a workspace

1. Open a workspace.
2. Open **Developer tools**.
3. Select **Diagram Studio**.
4. Select **New diagram**.
5. Enter a short name such as `System architecture`.
6. Select **Create**.

DevDesk saves a new portable file inside the project's `diagrams/` folder and opens it as a project tab. Existing `.flowchart` files elsewhere in the same workspace also appear in the project Diagram Studio page. A new file is created exclusively; DevDesk does not replace an existing path with the same name.

You can also open Diagram Studio independently from **All tools**. Independent diagrams remain separate from project-scoped diagrams until you explicitly save or import them into a workspace.

## Understand the editor

- **Shape library:** search the catalog or browse Basic, Flowchart, Software, Data, Network, Organization, Research, Study, and other groups.
- **Diagram canvas:** drag shapes, pan the surface, and zoom or fit the complete diagram.
- **Toolbar:** open templates, undo, redo, choose automatic layout, fit the view, export, and save.
- **Properties:** edit the selected shape or connection, including label, color, type, size, line geometry, pattern, and arrowheads.
- **Compact layout:** on Android phones and freeform windows, quick shapes stay in a bottom palette and the full library opens from **More**.

The project tree can collapse automatically when the editor needs more horizontal space. Reopen it when you need another file; collapsing it does not close or move the project.

## Build the first flowchart

1. Add **Start / End** and label it `Start`.
2. Add **Process** and label it `Validate request`.
3. Add **Decision** and label it `Valid?`.
4. Add a final **Start / End** and label it `Return response`.
5. Select the first shape, choose **Connect to another shape**, then select the target.
6. Continue connecting the process and decision.
7. Select a connection to add `Yes` or `No`, choose straight, elbow, or curved geometry, and set arrowheads.
8. Use **Auto layout** or drag shapes into the final arrangement.
9. Save with **Ctrl+S** on Windows or the visible save action on Android.

Use **Duplicate** for repeated shapes. Undo and redo remain available for editor changes. Safety limits on nodes and connections prevent an unexpected file from exhausting the interface.

## Start from a template

Open **Diagram templates** and choose the closest starting point. Templates provide editable shapes and connections; they do not lock the diagram into one purpose. Replace sample labels, remove unneeded shapes, and add your own.

Templates include common software, data, organization, network, mind-map, research, literature, study, and thesis structures. Review every label before presenting or publishing: a template is a starting arrangement, not evidence that a process or architecture is correct.

## Save and export

- **Save diagram** updates the portable `.flowchart` source. Existing files use conflict checks so another app's newer change is not silently overwritten.
- **Export PNG** creates a raster image suited to documents, messages, and presentations.
- **Export SVG** creates a scalable vector copy suited to websites and further design work.
- **Show grid** changes the editing background.
- **Snap to grid** aligns moved shapes to the editing grid.

PNG and SVG are presentation exports. Continue editing the `.flowchart` source, then export again when the diagram changes.

## Windows, Android, and freeform behavior

Windows shows the full toolbar, side shape library, properties inspector, project tree, and workbench tabs when space permits. Android and narrow freeform windows move secondary actions into menus and use a bottom quick-shape palette. No required action should disappear; its position may change.

On a read-only workspace, DevDesk can open the diagram but cannot replace the project file. Export a separate copy or reopen the workspace with valid write access.

## Safety and portability

- Opening a `.flowchart` file treats its content as data. It does not execute scripts, links, embedded code, Git, terminal commands, or an AI agent.
- Unknown or invalid source is reported without silently rewriting the original file.
- Workspace diagrams remain inside the selected project. Independent diagrams do not appear in the project list until deliberately saved there.
- A diagram communicates structure; it does not prove that a process, system, citation, or research conclusion is correct.

For the surrounding project tabs and tools, continue with [Workspace workbench, tabs, and tools](workspace-workbench.html).

