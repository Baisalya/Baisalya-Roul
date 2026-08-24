import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve('dist');
const failures = [];

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    failures.push(`Missing production output: ${relativePath}`);
    return false;
  }
}

async function validateLocalReferences(relativeHtml) {
  if (!(await exists(relativeHtml))) return;
  const source = await readFile(path.join(root, relativeHtml), 'utf8');
  const directory = path.posix.dirname(relativeHtml.replaceAll('\\', '/'));
  const references = [
    ...source.matchAll(/\b(?:href|src)="([^"]+)"/g),
  ].map((match) => match[1]);

  for (const value of references) {
    if (
      !value ||
      value.startsWith('#') ||
      value.startsWith('http:') ||
      value.startsWith('https:') ||
      value.startsWith('mailto:') ||
      value.startsWith('data:')
    ) {
      continue;
    }
    const pathname = decodeURIComponent(value.split(/[?#]/, 1)[0]);
    if (!pathname) continue;
    const target = pathname.startsWith('/')
      ? pathname.slice(1)
      : path.posix.normalize(path.posix.join(directory, pathname));
    await exists(target);
  }
}

await validateLocalReferences('index.html');
await validateLocalReferences('devdesk/index.html');
await validateLocalReferences('devdesk/downloads.html');
await validateLocalReferences('devdesk/manual/user-manual.html');
await validateLocalReferences('devdesk/manual/agent-connector.html');
await validateLocalReferences('devdesk/manual/visual-feature-guide.html');
await validateLocalReferences('devdesk/manual/workspace-workbench.html');
await validateLocalReferences('devdesk/manual/diagram-studio.html');
for (const page of [
  'index.html',
  'features.html',
  'manual.html',
  'downloads.html',
  'support.html',
  'privacy.html',
  'account-deletion.html',
  'terms.html',
  'data-safety.html',
  '404.html',
]) {
  await validateLocalReferences(`construction-erp/${page}`);
}
for (const page of [
  'index.html',
  'quick-start.html',
  'user-manual.html',
  'privacy-policy.html',
  'terms-of-service.html',
  'data-deletion.html',
]) {
  await validateLocalReferences(`shoppilot-erp/${page}`);
}
await validateLocalReferences('notivault-website/index.html');
await validateLocalReferences('notivault-website/privacy-policy/index.html');

for (const required of [
  'devdesk/assets/js/site-config.js',
  'devdesk/assets/js/search-index.js',
  'devdesk/assets/js/app.js',
  'devdesk/assets/js/manual-visuals.js',
  'devdesk/assets/js/marketing-model.js',
  'devdesk/assets/js/support-assistant.js',
  'devdesk/assets/css/styles.css',
  'devdesk/assets/img/devdesk-logo-64.png',
  'devdesk/assets/img/devdesk-logo-128.png',
  'devdesk/assets/img/devdesk-logo-192.png',
  'devdesk/assets/img/devdesk-logo-512.png',
  'devdesk/assets/img/devdesk-model-arms-crossed.png',
  'devdesk/assets/img/devdesk-model-standing.png',
  'devdesk/assets/img/devdesk-model-confident.png',
  'devdesk/assets/img/devdesk-model-thoughtful.png',
  'devdesk/assets/img/devdesk-workspace-banner.webp',
  'devdesk/site.webmanifest',
  'devdesk/sw.js',
  'devdesk/manual/agent-connector.html',
  'devdesk/manual/visual-feature-guide.html',
  'devdesk/manual/workspace-workbench.html',
  'devdesk/manual/diagram-studio.html',
  'construction-erp/assets/css/styles.css',
  'construction-erp/assets/js/site.js',
  'construction-erp/assets/js/runtime-config.js',
  'construction-erp/assets/icons/favicon.svg',
  'construction-erp/assets/images/og.png',
  'construction-erp/manifest.webmanifest',
  'shoppilot-erp/styles.css',
  'shoppilot-erp/manual.css',
  'shoppilot-erp/site.js',
  'shoppilot-erp/manual.js',
  'shoppilot-erp/assets/shoppilot-logo.png',
  'shoppilot-erp/assets/og.png',
  'shoppilot-erp/robots.txt',
  'shoppilot-erp/sitemap.xml',
  'notivault-website/index.html',
  'notivault-website/privacy-policy/index.html',
  'notivault-website/favicon.svg',
  'notivault-website/og-deleted-message.png',
  'server/index.js',
]) {
  await exists(required);
}

if (failures.length) {
  for (const failure of [...new Set(failures)]) {
    console.error(`ERROR: ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log('Production output references and DevDesk runtime: passed');
}
