import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const failures = [];
const pages = [
  'devdesk/index.html', 'construction-erp/index.html', 'shoppilot erp/index.html',
  'EduSheet/index.html', 'surveycam/index.html',
];
async function text(file) { return readFile(path.join(root, file), 'utf8'); }
async function requireFile(file) { try { await access(path.join(root,file)); } catch { failures.push(`Missing revenue file: ${file}`); } }
for (const file of [
  'assets/monetization/config.js','assets/monetization/monetization.js','assets/monetization/monetization.css',
  '.github/workflows/deploy-baisalya-pages.yml','DEPLOYMENT_REVENUE_GUIDE.md','privacy.html','scripts/configure-adsense.mjs',
]) await requireFile(file);

for (const page of pages) {
  const html = await text(page);
  if (!html.includes('creator-support')) failures.push(`${page} missing professional creator support surface`);
  if (!html.includes('https://www.buymeacoffee.com/baisalya')) failures.push(`${page} missing Buy Me a Coffee`);
  if (!html.includes('baishalya1999@gmail.com')) failures.push(`${page} missing official email`);
}
const notiVaultSource = await text('notivault-website/app/page.tsx');
for (const expected of ['creator-support', 'https://www.buymeacoffee.com/baisalya', 'baishalya1999@gmail.com']) {
  if (!notiVaultSource.includes(expected)) failures.push(`NotiVault source missing revenue surface: ${expected}`);
}

const edu = await text('EduSheet/index.html');
const survey = await text('surveycam/index.html');
for (const [name,html] of [['EduSheet',edu],['SurveyCam',survey]]) {
  const count=(html.match(/data-ad-unit="manual"/g)||[]).length;
  if (count !== 1) failures.push(`${name} must contain exactly one manual ad placement, found ${count}`);
  if (!html.includes('assets/monetization/config.js') || !html.includes('assets/monetization/monetization.js')) failures.push(`${name} missing gated monetization runtime`);
}
for (const page of ['devdesk/index.html','construction-erp/index.html','shoppilot erp/index.html']) {
  const html=await text(page);
  if (html.includes('data-ad-unit="manual"')) failures.push(`${page} should prioritize product/support revenue, not advertising`);
}
if (notiVaultSource.includes('data-ad-unit="manual"')) failures.push('NotiVault should prioritize product/support revenue, not advertising');
const config=await text('assets/monetization/config.js');
if (!config.includes('enabled: false') || !config.includes('consentReady: false')) failures.push('AdSense must ship disabled and consent-gated by default');
if (/ca-pub-\d{10,20}/.test(config)) failures.push('Repository must not ship a real or placeholder AdSense publisher ID by default');
const rootHtml=await text('index.html');
if (!rootHtml.includes('Partnership / sponsorship')) failures.push('Professional contact form missing partnership/sponsorship path');
if (!rootHtml.includes('privacy.html')) failures.push('Professional footer missing website privacy link');
const workflow=await text('.github/workflows/deploy-baisalya-pages.yml');
for (const required of ['npm ci --prefix notivault-website','npm run release','actions/upload-pages-artifact@v3','actions/deploy-pages@v4']) if (!workflow.includes(required)) failures.push(`Pages workflow missing ${required}`);
if (failures.length) { failures.forEach((f)=>console.error(`ERROR: ${f}`)); process.exitCode=1; }
else console.log('Professional deployment and revenue readiness: passed');
