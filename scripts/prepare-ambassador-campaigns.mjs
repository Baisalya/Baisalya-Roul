import { readFile, writeFile } from 'node:fs/promises';
import { applyAmbassadorCampaign } from './ambassador-campaigns.mjs';

const pages = [
  ['index.html', 'index.html'], ['devdesk/index.html', 'devdesk/index.html'],
  ['construction-erp/index.html', 'construction-erp/index.html'],
  ['shoppilot erp/index.html', 'shoppilot-erp/index.html'], ['shoppilot-erp/index.html', 'shoppilot-erp/index.html'],
  ['EduSheet/index.html', 'EduSheet/index.html'], ['surveycam/index.html', 'surveycam/index.html'],
  ['notivault-website/index.html', 'notivault-website/index.html'], ['sitesnap/index.html', 'sitesnap/index.html'],
  ['BrightQuest_Kids/index.html', 'brightquest-kids/index.html'], ['paperaid/index.html', 'paperaid/index.html'],
  ['friction-atlas/index.html', 'friction-atlas/index.html'],
];
for (const [source, route] of pages) {
  const before = await readFile(source, 'utf8');
  const after = applyAmbassadorCampaign(before, route);
  if (after !== before) await writeFile(source, after);
}
console.log(`Prepared ${pages.length} responsive ambassador campaigns.`);
