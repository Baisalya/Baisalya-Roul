import { access, readFile, readdir, writeFile } from 'node:fs/promises';
import crypto from 'node:crypto';
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

const projectRoot = process.cwd();
const targetRoot = path.resolve(projectRoot, String(args.root || 'dist').trim());
const relativeTarget = path.relative(projectRoot, targetRoot);
if (relativeTarget.startsWith('..') || path.isAbsolute(relativeTarget)) {
  throw new Error('AdSense target must stay inside the repository working tree.');
}
if (targetRoot === projectRoot) {
  throw new Error('Refusing to enable AdSense in source. Build first, then configure --root=dist.');
}

const configPath = path.join(targetRoot, 'assets', 'monetization', 'config.js');
try { await access(configPath); }
catch { throw new Error(`Missing ${configPath}. Run npm run release before production AdSense configuration.`); }

const config = `window.BAISALYA_MONETIZATION = Object.freeze({\n  enabled: true,\n  consentReady: true,\n  adsenseClient: '${client}',\n  manualSlot: '${slot}',\n});\n`;
await writeFile(configPath, config, 'utf8');
const publisher = client.replace(/^ca-/, '');
await writeFile(path.join(targetRoot, 'ads.txt'), `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`, 'utf8');

async function refreshReleaseManifest() {
  const manifestPath = path.join(targetRoot, 'release-manifest.json');
  try { await access(manifestPath); } catch { return; }
  const previous = JSON.parse(await readFile(manifestPath, 'utf8'));
  const files = [];
  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(absolute);
      else if (absolute !== manifestPath) {
        const data = await readFile(absolute);
        files.push({
          path: path.relative(targetRoot, absolute).replaceAll('\\', '/'),
          bytes: data.length,
          sha256: crypto.createHash('sha256').update(data).digest('hex'),
        });
      }
    }
  }
  await walk(targetRoot);
  files.sort((a, b) => a.path.localeCompare(b.path));
  await writeFile(manifestPath, JSON.stringify({ ...previous, file_count: files.length, files }, null, 2) + '\n', 'utf8');
}

await refreshReleaseManifest();
console.log(`AdSense manual placement configured in ${path.relative(projectRoot, targetRoot) || '.'}.`);
