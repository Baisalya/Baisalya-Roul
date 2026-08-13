# Visual feature guide

See the DevDesk screen before you use it. Every illustration on this page is built from HTML and CSS, follows the current dark workspace interface, and contains sample content only. No screenshot contains a real project, account, secret, or connector address.

<div class="visual-guide-intro">
  <div>
    <span class="eyebrow">A map of the whole app</span>
    <h2>Recognise the screen. Understand its job. Open the exact guide.</h2>
    <p>Use this atlas when a name such as Canvas, Graph, Diagram Studio, Source Control, or API Studio is unfamiliar. The picture shows the layout; the linked guide explains the safe workflow.</p>
  </div>
  <ol class="visual-guide-steps">
    <li><b>1</b><span>Find the screen or tool below.</span></li>
    <li><b>2</b><span>Compare the picture with DevDesk.</span></li>
    <li><b>3</b><span>Open the focused guide and follow its steps.</span></li>
  </ol>
</div>

## Feature atlas

<div class="visual-guide-tools">
  <input class="visual-guide-search" type="search" data-visual-search aria-label="Search the visual feature guide" placeholder="Search graph, diagrams, API, Git, Markdown...">
  <div class="visual-guide-filters" aria-label="Filter feature guides">
    <button class="active" type="button" data-visual-filter="all" aria-pressed="true">All</button>
    <button type="button" data-visual-filter="workspace" aria-pressed="false">Workspace</button>
    <button type="button" data-visual-filter="knowledge" aria-pressed="false">Knowledge</button>
    <button type="button" data-visual-filter="developer" aria-pressed="false">Developer</button>
    <button type="button" data-visual-filter="safety" aria-pressed="false">Safety</button>
  </div>
</div>
<p class="visual-guide-status" data-visual-status aria-live="polite">16 feature guides shown</p>

<div class="visual-feature-grid">
  <article class="visual-feature-card" data-visual-card data-category="workspace">
    <div data-manual-preview="workspace" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Workspace</span><h3>Project files and contextual tools</h3><p>Use the Project tree, open compatible files, and add tools that inherit the selected workspace without mixing independent data.</p><a href="workspace-workbench.html#developer-tools-inside-a-workspace">Learn the workspace tool model</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="workspace">
    <div data-manual-preview="workbench" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Workspace</span><h3>Workbench tabs and hidden-tab menu</h3><p>Keep five useful tabs visible, open the rest from the numbered dropdown, and use close or reopen actions without losing unsaved work.</p><a href="workspace-workbench.html#manage-many-tabs">Learn tab management</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="knowledge">
    <div data-manual-preview="graph" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Knowledge</span><h3>Local and workspace graph</h3><p>Explore linked notes, apply filters and color groups, adjust forces, and replay either graph scope from the panel or floating play control.</p><a href="knowledge-graph.html#professional-graph-controls">Use the graph controls</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="knowledge">
    <div data-manual-preview="diagram" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Visual thinking</span><h3>Diagram Studio</h3><p>Create flowcharts, software diagrams, mind maps, research maps, and study plans with searchable shapes and portable source.</p><a href="diagram-studio.html">Create a professional diagram</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="knowledge">
    <div data-manual-preview="canvas" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Visual thinking</span><h3>Visual Canvas</h3><p>Arrange text, file, link, and group cards freely when spatial thinking matters more than a formal process diagram.</p><a href="visual-canvas.html">Use Visual Canvas</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="workspace">
    <div data-manual-preview="views" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Workspace</span><h3>List, Table, Cards, Board, Calendar, Timeline, Outline, and Map</h3><p>Change the projection without creating duplicate tasks or notes. Every view reads the same Markdown-backed items.</p><a href="structured-views.html">Choose a structured view</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="knowledge">
    <div data-manual-preview="markdown" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Knowledge</span><h3>Markdown edit, preview, outline, and relationships</h3><p>Write portable text, follow links and backlinks, and keep project changes conflict-aware.</p><a href="knowledge-workspace.html">Edit workspace Markdown</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="workspace">
    <div data-manual-preview="search" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Workspace</span><h3>Project search</h3><p>Find indexed file names and content inside the active workspace without mixing unrelated folders.</p><a href="unified-search.html">Search this workspace</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="developer">
    <div data-manual-preview="api" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Developer</span><h3>API Studio and saved workspaces</h3><p>Organize requests, environments, assertions, extraction, runner results, and protected values.</p><a href="api-workspaces.html">Use saved API testing</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="developer">
    <div data-manual-preview="openapi" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Developer</span><h3>OpenAPI Studio</h3><p>Inspect Swagger or OpenAPI JSON/YAML, browse operations, and generate a collection deliberately.</p><a href="openapi-studio.html">Inspect an API contract</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="developer">
    <div data-manual-preview="json" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Developer</span><h3>JSON Tools</h3><p>Format, validate, inspect, and explicitly save compatible project JSON without changing unrelated files.</p><a href="json-tools.html">Use JSON Tools</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="developer">
    <div data-manual-preview="utility" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Developer</span><h3>Focused utilities</h3><p>Decode JWT, test Regex, convert Base64, encode URLs, convert timestamps, or generate UUIDs in clear input/output tools.</p><a href="jwt-decoder.html">Browse the first utility guide</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="developer">
    <div data-manual-preview="git" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Developer</span><h3>Source Control, history, branches, and Diff</h3><p>Inspect real repository state, compare files, and run explicit Git actions only inside a trusted local Windows workspace.</p><a href="workspace-workbench.html#source-control-and-project-terminals">Understand Source Control</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="developer">
    <div data-manual-preview="agent" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Developer</span><h3>AI Agent Connector</h3><p>Assign one workspace per session, enable only needed permissions, observe activity, and review proposals before any write.</p><a href="agent-connector.html">Connect a compatible agent</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="knowledge">
    <div data-manual-preview="okf" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Knowledge</span><h3>Structure checks (OKF)</h3><p>Analyze optional portable structure, separate required findings from advice, and preview recoverable improvements.</p><a href="structured-knowledge-okf.html">Use structure checks</a></div>
  </article>
  <article class="visual-feature-card" data-visual-card data-category="safety">
    <div data-manual-preview="settings" data-preview-size="compact"></div>
    <div class="visual-feature-copy"><span>Safety</span><h3>Settings, privacy, updates, and recovery</h3><p>Control appearance and device-local choices, verify update sources, and export a recovery kit before reinstalling.</p><a href="settings-appearance.html">Review settings and recovery</a></div>
  </article>
</div>

## Which visual tool should I choose?

| Your goal | Choose | Why |
|---|---|---|
| Show a formal sequence, decision, system, organization, or research process | **Diagram Studio** | Shapes, connectors, templates, auto layout, and PNG/SVG export |
| Arrange ideas, notes, files, links, and loose groups spatially | **Visual Canvas** | Freeform cards in the portable JSON Canvas format |
| Explore relationships already written in Markdown | **Knowledge graph** | Derived nodes and links with Local/Workspace scope, filters, groups, and timeline |
| Compare the same tasks or notes in rows, cards, status columns, dates, or locations | **Structured views** | Different projections over the same source items |

## Visuals are guidance, not fake screenshots

The illustrations intentionally use sample names such as `Architecture.md` and `api.example.dev`. They explain layout and purpose without claiming that a user performed an action or that a real request, Git operation, agent connection, verification, or file write succeeded. The focused guide remains the source for exact platform limits and safety steps.

