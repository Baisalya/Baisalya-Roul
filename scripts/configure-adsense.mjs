import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const args = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const [key, ...rest] = arg.replace(/^--/, '').split('=');
  return [key, rest.join('=')];
}));
const client = String(args.client || '').trim();
const slot = String(args.slot || '').trim();
const consentReady = String(args['consent-ready'] || '').toLowerCase() === 'true';

if (!/^ca-pub-\d{10,20}$/.test(client)) {
  throw new Error('Provide a real AdSense client with --client=ca-pub-...');
}
if (!/^\d{6,20}$/.test(slot)) {
  throw new Error('Provide a real manual responsive ad slot with --slot=...');
}
if (!consentReady) {
  throw new Error('Consent gate is not acknowledged. Configure a compliant consent solution first, then pass --consent-ready=true.');
}

const root = process.cwd();
const configPath = path.join(root, 'assets', 'monetization', 'config.js');
const config = `window.BAISALYA_MONETIZATION = Object.freeze({\n  enabled: true,\n  consentReady: true,\n  adsenseClient: '${client}',\n  manualSlot: '${slot}',\n});\n`;
await writeFile(configPath, config, 'utf8');
const publisher = client.replace(/^ca-/, '');
await writeFile(path.join(root, 'ads.txt'), `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`, 'utf8');
console.log('AdSense manual placement configured. Run npm test and npm run release before deployment.');
