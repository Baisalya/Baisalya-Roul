import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { applyAdPlacementPolicy } from './ad-placement-policy.mjs';

const roots = ['devdesk', 'construction-erp', 'shoppilot erp', 'shoppilot-erp', 'EduSheet', 'surveycam', 'sitesnap', 'paperaid', 'BrightQuest_Kids', 'guides'];
let changed = 0;
async function update(file) {
  const before = await readFile(file, 'utf8');
  const after = applyAdPlacementPolicy(before, file);
  if (after !== before) { await writeFile(file, after); changed++; }
}
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.posix.join(directory, entry.name);
    if (entry.isDirectory() && !['assets', 'src', 'node_modules', '.git'].includes(entry.name)) await walk(file);
    else if (entry.isFile() && entry.name.endsWith('.html')) await update(file);
  }
}
await update('index.html');
await update('privacy.html');
for (const directory of roots) await walk(directory);
console.log(`Applied reviewed ad placements (${changed} source pages updated).`);
