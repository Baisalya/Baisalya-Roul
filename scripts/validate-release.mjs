import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const storeUrl =
  'https://apps.microsoft.com/detail/9N8NH1LMZX1S?hl=en-us&gl=IN&ocid=pdpshare';
const failures = [];

async function text(relativePath) {
  return readFile(path.join(root, relativePath), 'utf8');
}

function requireText(source, expected, label) {
  if (!source.includes(expected)) {
    failures.push(`${label} is missing: ${expected}`);
  }
}

async function requireFile(relativePath, minimumBytes = 1) {
  try {
    const details = await stat(path.join(root, relativePath));
    if (!details.isFile() || details.size < minimumBytes) {
      failures.push(`${relativePath} is empty or is not a file.`);
    }
  } catch {
    failures.push(`${relativePath} does not exist.`);
  }
}

const portfolio = await text('index.html');
const siteConfig = await text('devdesk/assets/js/site-config.js');
const downloads = await text('devdesk/downloads.html');
const gettingStarted = await text('devdesk/content/getting-started.md');
const manual = await text('devdesk/content/user-manual.md');
const agentGuide = await text('devdesk/content/agent-connector.md');
const devdeskHome = await text('devdesk/index.html');
const supportAssistant = await text('devdesk/assets/js/support-assistant.js');
const devdeskApp = await text('devdesk/assets/js/app.js');
const serviceWorker = await text('devdesk/sw.js');
const viteConfig = await text('vite.config.js');
const manifest = JSON.parse(await text('devdesk/site.webmanifest'));

requireText(portfolio, storeUrl, 'Portfolio Microsoft Store action');
requireText(
  portfolio,
  'Android closed testing',
  'Portfolio Android availability message',
);
requireText(
  portfolio,
  'alt="DevDesk application logo"',
  'Portfolio DevDesk logo',
);
requireText(siteConfig, storeUrl, 'DevDesk site Microsoft Store action');
requireText(
  siteConfig,
  'Android closed testing',
  'DevDesk Android availability message',
);
requireText(
  downloads,
  'contact the developer to join',
  'Downloads closed-testing guidance',
);
requireText(
  devdeskHome,
  'manual/agent-connector.html',
  'DevDesk Agent Connector guide link',
);
requireText(
  devdeskHome,
  'data-assistant-open',
  'DevDesk support assistant action',
);
for (const expected of [
  'One calm workspace for the work that matters.',
  'Everyday &amp; work',
  'Students',
  'Researchers &amp; writers',
  'Developers',
  'devdesk-social-2026.png',
]) {
  requireText(devdeskHome, expected, 'DevDesk inclusive homepage');
}
for (const expected of [
  '### Everyday life and work',
  '### Student work',
  '### Research and writing',
  '### Software projects',
]) {
  requireText(gettingStarted, expected, 'DevDesk audience guide');
}
for (const expected of [
  'DEVDESK_SUPPORT_ASSISTANT',
  'Uses this manual only',
  'Answers are extracts, not AI-generated advice',
  'Choose the Study starter',
  'Choose Research / writing',
  'Choose Personal plan',
  'Choose Software project',
]) {
  requireText(supportAssistant, expected, 'DevDesk support assistant');
}
for (const [source, label] of [
  [devdeskHome, 'DevDesk homepage assets'],
  [downloads, 'DevDesk downloads assets'],
  [devdeskApp, 'DevDesk runtime'],
  [serviceWorker, 'DevDesk service worker'],
  [viteConfig, 'DevDesk production build'],
]) {
  requireText(source, '20260801.6', label);
}
for (const expected of [
  'controllerchange',
  'registration.update()',
  'support-assistant.js?v=${BUILD_ID}',
]) {
  requireText(devdeskApp, expected, 'DevDesk fresh-design runtime');
}
for (const expected of [
  "fetch(request, { cache: 'reload' })",
  'await self.skipWaiting()',
  'await self.clients.claim()',
  './assets/js/support-assistant.js',
]) {
  requireText(serviceWorker, expected, 'DevDesk fresh-design service worker');
}
for (const expected of [
  'get_active_workspace',
  'get_graph_neighbors',
  'propose_document_change',
  'Approve and apply',
  'Codex MCP guide',
  'Gemini CLI MCP server guide',
  'schedule_graph_health_check',
]) {
  requireText(agentGuide, expected, 'DevDesk Agent Connector guide');
}

for (const heading of [
  'Welcome to DevDesk',
  'Start Here: Your First Five Minutes',
  'Choose What You Want to Do',
  'Understanding a DevDesk Workspace',
  'Planning Your Work',
  'Markdown for Complete Beginners',
  'Connecting Notes',
  'Properties and Metadata',
  'Knowledge Graph',
  'Open Knowledge Format (OKF)',
  'API Workspaces',
  'OpenAPI Studio',
  'JSON Tools',
  'Git Tools',
  'Search, Navigation, and Shortcuts',
  'Connect an AI Agent',
  'Moving and Backing Up a Workspace',
  'Windows Guide',
  'Android Guide',
  'Privacy and Security',
  'Troubleshooting',
  'Glossary',
  'Frequently Asked Questions',
  'Learn More and References',
  'Contact, Support, Downloads, and Microsoft Store',
  'Complete Beginner Walkthrough: My First App Project',
]) {
  requireText(manual, `## ${heading}`, `Global manual section`);
}

for (const icon of manifest.icons ?? []) {
  await requireFile(path.join('devdesk', icon.src), 100);
}
await requireFile('devdesk/assets/img/devdesk-social-2026.png', 100_000);

for (const relativePath of [
  'devdesk/assets/img/devdesk-logo-master.png',
  'devdesk/assets/img/devdesk-logo-512.png',
  'devdesk/assets/img/devdesk-logo-256.png',
  'devdesk/assets/img/devdesk-logo-192.png',
  'devdesk/assets/img/devdesk-logo-128.png',
  'devdesk/assets/img/devdesk-logo-64.png',
  'devdesk/assets/img/devdesk-logo-48.png',
  'devdesk/assets/img/devdesk-logo-32.png',
  'devdesk/assets/img/devdesk-logo-24.png',
  'devdesk/assets/img/devdesk-logo-16.png',
  'devdesk/manual/user-manual.html',
  'devdesk/manual/agent-connector.html',
  'devdesk/assets/js/support-assistant.js',
  'devdesk/DOCUMENTATION_COVERAGE_MATRIX.md',
]) {
  await requireFile(relativePath, 100);
}

if (failures.length) {
  for (const failure of failures) {
    console.error(`ERROR: ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log('Portfolio and DevDesk release-content checks: passed');
}
