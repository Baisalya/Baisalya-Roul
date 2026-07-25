# Knowledge Graph

The graph visualizes resolved Markdown relationships. Markdown remains the source of truth.

## Local and workspace graphs

- **Local graph:** the active note, nearby outgoing links, and backlinks.
- **Workspace graph:** indexed relationships across the selected workspace.

## Navigation

- Select a node to open its document.
- Use **+** and **−** to zoom.
- Use **Fit** to center the visible graph.
- Pan the canvas with touch or mouse.
- Filter by title, path, type, or tag where available.

## Display options

Advanced options can show or hide labels, arrows, and orphan notes, and can adjust node size, link thickness, or local depth. They are collapsed by default so the graph remains the primary content.

## Edit connections

Connection editing updates a DevDesk-managed Markdown block in the active document.

- Add an outgoing connection by selecting another node.
- Remove only DevDesk-managed connections from the graph editor.
- Manually authored links outside the managed block are preserved.
- Self-links are blocked.
- Save and re-index complete the update.

## Direction and neighborhood

Arrow direction represents outgoing Markdown links. Local graph neighborhood can include both outgoing links and backlinks.

## Troubleshooting

If a node is missing, save the file, rebuild the graph, check the link target, and inspect unresolved or ambiguous link issues.


<div class="diagram-card" role="img" aria-label="Directed graph example showing Architecture linking to API Contract and Data Model, and both linking to Deployment Runbook">
<svg class="graph-diagram" viewBox="0 0 920 400" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" /></marker></defs>
  <path class="edge" d="M235 110 C340 110, 360 85, 470 85" marker-end="url(#arrow)"/>
  <path class="edge" d="M235 132 C345 165, 360 250, 470 260" marker-end="url(#arrow)"/>
  <path class="edge" d="M635 95 C740 120, 760 170, 765 230" marker-end="url(#arrow)"/>
  <path class="edge" d="M635 260 C705 260, 730 260, 765 260" marker-end="url(#arrow)"/>
  <g class="node primary"><rect x="45" y="70" width="190" height="90" rx="22"/><text x="140" y="108">Architecture</text><text class="sub" x="140" y="134">active note</text></g>
  <g class="node"><rect x="470" y="45" width="165" height="80" rx="20"/><text x="552" y="82">API Contract</text><text class="sub" x="552" y="106">outgoing link</text></g>
  <g class="node"><rect x="470" y="225" width="165" height="80" rx="20"/><text x="552" y="262">Data Model</text><text class="sub" x="552" y="286">outgoing link</text></g>
  <g class="node"><rect x="765" y="215" width="130" height="90" rx="20"/><text x="830" y="252">Deployment</text><text x="830" y="274">Runbook</text></g>
</svg>
<p class="diagram-caption">Each saved Markdown link becomes a directed edge. The target note receives a backlink automatically.</p>
</div>


## What the graph does not mean

- A larger node normally reflects connection/layout rules, not importance or truth.
- A link proves only that one file references another; it does not validate the referenced claim.
- An orphan can be intentional, such as a draft not yet connected.
- Broken links are useful diagnostics and are tolerated by OKF.

## Local graph spacing

The local view places the active note centrally and distributes nearby nodes around it. Use **Fit** after changing depth, filters, or window size.

## Graph controls

| Control | Effect |
|---|---|
| Local / Workspace | Switches between neighborhood and complete indexed graph |
| Depth | Expands how many relationship steps appear in a local graph |
| `+` / `−` | Zooms the complete canvas |
| Fit | Centers and scales visible nodes |
| Node size | Changes individual node rendering size |
| Link thickness | Changes edge rendering width |
| Labels | Shows or hides text labels |
| Arrows | Shows outgoing direction |
| Orphans | Includes or hides unconnected notes |
