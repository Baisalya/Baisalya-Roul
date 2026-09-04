import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const failures = [];

async function text(file) {
  return readFile(path.join(root, file), 'utf8');
}
async function requireFile(file) {
  try { await access(path.join(root, file)); }
  catch { failures.push(`Missing revenue file: ${file}`); }
}
function adCount(html) {
  return (html.match(/data-ad-unit="manual"/g) || []).length;
}

for (const file of [
  'assets/monetization/config.js',
  'assets/monetization/monetization.js',
  'assets/monetization/monetization.css',
  '.github/workflows/deploy-baisalya-pages.yml',
  'DEPLOYMENT_REVENUE_GUIDE.md',
  'privacy.html',
  'scripts/configure-adsense.mjs',
  'scripts/build-release.mjs',
  'sitesnap/index.html',
  'notivault-website/sitemap.xml',
  'ads.txt',
]) await requireFile(file);

for (const page of [
  'devdesk/index.html',
  'construction-erp/index.html',
  'shoppilot erp/index.html',
  'EduSheet/index.html',
  'surveycam/index.html',
]) {
  const html = await text(page);
  if (!html.includes('creator-support')) failures.push(`${page} missing professional creator support surface`);
  if (!html.includes('https://www.buymeacoffee.com/baisalya')) failures.push(`${page} missing Buy Me a Coffee`);
  if (!html.includes('baishalya1999@gmail.com')) failures.push(`${page} missing official email`);
}

const notiVaultSource = await text('notivault-website/app/page.tsx');
for (const expected of ['creator-support', 'https://www.buymeacoffee.com/baisalya', 'baishalya1999@gmail.com']) {
  if (!notiVaultSource.includes(expected)) failures.push(`NotiVault source missing revenue surface: ${expected}`);
}

for (const page of [
  'devdesk/index.html',
  'construction-erp/index.html',
  'EduSheet/index.html',
  'surveycam/index.html',
  'sitesnap/index.html',
]) {
  const count = adCount(await text(page));
  if (count !== 1) failures.push(`${page} must contain exactly one restrained manual ad placement, found ${count}`);
}

// ShopPilot source is protected. The release builder injects its single ad into dist
// so protected product hashes remain stable while production monetization stays consistent.
for (const page of ['shoppilot erp/index.html', 'shoppilot erp/quick-start.html', 'shoppilot erp/user-manual.html']) {
  const count = adCount(await text(page));
  if (count !== 0) failures.push(`${page} source must stay ad-free; production injection belongs in build-release.mjs`);
}

for (const page of [
  'index.html', 'privacy.html',
  'devdesk/privacy-policy.html', 'devdesk/404.html',
  'construction-erp/privacy.html', 'construction-erp/terms.html', 'construction-erp/account-deletion.html', 'construction-erp/data-safety.html', 'construction-erp/404.html',
  'EduSheet/privacy.html', 'EduSheet/404.html',
  'surveycam/privacy.html',
  'shoppilot erp/privacy-policy.html', 'shoppilot erp/terms-of-service.html', 'shoppilot erp/data-deletion.html',
  'notivault-website/index.html', 'notivault-website/privacy-policy/index.html',
]) {
  const count = adCount(await text(page));
  if (count !== 0) failures.push(`${page} must remain ad-free`);
}

const config = await text('assets/monetization/config.js');
if (!config.includes('enabled: false') || !config.includes('consentReady: false')) {
  failures.push('Repository source AdSense config must remain disabled and consent-gated by default');
}
if (/ca-pub-\d{10,20}/.test(config)) {
  failures.push('Repository source config must not ship a real or placeholder AdSense publisher ID');
}

const monetizationRuntime = await text('assets/monetization/monetization.js');
if (!monetizationRuntime.includes('placements.forEach(renderPlacement)')) {
  failures.push('Ad runtime must initialize eligible manual slots after the config and consent gate');
}
if (monetizationRuntime.includes('observer.observe(placement)')) {
  failures.push('Ad runtime must not observe still-hidden placements before rendering them');
}

const adsTxt = await text('ads.txt');
if (!adsTxt.includes('google.com, pub-1529558529658186, DIRECT, f08c47fec0942fa0')) {
  failures.push('ads.txt is missing the approved Baisalya AdSense publisher record');
}

const build = await text('scripts/build-release.mjs');
for (const required of [
  'injectShopPilotManualAds',
  'siteSnapRuntimeFiles',
  'constructionErpRelease',
  'monetizationRelease',
  'versionHtmlFiles(constructionOutput, versionConstructionErpRuntime)',
  'versionHtmlFiles(outputRoot, versionMonetizationRuntime)',
  "path.join(outputRoot,'sitesnap')",
  "path.join(projectRoot,'notivault-website','sitemap.xml')",
]) if (!build.includes(required)) failures.push(`Release builder missing monetization/SEO integration: ${required}`);

const configure = await text('scripts/configure-adsense.mjs');
for (const required of ["args.root || 'dist'", 'release-manifest.json']) {
  if (!configure.includes(required)) failures.push(`AdSense deploy configurator missing: ${required}`);
}

const rootHtml = await text('index.html');
if (!rootHtml.includes('Partnership / sponsorship')) failures.push('Professional contact form missing partnership/sponsorship path');
if (!rootHtml.includes('privacy.html')) failures.push('Professional footer missing website privacy link');

const workflow = await text('.github/workflows/deploy-baisalya-pages.yml');
for (const required of [
  'npm ci --prefix notivault-website',
  'npm run release',
  '--root=dist',
  'ca-pub-1529558529658186',
  '9546051599',
  "vars.ADSENSE_CONSENT_READY != 'false'",
  'actions/upload-pages-artifact@v3',
  'actions/deploy-pages@v4',
]) if (!workflow.includes(required)) failures.push(`Pages workflow missing ${required}`);

if (failures.length) {
  failures.forEach((failure) => console.error(`ERROR: ${failure}`));
  process.exitCode = 1;
} else {
  console.log('Professional deployment, manual-ad policy, and revenue readiness: passed');
}
