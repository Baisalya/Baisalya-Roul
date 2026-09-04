import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const storeUrl =
  'https://apps.microsoft.com/detail/9N8NH1LMZX1S?hl=en-us&gl=IN&ocid=pdpshare';
const devDeskRelease = '20260824.4';
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
const aiWorkbenchGuide = await text('devdesk/content/ai-workbench.md');
const notificationsGuide = await text(
  'devdesk/content/notifications-routines.md',
);
const devdeskHome = await text('devdesk/index.html');
const supportAssistant = await text('devdesk/assets/js/support-assistant.js');
const devdeskApp = await text('devdesk/assets/js/app.js');
const serviceWorker = await text('devdesk/sw.js');
const releaseBuild = await text('scripts/build-release.mjs');
const constructionHome = await text('construction-erp/index.html');
const constructionFeatures = await text('construction-erp/features.html');
const constructionDownloads = await text('construction-erp/downloads.html');
const constructionManual = await text('construction-erp/manual.html');
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
  'Customer deployment',
  'Sold per customer',
  'View customer deployment',
  'customer-specific Construction ERP deployments',
  'href="/construction-erp/"',
  'aria-label="View the Construction ERP customer deployment page"',
]) {
  requireText(portfolio, expected, 'Portfolio Construction ERP card');
}
for (const expected of [
  'ShopPilot',
  'Windows release is now live',
  '9N9XDS5G5F77',
  'https://play.google.com/store/apps/details?id=com.baishalya.shoppilot',
  'Android closed testing',
  'href="/shoppilot-erp/"',
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
  'href="/notivault-website/"',
  'aria-label="View the NotiVault website"',
  'Google Play &middot; Coming soon',
  'No public installer is offered yet.',
  'voice notes and media saved when the notification exposes them',
  '<option value="NotiVault">NotiVault</option>',
]) {
  requireText(portfolio, expected, 'Portfolio NotiVault integration');
}
for (const expected of [
  'action="https://formsubmit.co/baishalya1999@gmail.com"',
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
  'https://baisalya.com/notivault-website/',
]) {
  requireText(notivaultStaticHome, expected, 'NotiVault custom-domain home');
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
]) {
  rejectText(
    `${notivaultStaticHome}\n${notivaultStaticPrivacy}`,
    unexpected,
    'NotiVault GitHub Pages export',
  );
}
const notiVaultStaticCombined = `${notivaultStaticHome}\n${notivaultStaticPrivacy}`;
for (const match of notiVaultStaticCombined.matchAll(/<script\b([^>]*)>/gi)) {
  const attributes = match[1] ?? '';
  if (!/\btype=["']application\/ld\+json["']/i.test(attributes)) {
    failures.push('NotiVault GitHub Pages export must not contain executable scripts');
    break;
  }
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
  'Windows release live · Android closed testing',
  'https://apps.microsoft.com/store/detail/9N9XDS5G5F77?cid=DevShareMCLPCB',
  'https://play.google.com/store/apps/details?id=com.baishalya.shoppilot',
  'Current release channels',
  'data-shop="repair"',
  'data-shop="garage"',
  'data-shop="retail"',
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
  "'shoppilot erp'",
  "path.join(outputRoot,'shoppilot-erp')",
  'shopPilotRuntimeFiles',
]) {
  requireText(releaseBuild, expected, 'ShopPilot production build integration');
}
for (const expected of [
  'exportNotiVaultStatic',
  "path.join(outputRoot,'notivault-website')",
]) {
  requireText(releaseBuild, expected, 'NotiVault production build integration');
}
for (const expected of [
  'action="https://formsubmit.co/baishalya1999@gmail.com"',
  'name="_honey"',
  'name="sensitive_data_removed"',
  'Send request',
  'Per-customer rollout',
]) {
  requireText(constructionSupport, expected, 'Construction ERP inquiry form');
}
for (const [source, label, expectedPhrases] of [
  [
    constructionHome,
    'Construction ERP homepage',
    [
      'Construction ERP is sold per customer',
      'Request customer walkthrough',
      'How is Construction ERP sold?',
    ],
  ],
  [
    constructionFeatures,
    'Construction ERP product page',
    [
      'It is sold per customer',
      'Pricing and deployment are discussed for each customer',
    ],
  ],
  [
    constructionDownloads,
    'Construction ERP deployment page',
    [
      'Customer deployments',
      'not as a one-size-fits-all public download',
      'Request your deployment plan',
    ],
  ],
  [
    constructionManual,
    'Construction ERP user guide',
    ['Customer team guide', 'Customer rollout support'],
  ],
]) {
  for (const expected of expectedPhrases) {
    requireText(source, expected, label);
  }
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
  'manual/ai-workbench.html',
  'manual/notifications-routines.html',
  'data-manual-preview="graph"',
  `assets/js/manual-visuals.js?v=${devDeskRelease}`,
  `assets/js/marketing-model.js?v=${devDeskRelease}`,
  'data-model-slot="banner"',
  'data-model-slot="finalCta"',
  'assets/img/devdesk-workspace-banner.webp',
]) {
  requireText(devdeskHome, expected, 'DevDesk visual manual upgrade');
}
requireText(
  devdeskHome,
  'data-assistant-open',
  'DevDesk support assistant action',
);
for (const expected of [
  'Bring your files, questions, and projects to one review-first AI Harness.',
  'For normal &amp; non-technical users',
  'Students, teachers, writers, researchers',
  'For developers &amp; project teams',
  'No coding needed',
  'devdesk-workspace-banner.webp',
]) {
  requireText(devdeskHome, expected, 'DevDesk inclusive homepage');
}
for (const expected of [
  'No technical skills required. Developer power when the project demands it.',
  'id="non-tech-path"',
  'Bring the messy work. Leave with a clear next step.',
  'id="developer-path"',
  'Move from project context to a verified proposal',
  'Prompt → reviewed + verified change',
  'The complete workspace around the answer.',
  'Tasks, goals, meetings, assignments, and decisions',
  'Browser + MCP agents',
  'Tour every major feature',
]) {
  requireText(devdeskHome, expected, 'DevDesk audience and complete-app story');
}
for (const expected of [
  'Coming in DevDesk 1.2',
  'id="ai-harness"',
  'One Harness. Four ways to move work forward.',
  'Bounded file + supported photo input',
  '1,266',
  'WACK PASS',
  'zero required failures',
  'Android + Windows builds validated',
  'DevDesk does not read WhatsApp',
  'Native OS widgets are not included',
  'When work becomes a project, the Harness grows with it.',
]) {
  requireText(devdeskHome, expected, 'DevDesk 1.2 AI Harness marketing');
}
for (const expected of [
  'Coming in DevDesk 1.2',
  'AI help that starts with your work',
  'Preview AI Harness',
  '1,266 tests, WACK PASS',
  'currently published version until',
]) {
  requireText(downloads, expected, 'DevDesk downloads 1.2 preview');
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
  [releaseBuild, 'DevDesk production build'],
]) {
  requireText(source, devDeskRelease, label);
}
for (const expected of [
  "AI Harness is DevDesk's standalone optional AI tool",
  'Attach a file or photo',
  'bytes are transient',
  'current Windows user',
  'Browser Agent on Windows',
  'worktree',
]) {
  requireText(aiWorkbenchGuide, expected, 'DevDesk AI Workbench guide');
}
for (const expected of [
  'review-first AI routines',
  'request access to notifications from WhatsApp',
  'does not provide a generic reply API',
  'latest missed occurrence is recovered',
]) {
  requireText(notificationsGuide, expected, 'DevDesk notifications guide');
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
  './assets/js/marketing-model.js',
  './assets/img/devdesk-model-confident.png',
  './assets/img/devdesk-model-thoughtful.png',
  './assets/img/devdesk-workspace-banner.webp',
  './manual/visual-feature-guide.html',
  './manual/workspace-workbench.html',
  './manual/diagram-studio.html',
  './manual/notifications-routines.html',
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
  'devdesk/assets/js/marketing-model.js',
  'devdesk/assets/js/support-assistant.js',
  'devdesk/assets/img/devdesk-model-arms-crossed.png',
  'devdesk/assets/img/devdesk-model-standing.png',
  'devdesk/assets/img/devdesk-model-confident.png',
  'devdesk/assets/img/devdesk-model-thoughtful.png',
  'devdesk/assets/img/devdesk-workspace-banner.webp',
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
