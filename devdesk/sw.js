const BUILD_ID = '20260813.1';
const CACHE_PREFIX = 'devdesk-docs-';
const CACHE_NAME = `${CACHE_PREFIX}${BUILD_ID}`;
const ASSETS = [
  "./index.html",
  "./downloads.html",
  "./assets/css/styles.css",
  "./assets/js/app.js",
  "./assets/js/site-config.js",
  "./assets/js/search-index.js",
  "./assets/js/manual-visuals.js",
  "./assets/js/support-assistant.js",
  "./assets/img/devdesk-logo-64.png",
  "./assets/img/devdesk-logo-128.png",
  "./assets/img/devdesk-logo-192.png",
  "./assets/img/devdesk-logo-512.png",
  "./manual/user-manual.html",
  "./manual/visual-feature-guide.html",
  "./manual/workspace-workbench.html",
  "./manual/diagram-studio.html",
  "./manual/agent-connector.html",
  "./manual/getting-started.html",
  "./manual/downloads-installation.html",
  "./manual/interface-tour.html",
  "./manual/developer-workspaces.html",
  "./manual/project-folder-structure.html",
  "./manual/markdown-basics.html",
  "./manual/frontmatter-properties.html",
  "./manual/links-backlinks-nodes.html",
  "./manual/knowledge-workspace.html",
  "./manual/knowledge-graph.html",
  "./manual/structured-views.html",
  "./manual/visual-canvas.html",
  "./manual/graph-connection-editing.html",
  "./manual/markdown-vault.html",
  "./manual/markdown-editor.html",
  "./manual/structured-knowledge-okf.html",
  "./manual/okf-bundle-structure.html",
  "./manual/okf-concepts-metadata.html",
  "./manual/okf-conversion-migration.html",
  "./manual/okf-trust-sources-lifecycle.html",
  "./manual/okf-attested-computation.html",
  "./manual/readme-generator.html",
  "./manual/api-workspaces.html",
  "./manual/api-environments-secrets.html",
  "./manual/api-assertions-extraction.html",
  "./manual/quick-api.html",
  "./manual/openapi-studio.html",
  "./manual/unified-search.html",
  "./manual/json-tools.html",
  "./manual/jwt-decoder.html",
  "./manual/regex-tester.html",
  "./manual/base64.html",
  "./manual/url-tools.html",
  "./manual/timestamp.html",
  "./manual/uuid.html",
  "./manual/diff-git.html",
  "./manual/snippets-notes.html",
  "./manual/backup-restore.html",
  "./manual/settings-appearance.html",
  "./manual/privacy-security.html",
  "./manual/keyboard-shortcuts.html",
  "./manual/troubleshooting.html",
  "./manual/faq.html"
];

async function cacheResponse(request, response) {
  if (!response || !response.ok) return response;
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request, { cache: 'reload' });
    return await cacheResponse(request, response);
  } catch (_) {
    const cached = await caches.match(request, { ignoreSearch: false });
    if (cached) return cached;
    if (request.mode === 'navigate') {
      return (await caches.match('./index.html')) || Response.error();
    }
    return Response.error();
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(ASSETS.map(async (asset) => {
      const request = new Request(asset, { cache: 'reload' });
      const response = await fetch(request);
      if (response.ok) await cache.put(asset, response);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
      .map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'GET_VERSION') {
    event.source?.postMessage({ type: 'VERSION', buildId: BUILD_ID });
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(networkFirst(event.request));
});
