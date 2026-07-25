# Links, backlinks, and nodes

A Markdown file becomes a graph **node**. A saved link from one file to another becomes a directed **edge**.


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


## Standard Markdown link

```markdown
See the [API contract](../api/customer-api.md).
```

This is the portable form used by OKF and standard Markdown tools.

## Wiki-style link

```markdown
See [[Customer API]].
```

DevDesk can recognize wiki-style links in supported knowledge workflows. A wiki link depends on title/path resolution and can become ambiguous when multiple notes have the same name.

## Absolute bundle-relative link

```markdown
See the [Customer API](/api/customer-api.md).
```

For OKF bundles, a leading `/` means “from the bundle root.” It is often more stable when a file moves inside its current directory.

## Backlinks

If `architecture.md` links to `api.md`:

- `architecture.md` has an **outgoing link** to `api.md`.
- `api.md` automatically shows an **incoming backlink** from `architecture.md`.
- You do not manually write a second reverse link unless the content truly needs one.

## Create a connection manually

1. Open the source note.
2. Place the cursor where the relationship is explained.
3. Insert a normal Markdown link or wiki-style link.
4. Save the file.
5. Rebuild or refresh the graph if it does not update immediately.

## Avoid meaningless links

The link text and surrounding sentence should explain the relationship:

```markdown
The mobile client sends validated requests using the
[Customer API contract](../api/customer-api.md).
```

A graph edge is intentionally untyped; the prose gives it meaning.
