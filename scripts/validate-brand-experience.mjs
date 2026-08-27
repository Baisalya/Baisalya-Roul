import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const failures = [];
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const main = await readFile(path.join(root, 'src/site/main.js'), 'utf8');
const loader = await readFile(path.join(root, 'src/site/interactions/easter-egg-loader.js'), 'utf8');

function requireText(source, expected, label = expected) {
  if (!source.includes(expected)) failures.push(`Brand experience missing ${label}`);
}
function rejectText(source, unexpected, label = unexpected) {
  if (source.includes(unexpected)) failures.push(`Brand experience must not contain ${label}`);
}
async function requireFile(relativePath) {
  try { await access(path.join(root, relativePath)); }
  catch { failures.push(`Brand experience missing file: ${relativePath}`); }
}

for (const [expected, label] of [
  ['id="identity-trigger"', 'BR identity trigger'],
  ['id="identity-card"', 'identity card dialog'],
  ['assets/brand/br-mark.svg', 'BR brand asset'],
  ['https://www.buymeacoffee.com/baisalya', 'Buy Me a Coffee action'],
  ['class="nav-coffee"', 'header coffee action'],
  ['data-easter-secret', 'hidden profile easter-egg trigger'],
  ['baishalya1999@gmail.com', 'official email address'],
  ['action="https://formsubmit.co/baishalya1999@gmail.com"', 'official form destination'],
]) requireText(html, expected, label);

rejectText(html, 'mailto:baishalya@gmail.com', 'old root email');
requireText(main, './interactions/identity-card.js', 'identity-card module import');
requireText(loader, "document.querySelectorAll('[data-easter-secret]')", 'secret profile game loader');
rejectText(html, 'data-easter-trigger', 'visible developer-game trigger');
rejectText(html, 'Play BR Debug Run', 'visible footer game button');
rejectText(html, 'Play developer game', 'visible identity-card game button');
rejectText(html, 'class="nav-game"', 'visible navigation game button');

for (const file of [
  'assets/brand/br-mark.svg',
  'src/site/interactions/identity-card.js',
  'src/site/styles/components/identity-card.css',
]) await requireFile(file);

if (failures.length) {
  failures.forEach((failure) => console.error(`ERROR: ${failure}`));
  process.exitCode = 1;
} else {
  console.log('BR brand, identity card, coffee, official email, and hidden game access: passed');
}
