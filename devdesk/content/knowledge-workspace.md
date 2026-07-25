# Knowledge Workspace

The Knowledge Workspace is the main environment for a registered Markdown project.

## Main areas

- **Document browser:** find and open Markdown files.
- **Editor:** edit the selected document.
- **Preview:** render Markdown safely.
- **Inspector:** view properties, outline, links, issues, and graph.
- **Focused graph:** expand the graph into the main workspace.

## Create or open a document

1. Select a document from the browser.
2. Use the create action for a new Markdown file.
3. Edit in the central editor.
4. Save before switching when changes are pending.

## Inspector

- **Properties:** YAML frontmatter and document metadata.
- **Outline:** headings and line navigation.
- **Links:** backlinks, outgoing links, unlinked mentions, and related tags.
- **Issues:** broken or ambiguous references.
- **Graph:** local or workspace relationships.

The browser and inspector can collapse on Windows. On Android they open as responsive sheets or focused views.

## Safe editing

DevDesk tracks unsaved changes and conflicts. When the file changes outside the app, review before overwriting.

## Related topics

See **Knowledge Graph**, **Structured Knowledge / OKF**, and **Developer Workspaces** for deeper workflows.

## A productive Windows layout

On a wide window:

```text
Document browser | Editor / preview | Inspector
```

Collapse the browser or inspector when the center content needs more room. The inspector tabs are contextual—not separate copies of the document.

## A productive Android layout

On a phone or narrow freeform window:

- The editor remains the primary surface.
- Document browser and inspector open as sheets or focused views.
- Advanced graph controls stay collapsed until requested.
- Save before switching documents when unsaved changes are present.

## External modification workflow

If another editor changes the file while DevDesk has unsaved text:

1. Stop and read the conflict message.
2. Copy any unsaved text you need to preserve.
3. Compare the external and local versions.
4. Save only after choosing which version should win.
