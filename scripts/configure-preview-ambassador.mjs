import { readFile, writeFile } from 'node:fs/promises';
import { previewSettings, socialSurfaces } from './social-surfaces.mjs';

const [action, key, image] = process.argv.slice(2);
const settings = structuredClone(previewSettings);
const configUrl = new URL('./preview-settings.json', import.meta.url);
async function validateImage(file) {
  if (!/^assets\/social\/[a-z0-9-]+\.png$/.test(file)) throw new Error('Use a PNG filename inside assets/social, e.g. assets/social/baisalya-ambassador-v1.png.');
  const png = await readFile(new URL(`../${file}`, import.meta.url));
  if (png.length < 24 || png.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a' || png.readUInt32BE(16) !== 1200 || png.readUInt32BE(20) !== 630) {
    throw new Error('Ambassador preview must be a valid 1200 × 630 PNG.');
  }
}
if (action === 'off') {
  settings.ambassadorEnabled = false;
} else if (action === 'on') {
  const images = Object.values(settings.ambassadorImages);
  if (!images.length) throw new Error('Add a generated ambassador image with the set command before enabling previews.');
  for (const file of images) await validateImage(file);
  settings.ambassadorEnabled = true;
} else if (action === 'set') {
  if (!socialSurfaces.some(surface => surface.key === key)) throw new Error(`Choose a site: ${socialSurfaces.map(surface => surface.key).join(', ')}.`);
  await validateImage(image || '');
  settings.ambassadorImages[key] = image;
} else if (action === 'unset') {
  if (!socialSurfaces.some(surface => surface.key === key)) throw new Error('Choose a valid site key.');
  delete settings.ambassadorImages[key];
  if (!Object.keys(settings.ambassadorImages).length) settings.ambassadorEnabled = false;
} else if (action === 'status') {
  console.log(JSON.stringify(settings, null, 2));
  process.exit(0);
} else {
  throw new Error('Usage: npm run preview:ambassador -- status|off|on|set <site-key> <png-path>|unset <site-key>');
}
await writeFile(configUrl, JSON.stringify(settings, null, 2) + '\n');
console.log(`Ambassador preview ${settings.ambassadorEnabled ? 'ON' : 'OFF'}. Rebuild and publish to update shared link metadata; preview services may retain cached images.`);
