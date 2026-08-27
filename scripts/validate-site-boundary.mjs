import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const siteRoot = path.join(root, 'src', 'site');
const failures = [];
const protectedRoots = [
  'devdesk/',
  'construction-erp/',
  'EduSheet/',
  'notivault-website/',
  'shoppilot erp/',
  'shoppilot-erp/',
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else files.push(target);
  }
  return files;
}

function normalize(value) {
  return value.replaceAll('\\', '/');
}

function inspectImports(source, relativePath) {
  const importLike = [
    ...source.matchAll(/\bimport\s+(?:[^'\"]+?\s+from\s+)?['\"]([^'\"]+)['\"]/g),
    ...source.matchAll(/\bimport\s*\(\s*['\"]([^'\"]+)['\"]\s*\)/g),
    ...source.matchAll(/@import\s+(?:url\()?['\"]([^'\"]+)['\"]/g),
  ];

  for (const match of importLike) {
    const specifier = match[1];
    if (!specifier.startsWith('.')) continue;
    const resolved = normalize(path.posix.normalize(
      path.posix.join(path.posix.dirname(normalize(relativePath)), specifier),
    ));
    for (const protectedRoot of protectedRoots) {
      if (resolved === protectedRoot.slice(0, -1) || resolved.startsWith(protectedRoot)) {
        failures.push(`${relativePath} imports protected product implementation: ${specifier}`);
      }
    }
  }
}

for (const absolutePath of await walk(siteRoot)) {
  if (!/\.(?:js|mjs|css)$/.test(absolutePath)) continue;
  const relativePath = normalize(path.relative(root, absolutePath));
  inspectImports(await readFile(absolutePath, 'utf8'), relativePath);
}

const index = await readFile(path.join(root, 'index.html'), 'utf8');
if (!index.includes('<script type="module" src="main.js"></script>')) {
  failures.push('index.html must load the stable main.js entrypoint as an ES module.');
}
if (!index.includes('<link rel="stylesheet" href="style.css">')) {
  failures.push('index.html must keep the stable style.css public entrypoint.');
}
if (index.includes('<!-- Buy Me a Coffee component styles -->')) {
  failures.push('Component CSS must not remain inline in index.html.');
}

const rootMain = await readFile(path.join(root, 'main.js'), 'utf8');
if (!rootMain.includes("import './src/site/main.js';")) {
  failures.push('main.js must delegate to src/site/main.js.');
}

const rootStyle = await readFile(path.join(root, 'style.css'), 'utf8');
if (!rootStyle.includes("@import url('./src/site/styles/site.css');")) {
  failures.push('style.css must delegate to src/site/styles/site.css.');
}

if (failures.length) {
  for (const failure of failures) console.error(`ERROR: ${failure}`);
  process.exitCode = 1;
} else {
  console.log('Root site ownership boundary: passed');
}
