(() => {
  const pageToScene = {
    'user-manual': 'workspace',
    'getting-started': 'workspace',
    'downloads-installation': 'settings',
    'interface-tour': 'workspace',
    'workspace-workbench': 'workbench',
    'developer-workspaces': 'workspace',
    'project-folder-structure': 'workspace',
    'markdown-basics': 'markdown',
    'frontmatter-properties': 'views',
    'links-backlinks-nodes': 'graph',
    'knowledge-workspace': 'markdown',
    'knowledge-graph': 'graph',
    'graph-connection-editing': 'graph',
    'structured-views': 'views',
    'visual-canvas': 'canvas',
    'diagram-studio': 'diagram',
    'markdown-vault': 'markdown',
    'markdown-editor': 'markdown',
    'structured-knowledge-okf': 'okf',
    'okf-bundle-structure': 'okf',
    'okf-concepts-metadata': 'okf',
    'okf-conversion-migration': 'okf',
    'okf-trust-sources-lifecycle': 'okf',
    'okf-attested-computation': 'okf',
    'readme-generator': 'markdown',
    'api-workspaces': 'api',
    'api-environments-secrets': 'api',
    'api-assertions-extraction': 'api',
    'quick-api': 'api',
    'openapi-studio': 'openapi',
    'unified-search': 'search',
    'json-tools': 'json',
    'jwt-decoder': 'utility',
    'regex-tester': 'utility',
    'base64': 'utility',
    'url-tools': 'utility',
    'timestamp': 'utility',
    'uuid': 'utility',
    'diff-git': 'git',
    'snippets-notes': 'markdown',
    'agent-connector': 'agent',
    'backup-restore': 'settings',
    'settings-appearance': 'settings',
    'privacy-security': 'settings',
    'keyboard-shortcuts': 'workbench',
    'troubleshooting': 'workspace',
    'faq': 'workspace',
  };

  const sceneDetails = {
    workspace: {
      title: 'Project workspace',
      caption: 'Files, views, tools, and project context stay together.',
    },
    workbench: {
      title: 'Workspace workbench',
      caption: 'Five visible tabs keep the strip readable; extra tabs remain one click away.',
    },
    graph: {
      title: 'Knowledge graph',
      caption: 'Switch scope, filter, group, tune the layout, or replay the timeline.',
    },
    diagram: {
      title: 'Diagram Studio',
      caption: 'Build and export professional diagrams from a portable project file.',
    },
    canvas: {
      title: 'Visual Canvas',
      caption: 'Arrange text, file, link, and group cards on a portable spatial board.',
    },
    views: {
      title: 'Structured views',
      caption: 'See the same Markdown-backed items as a table, board, cards, timeline, or map.',
    },
    markdown: {
      title: 'Markdown workspace',
      caption: 'Edit, preview, outline, and inspect portable text without leaving the project.',
    },
    okf: {
      title: 'Structure checks',
      caption: 'Separate required findings, advice, and reviewable improvements.',
    },
    api: {
      title: 'API Studio',
      caption: 'Keep collections, environments, requests, checks, and responses organized.',
    },
    openapi: {
      title: 'OpenAPI Studio',
      caption: 'Inspect a contract, browse endpoints, and create a saved API collection.',
    },
    search: {
      title: 'Project search',
      caption: 'Find workspace files and indexed content without mixing other projects.',
    },
    json: {
      title: 'JSON Tools',
      caption: 'Validate, format, inspect, and save the selected project JSON file.',
    },
    utility: {
      title: 'Focused utility',
      caption: 'Transform or inspect a value locally with a clear input and output.',
    },
    git: {
      title: 'Source Control',
      caption: 'Review project-scoped changes, history, branches, and diffs explicitly.',
    },
    agent: {
      title: 'AI Agent Connector',
      caption: 'Assign bounded workspace context and keep proposed writes behind review.',
    },
    settings: {
      title: 'Settings and recovery',
      caption: 'Control appearance, privacy, updates, backup, and device-local trust.',
    },
  };

  const rail = `
    <div class="dd-app-rail" aria-hidden="true">
      <span class="dd-brand-glyph">D</span><i></i><i></i><i></i><i></i><b></b>
    </div>`;

  const titlebar = (title, tabs = '') => `
    <div class="dd-app-titlebar" aria-hidden="true">
      <strong>DevDesk</strong><span>File</span><span>Edit</span><span>View</span><span>Tools</span>
      <div class="dd-command">Search commands...</div><em>_</em><em>□</em><em>×</em>
    </div>${tabs}`;

  const projectTree = (active = 'Architecture.md') => `
    <aside class="dd-project-tree" aria-hidden="true">
      <div class="dd-tree-heading"><strong>Project</strong><b>+</b></div>
      <div class="dd-tree-row folder"><i></i><span>DevDesk workspace</span></div>
      <div class="dd-tree-row folder"><i></i><span>diagrams</span></div>
      <div class="dd-tree-row ${active === 'system.flowchart' ? 'active' : ''}"><i></i><span>system.flowchart</span></div>
      <div class="dd-tree-row folder"><i></i><span>docs</span></div>
      <div class="dd-tree-row ${active === 'Architecture.md' ? 'active' : ''}"><i></i><span>Architecture.md</span></div>
      <div class="dd-tree-row"><i></i><span>Release Checklist.md</span></div>
      <div class="dd-tree-row folder"><i></i><span>src</span></div>
    </aside>`;

  const tabs = (active = 'Architecture.md', hidden = false) => `
    <div class="dd-tab-strip" aria-hidden="true">
      ${['START-HERE.md', 'Release Checklist.md', 'api-workspace.json', 'AGENT-WORKFLOW.md', active]
        .map((label) => `<span class="${label === active ? 'active' : ''}">${label}<b>×</b></span>`)
        .join('')}
      ${hidden ? '<button type="button" tabindex="-1">⌄ <strong>7</strong></button>' : ''}
    </div>`;

  function workspaceScene() {
    return `
      ${rail}${projectTree()}
      <div class="dd-scene-main dd-workspace-scene">
        <div class="dd-scene-toolbar"><strong>Developer tools</strong><button type="button" tabindex="-1">+ Add tool</button></div>
        <p>Tools opened here receive this workspace context.</p>
        <div class="dd-tool-card-grid">
          <div><i class="dd-tool-mark graph"></i><strong>Knowledge graph</strong><small>Derived project view</small></div>
          <div><i class="dd-tool-mark diagram"></i><strong>Diagram Studio</strong><small>Saved in this project</small></div>
          <div><i class="dd-tool-mark api"></i><strong>API workspaces</strong><small>Workspace ready</small></div>
          <div><i class="dd-tool-mark git"></i><strong>Git status</strong><small>Project scoped</small></div>
        </div>
      </div>`;
  }

  function workbenchScene() {
    return `
      ${rail}${projectTree('Architecture.md')}
      <div class="dd-scene-main dd-workbench-scene">
        <div class="dd-hidden-menu">
          <strong>7 hidden tabs</strong><span>Graph controls</span><span>API Studio</span><span>system.flowchart</span>
        </div>
        <div class="dd-editor-header"><span>Architecture</span><b>Preview</b><b>Split</b></div>
        <div class="dd-code-line wide"></div><div class="dd-code-line"></div>
        <div class="dd-code-line short"></div><div class="dd-code-line wide"></div>
        <div class="dd-context-card"><strong>Context</strong><span>Properties</span><span>Relationships</span></div>
      </div>`;
  }

  function graphScene() {
    return `
      <div class="dd-graph-toolbar" aria-hidden="true"><b>✓ Local</b><span>Workspace</span><i></i><i></i><i></i><button type="button" tabindex="-1">Controls</button></div>
      <div class="dd-graph-stage" aria-hidden="true">
        <i class="edge e1"></i><i class="edge e2"></i><i class="edge e3"></i><i class="edge e4"></i><i class="edge e5"></i>
        <div class="node n1 selected"><span></span>Architecture</div>
        <div class="node n2"><span></span>Start here</div>
        <div class="node n3"><span></span>Release plan</div>
        <div class="node n4"><span></span>API notes</div>
        <div class="node n5"><span></span>Agent workflow</div>
        <button class="dd-graph-play" type="button" tabindex="-1"><b>▶</b><span>Local timeline</span></button>
      </div>
      <aside class="dd-graph-controls" aria-hidden="true">
        <div><strong>Filters</strong><b>⌄</b></div><label>Search files...</label>
        <div><strong>Groups</strong><b>⌄</b></div><span class="dd-group-chip purple">Research</span><span class="dd-group-chip blue">API</span>
        <div><strong>Timeline</strong><b>⌃</b></div><input aria-hidden="true" tabindex="-1" type="range" value="72">
        <div><strong>Display & forces</strong><b>⌄</b></div>
      </aside>`;
  }

  function diagramScene() {
    return `
      ${projectTree('system.flowchart')}
      <aside class="dd-shape-library" aria-hidden="true">
        <strong>SHAPE LIBRARY</strong><label>Search shapes...</label>
        <small>BASIC</small><span><i class="pill"></i>Start / End</span><span><i></i>Process</span><span><i class="diamond"></i>Decision</span><span><i class="slant"></i>Input / Output</span>
        <small>SOFTWARE</small><span><i></i>Service</span><span><i class="cylinder"></i>Database</span>
      </aside>
      <div class="dd-diagram-stage" aria-hidden="true">
        <div class="shape start">Start</div><div class="shape process">Validate request</div><div class="shape decision">Valid?</div><div class="shape end">Return response</div>
        <i class="connector c1"></i><i class="connector c2"></i><i class="connector c3"></i>
        <span class="edge-label">Yes</span>
        <div class="dd-zoom">−　Fit　+</div>
      </div>`;
  }

  function canvasScene() {
    return `
      ${projectTree('project.canvas')}
      <div class="dd-canvas-stage" aria-hidden="true">
        <div class="canvas-card note"><small>Idea</small><strong>Plan the release</strong><p>Keep the decision and evidence together.</p></div>
        <div class="canvas-card file"><small>File</small><strong>Architecture.md</strong><p>Open the project note.</p></div>
        <div class="canvas-card link"><small>Link</small><strong>Release reference</strong><p>External URL</p></div>
        <i class="canvas-edge e1"></i><i class="canvas-edge e2"></i>
        <div class="canvas-group">Release map</div>
      </div>`;
  }

  function viewsScene() {
    return `
      ${rail}
      <div class="dd-scene-main dd-views-scene" aria-hidden="true">
        <div class="dd-view-tabs"><b>List</b><b class="active">Table</b><b>Cards</b><b>Board</b><b>Timeline</b></div>
        <div class="dd-table-head"><span>Title</span><span>Status</span><span>Due</span><span>Tags</span></div>
        <div class="dd-table-row"><strong>Review release</strong><em>In progress</em><span>Aug 15</span><i>release</i></div>
        <div class="dd-table-row"><strong>API checklist</strong><em>Todo</em><span>Aug 18</span><i>api</i></div>
        <div class="dd-table-row"><strong>Publish manual</strong><em>Ready</em><span>Aug 20</span><i>docs</i></div>
        <div class="dd-view-footer"><span>3 Markdown-backed items</span><button type="button" tabindex="-1">Configure view</button></div>
      </div>`;
  }

  function markdownScene() {
    return `
      ${projectTree('Architecture.md')}
      <div class="dd-markdown-scene" aria-hidden="true">
        <div class="dd-editor-header"><strong>Architecture.md</strong><b>Edit</b><b class="active">Split</b><b>Preview</b></div>
        <div class="dd-editor-source"><span># System architecture</span><span>## API boundary</span><span>See [[Release plan]]</span><span>- Local files</span><span>- Review before write</span></div>
        <div class="dd-editor-preview"><h4>System architecture</h4><h5>API boundary</h5><p>See <u>Release plan</u></p><ul><li>Local files</li><li>Review before write</li></ul></div>
      </div>`;
  }

  function okfScene() {
    return `
      <div class="dd-okf-scene" aria-hidden="true">
        <div class="dd-okf-summary"><strong>Structure checks</strong><span>12 documents inspected</span><button type="button" tabindex="-1">Analyze workspace</button></div>
        <div class="dd-status-card good"><b>✓</b><span><strong>Required rules</strong><small>All required files are valid</small></span><em>Ready</em></div>
        <div class="dd-status-card warn"><b>!</b><span><strong>Optional improvements</strong><small>3 reviewable suggestions</small></span><em>Review</em></div>
        <div class="dd-status-card"><b>↺</b><span><strong>Recovery</strong><small>No interrupted plan detected</small></span><em>Safe</em></div>
      </div>`;
  }

  function apiScene() {
    return `
      <aside class="dd-api-sidebar" aria-hidden="true"><strong>COLLECTIONS</strong><span class="active">Users</span><span>Orders</span><span>Health</span><strong>ENVIRONMENT</strong><b>Development ⌄</b></aside>
      <div class="dd-api-scene" aria-hidden="true">
        <div class="dd-request-bar"><b>GET</b><span>https://api.example.dev/users</span><button type="button" tabindex="-1">Send</button></div>
        <div class="dd-request-tabs"><b>Params</b><b>Headers</b><b>Body</b><b>Tests</b></div>
        <div class="dd-response-head"><strong>Response</strong><em>200 OK</em><span>184 ms</span></div>
        <pre>{
  "users": [
    { "id": 42, "status": "active" }
  ]
}</pre>
      </div>`;
  }

  function openApiScene() {
    return `
      <aside class="dd-openapi-sidebar" aria-hidden="true"><strong>ENDPOINTS</strong><span class="get">GET</span><b>/users</b><span class="post">POST</span><b>/users</b><span class="get">GET</span><b>/health</b></aside>
      <div class="dd-openapi-scene" aria-hidden="true">
        <div class="dd-openapi-title"><span class="get">GET</span><strong>/users</strong><em>List users</em></div>
        <div class="dd-schema-card"><strong>Responses</strong><span><b>200</b> application/json</span><span><b>401</b> Unauthorized</span></div>
        <button type="button" tabindex="-1">Create API collection</button>
      </div>`;
  }

  function searchScene() {
    return `
      ${projectTree()}
      <div class="dd-search-scene" aria-hidden="true">
        <div class="dd-search-box">⌕ <strong>release checklist</strong><kbd>Esc</kbd></div>
        <small>6 results in DevDesk workspace</small>
        <div class="dd-search-result active"><strong>Release Checklist.md</strong><span>docs/Release Checklist.md</span><p>Run the final release checks before publishing...</p></div>
        <div class="dd-search-result"><strong>START-HERE.md</strong><span>START-HERE.md</span><p>Follow the linked release checklist...</p></div>
        <div class="dd-search-result"><strong>AGENT-WORKFLOW.md</strong><span>docs/AGENT-WORKFLOW.md</span><p>Review every proposed release change...</p></div>
      </div>`;
  }

  function jsonScene() {
    return `
      ${projectTree('api-workspace.json')}
      <div class="dd-json-scene" aria-hidden="true">
        <div class="dd-editor-header"><strong>api-workspace.json</strong><b>Format</b><b>Validate</b><b>Tree</b></div>
        <div class="dd-json-code"><span>{</span><span>　"name": <i>"DevDesk API"</i>,</span><span>　"version": <i>1</i>,</span><span>　"portable": <i>true</i>,</span><span>　"collections": [ ... ]</span><span>}</span></div>
        <div class="dd-json-status">✓ Valid JSON <button type="button" tabindex="-1">Save to project</button></div>
      </div>`;
  }

  function utilityScene() {
    return `
      <div class="dd-utility-scene" aria-hidden="true">
        <div class="dd-utility-head"><i>{ }</i><span><strong>Developer utility</strong><small>Local input and output</small></span></div>
        <label>Input</label><div class="dd-utility-input">Paste or type a value...</div>
        <div class="dd-utility-actions"><button type="button" tabindex="-1">Transform</button><button type="button" tabindex="-1">Clear</button></div>
        <label>Result</label><div class="dd-utility-output"><b>✓</b> Ready to copy</div>
      </div>`;
  }

  function gitScene() {
    return `
      <aside class="dd-git-sidebar" aria-hidden="true"><strong>SOURCE CONTROL</strong><label>Message (Ctrl+Enter)</label><button type="button" tabindex="-1">Commit</button><small>CHANGES　3</small><span>M　Architecture.md</span><span>A　diagram.flowchart</span><span>M　README.md</span></aside>
      <div class="dd-git-scene" aria-hidden="true">
        <div class="dd-git-toolbar"><strong>History</strong><b>main ⌄</b><button type="button" tabindex="-1">Fetch</button><button type="button" tabindex="-1">Push</button></div>
        <div class="dd-commit-row active"><i></i><span><strong>Improve graph controls</strong><small>baishalya · 2 hours ago</small></span><em>a42d9e</em></div>
        <div class="dd-commit-row"><i></i><span><strong>Add Diagram Studio</strong><small>baishalya · yesterday</small></span><em>c18f02</em></div>
        <div class="dd-diff-line remove">- old layout</div><div class="dd-diff-line add">+ responsive project layout</div>
      </div>`;
  }

  function agentScene() {
    return `
      <div class="dd-agent-scene" aria-hidden="true">
        <div class="dd-agent-stats"><span><b>Running</b><small>Connector</small></span><span><b>2</b><small>Connected</small></span><span><b>1</b><small>Working</small></span><span><b>1</b><small>Review</small></span></div>
        <div class="dd-agent-row active"><i></i><span><strong>Codex</strong><small>DevDesk workspace · Working</small></span><em>Read + propose</em></div>
        <div class="dd-agent-row"><i></i><span><strong>Gemini CLI</strong><small>Research notes · Idle</small></span><em>Read only</em></div>
        <div class="dd-review-card"><b>1</b><span><strong>Proposal ready for review</strong><small>2 files · no command executed</small></span><button type="button" tabindex="-1">Review</button></div>
      </div>`;
  }

  function settingsScene() {
    return `
      <aside class="dd-settings-nav" aria-hidden="true"><strong>Settings</strong><span class="active">Appearance</span><span>Privacy & security</span><span>Backup & recovery</span><span>Updates</span></aside>
      <div class="dd-settings-scene" aria-hidden="true">
        <h4>Appearance</h4><div class="dd-setting-row"><span><strong>Theme</strong><small>Use the system setting or choose manually</small></span><b>Dark ⌄</b></div>
        <div class="dd-setting-row"><span><strong>Comfortable density</strong><small>Responsive on Windows and Android freeform</small></span><i class="toggle on"></i></div>
        <h4>Recovery readiness</h4><div class="dd-recovery-card"><b>✓</b><span><strong>Workspace files remain external</strong><small>Export a recovery kit before reinstalling.</small></span><button type="button" tabindex="-1">Export kit</button></div>
      </div>`;
  }

  const sceneMarkup = {
    workspace: workspaceScene,
    workbench: workbenchScene,
    graph: graphScene,
    diagram: diagramScene,
    canvas: canvasScene,
    views: viewsScene,
    markdown: markdownScene,
    okf: okfScene,
    api: apiScene,
    openapi: openApiScene,
    search: searchScene,
    json: jsonScene,
    utility: utilityScene,
    git: gitScene,
    agent: agentScene,
    settings: settingsScene,
  };

  function buildPreview(scene, compact = false) {
    const safeScene = sceneMarkup[scene] ? scene : 'workspace';
    const details = sceneDetails[safeScene];
    const showTabs = ['workspace', 'workbench', 'diagram', 'canvas', 'markdown', 'json', 'git'].includes(safeScene);
    return `
      <div class="dd-app-preview dd-scene-${safeScene}${compact ? ' is-compact' : ''}" role="img" aria-label="Illustrated ${details.title} interface">
        ${titlebar(details.title, showTabs ? tabs(safeScene === 'diagram' ? 'system.flowchart' : safeScene === 'canvas' ? 'project.canvas' : safeScene === 'workbench' ? 'Architecture.md' : safeScene === 'json' ? 'api-workspace.json' : safeScene === 'git' ? 'Source Control' : 'Architecture.md', safeScene === 'workbench') : '')}
        <div class="dd-app-viewport">${sceneMarkup[safeScene]()}</div>
      </div>`;
  }

  document.querySelectorAll('[data-manual-preview]').forEach((slot) => {
    const scene = slot.dataset.manualPreview || 'workspace';
    slot.innerHTML = buildPreview(scene, slot.dataset.previewSize === 'compact');
  });

  const slug = window.location.pathname.split('/').pop()?.replace(/\.html$/i, '') || '';
  const article = document.querySelector('.article');
  if (article && slug !== 'visual-feature-guide' && !article.querySelector('.manual-screen-preview')) {
    const scene = pageToScene[slug] || 'workspace';
    const details = sceneDetails[scene];
    const figure = document.createElement('figure');
    figure.className = 'manual-screen-preview';
    figure.innerHTML = `${buildPreview(scene)}<figcaption><span><strong>${details.title}</strong>${details.caption}</span><a href="visual-feature-guide.html#feature-atlas">Open the visual feature atlas</a></figcaption>`;
    const heading = article.querySelector('h1');
    if (heading) heading.insertAdjacentElement('afterend', figure);
  }

  const search = document.querySelector('[data-visual-search]');
  const filterButtons = [...document.querySelectorAll('[data-visual-filter]')];
  const cards = [...document.querySelectorAll('[data-visual-card]')];
  let activeFilter = 'all';

  const applyVisualFilters = () => {
    const query = (search?.value || '').trim().toLowerCase();
    let visibleCount = 0;
    cards.forEach((card) => {
      const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchesQuery = !query || card.textContent.toLowerCase().includes(query);
      const visible = matchesFilter && matchesQuery;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    const status = document.querySelector('[data-visual-status]');
    if (status) status.textContent = `${visibleCount} feature ${visibleCount === 1 ? 'guide' : 'guides'} shown`;
  };

  filterButtons.forEach((button) => button.addEventListener('click', () => {
    activeFilter = button.dataset.visualFilter || 'all';
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    applyVisualFilters();
  }));
  search?.addEventListener('input', applyVisualFilters);
  if (cards.length) applyVisualFilters();
})();
