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

function rejectText(source, unexpected, label) {
  if (source.includes(unexpected)) {
    failures.push(`${label} must not contain: ${unexpected}`);
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
const constructionSupport = await text('construction-erp/support.html');
const shopPilotHome = await text('shoppilot erp/index.html');
const shopPilotQuickStart = await text('shoppilot erp/quick-start.html');
const shopPilotManual = await text('shoppilot erp/user-manual.html');
const notivaultStaticHome = await text('notivault-website/index.html');
const notivaultStaticPrivacy = await text(
  'notivault-website/privacy-policy/index.html',
);
const manifest = JSON.parse(await text('devdesk/site.webmanifest'));

requireText(portfolio, storeUrl, 'Portfolio Microsoft Store action');
requireText(
  portfolio,
  'https://play.google.com/store/apps/details?id=com.baishalya.devdesk',
  'Portfolio Android availability message',
);
requireText(
  portfolio,
  'alt="DevDesk application logo"',
  'Portfolio DevDesk logo',
);
for (const expected of [
  'Construction ERP',
  'Coming Soon',
  'construction-erp/index.html',
  'aria-label="View the Construction ERP website"',
]) {
  requireText(portfolio, expected, 'Portfolio Construction ERP card');
}
for (const expected of [
  'ShopPilot',
  'Private Preview',
  'shoppilot-erp/index.html',
  'shoppilot-erp/quick-start.html',
  'shoppilot-erp/user-manual.html',
  '<option value="ShopPilot">ShopPilot</option>',
]) {
  requireText(portfolio, expected, 'Portfolio ShopPilot integration');
}
for (const expected of [
  'project-card--notivault',
  'NotiVault',
  'notivault-website/public/og-deleted-message.png',
  'href="notivault-website/"',
  'aria-label="View the NotiVault website"',
  'Google Play &middot; Coming soon',
  'No public installer is offered yet.',
  'voice notes and media saved when the notification exposes them',
  '<option value="NotiVault">NotiVault</option>',
]) {
  requireText(portfolio, expected, 'Portfolio NotiVault integration');
}
for (const expected of [
  'action="https://formsubmit.co/baishalya@gmail.com"',
  'name="interested_in"',
  'name="message"',
  'name="_honey"',
  'Send requirement',
]) {
  requireText(portfolio, expected, 'Portfolio inquiry form');
}
await requireFile('construction-erp/index.html', 1_000);
await requireFile('construction-erp/assets/icons/favicon.svg', 100);
await requireFile('construction-erp/assets/images/og.png', 100_000);
await requireFile('notivault-website/public/og.png', 100_000);
await requireFile('notivault-website/public/og-deleted-message.png', 100_000);
await requireFile('notivault-website/index.html', 10_000);
await requireFile('notivault-website/privacy-policy/index.html', 10_000);
for (const expected of [
  'href="./_next/static/css/',
  'href="./privacy-policy/index.html"',
  'https://baisalya.github.io/Baisalya-Roul/notivault-website/',
]) {
  requireText(notivaultStaticHome, expected, 'NotiVault GitHub Pages home');
}
for (const expected of [
  'href="../_next/static/css/',
  'href="../index.html"',
]) {
  requireText(notivaultStaticPrivacy, expected, 'NotiVault GitHub Pages privacy policy');
}
for (const unexpected of [
  'localhost:5173',
  'rel="modulepreload"',
  '<script',
]) {
  rejectText(
    `${notivaultStaticHome}\n${notivaultStaticPrivacy}`,
    unexpected,
    'NotiVault GitHub Pages export',
  );
}
for (const [relativePath, minimumBytes] of [
  ['shoppilot erp/index.html', 10_000],
  ['shoppilot erp/quick-start.html', 10_000],
  ['shoppilot erp/user-manual.html', 20_000],
  ['shoppilot erp/assets/shoppilot-logo.png', 100_000],
  ['shoppilot erp/assets/og.png', 100_000],
  ['shoppilot erp/privacy-policy.html', 1_000],
  ['shoppilot erp/terms-of-service.html', 1_000],
  ['shoppilot erp/data-deletion.html', 1_000],
]) {
  await requireFile(relativePath, minimumBytes);
}
for (const expected of [
  'Private preview · Release qualification in progress',
  'No public installer is offered',
  'data-shop="repair"',
  'data-shop="garage"',
  'Net Sales',
  'Customer Dues',
  'quick-start.html',
  'user-manual.html',
  'action="https://formsubmit.co/baishalya1999@gmail.com"',
  'name="sensitive_data_removed"',
]) {
  requireText(shopPilotHome, expected, 'ShopPilot marketing truth contract');
}
for (const expected of [
  '10-minute quick start',
  'Repair shop',
  'Bakery',
  'Grocery or retail',
  'Restaurant or cafe',
  'Tailor',
  'Garage',
  'Make the first backup recoverable',
  'The shop-owner daily checklist',
]) {
  requireText(shopPilotQuickStart, expected, 'ShopPilot easy manual');
}
for (const expected of [
  'id="repair-shop"',
  'id="bakery"',
  'id="grocery-retail"',
  'id="restaurant"',
  'id="tailor"',
  'id="garage"',
  'id="reports"',
  'Gross Profit',
  'Cost completeness matters',
  'id="staff-branches"',
  'id="backup"',
  'id="troubleshooting"',
]) {
  requireText(shopPilotManual, expected, 'ShopPilot detailed manual');
}
for (const expected of [
  "path.resolve('shoppilot erp')",
  "path.resolve('dist', 'shoppilot-erp')",
  'shopPilotRuntimeFiles',
]) {
  requireText(viteConfig, expected, 'ShopPilot production build integration');
}
for (const expected of [
  'exportNotiVaultStatic',
  "path.resolve('dist', 'notivault-website')",
]) {
  requireText(viteConfig, expected, 'NotiVault production build integration');
}
for (const expected of [
  'action="https://formsubmit.co/baishalya@gmail.com"',
  'name="_honey"',
  'name="sensitive_data_removed"',
  'Send request',
]) {
  requireText(constructionSupport, expected, 'Construction ERP inquiry form');
}
requireText(siteConfig, storeUrl, 'DevDesk site Microsoft Store action');
requireText(
  siteConfig,
  'available on Google Play',
  'DevDesk Android availability message',
);
requireText(
  downloads,
  'Follow the public Google Play link to install.',
  'Downloads public Google Play guidance',
);
requireText(
  devdeskHome,
  'manual/agent-connector.html',
  'DevDesk Agent Connector guide link',
);
for (const expected of [
  'manual/visual-feature-guide.html',
  'manual/workspace-workbench.html',
  'manual/diagram-studio.html',
  'data-manual-preview="graph"',
  'assets/js/manual-visuals.js?v=20260813.1',
]) {
  requireText(devdeskHome, expected, 'DevDesk visual manual upgrade');
}
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
  'devdesk-social-visual-manual-2026.png',
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
  requireText(source, '20260813.1', label);
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
  './assets/js/manual-visuals.js',
  './manual/visual-feature-guide.html',
  './manual/workspace-workbench.html',
  './manual/diagram-studio.html',
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
await requireFile(
  'devdesk/assets/img/devdesk-social-visual-manual-2026.png',
  100_000,
);

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
  'devdesk/manual/visual-feature-guide.html',
  'devdesk/manual/workspace-workbench.html',
  'devdesk/manual/diagram-studio.html',
  'devdesk/assets/js/manual-visuals.js',
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
