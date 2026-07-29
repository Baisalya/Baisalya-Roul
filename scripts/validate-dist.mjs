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

for (const required of [
  'devdesk/assets/js/site-config.js',
  'devdesk/assets/js/search-index.js',
  'devdesk/assets/js/app.js',
  'devdesk/assets/css/styles.css',
  'devdesk/assets/img/devdesk-logo-64.png',
  'devdesk/assets/img/devdesk-logo-128.png',
  'devdesk/assets/img/devdesk-logo-192.png',
  'devdesk/assets/img/devdesk-logo-512.png',
  'devdesk/site.webmanifest',
  'devdesk/sw.js',
  'devdesk/manual/agent-connector.html',
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
