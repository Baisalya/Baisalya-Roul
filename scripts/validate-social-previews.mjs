import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { socialSurfaces, socialImagePath, baseSocialImagePath } from './social-surfaces.mjs';
import { applySocialMetadata } from './social-metadata.mjs';

const outputRoot = path.resolve(process.argv[2] || '.');
const isDist = process.argv[2] === 'dist';
const images = new Set();
// Legacy discovery paths must carry the same current brand as the homepage.
const brandIcon = await readFile(path.join(outputRoot, 'assets/brand/br-mark-192.png'));
const touchIcon = await readFile(path.join(outputRoot, 'assets/brand/apple-touch-icon.png'));
assert.equal(touchIcon.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
assert.equal(touchIcon.readUInt32BE(16), 180);
assert.equal(touchIcon.readUInt32BE(20), 180);
const ico = await readFile(path.join(outputRoot, 'favicon.ico'));
assert.equal(ico.readUInt16LE(0), 0);
assert.equal(ico.readUInt16LE(2), 1);
assert.equal(ico.readUInt16LE(4), 4);
for (const [i, size] of [32, 48, 96, 192].entries()) {
  const entry = 6 + 16 * i;
  assert.equal(ico[entry], size);
  assert.equal(ico[entry + 1], size);
  const start = ico.readUInt32LE(entry + 12);
  const png = ico.subarray(start, start + ico.readUInt32LE(entry + 8));
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(png.readUInt32BE(16), size);
  assert.equal(png.readUInt32BE(20), size);
  if (size === 192) assert.deepEqual(png, brandIcon, 'ICO fallback must contain the current brand icon');
}
const ambassadorSettings = { portfolioImage: 'assets/social/baisalya-original-chair-v4.png', ambassadorEnabled: true, ambassadorImages: { devdesk: 'assets/social/devdesk-ambassador-v1.png' } };
assert.equal(socialImagePath(socialSurfaces[0], ambassadorSettings), ambassadorSettings.portfolioImage);
assert.equal(socialImagePath(socialSurfaces[1], ambassadorSettings), ambassadorSettings.ambassadorImages.devdesk);
assert.equal(socialImagePath(socialSurfaces[2], ambassadorSettings), baseSocialImagePath(socialSurfaces[2]));
assert.equal(socialImagePath(socialSurfaces[0], { ...ambassadorSettings, ambassadorEnabled: false }), ambassadorSettings.portfolioImage);
assert.equal(socialImagePath(socialSurfaces[1], { ...ambassadorSettings, ambassadorEnabled: false }), baseSocialImagePath(socialSurfaces[1]));
assert.equal(socialImagePath(socialSurfaces[0], { ambassadorEnabled: true, ambassadorImages: { baisalya: 'assets/social/old-ambassador.png' } }), baseSocialImagePath(socialSurfaces[0]));
assert.throws(() => socialImagePath(socialSurfaces[0], { portfolioImage: '../outside.png' }), /Invalid portfolio/);
assert.throws(() => socialImagePath(socialSurfaces[1], { ambassadorEnabled: true, ambassadorImages: { devdesk: '../outside.png' } }), /Invalid ambassador/);
for (const surface of socialSurfaces) {
  const imagePath = socialImagePath(surface);
  assert(!images.has(imagePath), `Duplicate preview for ${surface.name}`);
  images.add(imagePath);
  const png = await readFile(path.join(outputRoot, imagePath));
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${surface.name} must use a real PNG`);
  assert.equal(png.readUInt32BE(16), 1200, `${surface.name} width`);
  assert.equal(png.readUInt32BE(20), 630, `${surface.name} height`);
  if (isDist) {
    const file = path.join(outputRoot, surface.route, 'index.html');
    const head = (await readFile(file, 'utf8')).match(/<head\b[^>]*>[\s\S]*?<\/head>/i)?.[0] ?? '';
    for (const key of ['og:image', 'twitter:image', 'og:image:width', 'og:image:height', 'og:image:type', 'og:image:alt']) {
      const tags = [...head.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => tag).filter(tag => new RegExp(`(?:property|name)=["']${key}["']`, 'i').test(tag));
      assert.equal(tags.length, 1, `${surface.name}: exactly one ${key}`);
      if (key.endsWith(':image')) assert(tags[0].includes(`https://baisalya.com/${imagePath}`), `${surface.name}: correct image URL`);
    }
    assert(head.includes('summary_large_image'), `${surface.name}: large Twitter preview`);
  }
}
const stale = '<html><head><title>A &amp; B</title><meta content="old-square.png" property="og:image"><meta property="og:image" content="duplicate.png"><meta content="192" property="og:image:width"><meta name="description" content="Page-specific guide."></head><body><p>Keep content.</p></body></html>';
const patched = applySocialMetadata(stale, 'EduSheet/manual.html');
assert(patched.includes(socialImagePath(socialSurfaces.find(surface => surface.route === 'EduSheet'))));
assert(!patched.includes('old-square.png') && !patched.includes('duplicate.png'));
assert(patched.includes('content="1200"'));
assert(patched.includes('content="Page-specific guide."'));
assert(patched.includes('content="A &amp; B"'));
assert(patched.endsWith('<body><p>Keep content.</p></body></html>'));
const normalizeTags = (html) => html.replace(/>\s+</g, '><');
assert.equal(normalizeTags(applySocialMetadata(patched, 'EduSheet/manual.html')), normalizeTags(patched));
const redirect = '<head><meta http-equiv="refresh" content="0;url=/"><title>Redirect</title></head>';
assert.equal(applySocialMetadata(redirect, 'devdesk/manual/index.html'), redirect);
if (isDist) {
  const root = await readFile(path.join(outputRoot, 'index.html'), 'utf8');
  assert(root.includes('rel="icon" href="/assets/brand/br-mark-192.png" type="image/png" sizes="192x192"'));
  assert(root.includes('rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png" sizes="180x180"'));
  if (socialImagePath(socialSurfaces[0]) !== baseSocialImagePath(socialSurfaces[0])) assert(root.includes('Baishalya Roul portrait'));
  assert(!root.includes('Baishalya Roul with brand ambassador'));
  for (const page of ['privacy.html', ...['index', 'field-photo-report', 'weekly-teaching-plan', 'notification-history-limits'].map(guide => `guides/${guide}.html`)]) {
    const html = await readFile(path.join(outputRoot, page), 'utf8');
    assert(html.includes(`https://baisalya.com/${socialImagePath(socialSurfaces[0])}`));
    assert(html.includes('rel="icon" href="/assets/brand/br-mark-192.png" type="image/png" sizes="192x192"'), `${page}: current brand favicon`);
    assert(html.includes('rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png" sizes="180x180"'), `${page}: current touch icon`);
  }
}
console.log(`Brand favicon and ${socialSurfaces.length} product-specific social previews: passed${isDist ? ' (production HTML)' : ''}`);
