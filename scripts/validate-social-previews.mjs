import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { socialSurfaces, socialImagePath, baseSocialImagePath } from './social-surfaces.mjs';
import { applySocialMetadata } from './social-metadata.mjs';

const outputRoot = path.resolve(process.argv[2] || '.');
const isDist = process.argv[2] === 'dist';
const images = new Set();
const site = 'https://baisalya.com/';
const portraits = [
  {
    page: 'index.html', url: site, type: 'ProfilePage',
    image: 'assets/social/baishalya-roul-profile.png', fragment: 'portrait', size: 1254,
    sha256: '73bd1b3ab5b864265ab6c1ec2d5ae85334c734ebf1ec73421dea80fb575a8eb9',
  },
  {
    page: 'brand/index.html', url: site + 'brand/', type: 'CollectionPage',
    image: 'assets/social/baishalya-github-profile.png', fragment: 'profile-photo', size: 460,
    sha256: '0046a91afa6f4cfa7d69f8dfc33e1ea0cbfea42ce7173c2ed15cee78d583c390',
  },
];
const portraitIds = portraits.map(({ image, fragment }) => site + image + '#' + fragment);
const sitemap = await readFile(path.join(outputRoot, 'sitemap-pages.xml'), 'utf8');
for (const portrait of portraits) {
  const png = await readFile(path.join(outputRoot, portrait.image));
  assert.equal(createHash('sha256').update(png).digest('hex'), portrait.sha256, `${portrait.image}: owner approval required before replacing this portrait`);
  assert.equal(png.readUInt32BE(16), portrait.size);
  assert.equal(png.readUInt32BE(20), portrait.size);
  const html = await readFile(path.join(outputRoot, portrait.page), 'utf8');
  const head = html.match(/<head\b[^>]*>[\s\S]*?<\/head>/i)?.[0] ?? '';
  const schema = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1];
  assert(schema, `${portrait.page}: profile image structured data required`);
  const graph = JSON.parse(schema)['@graph'];
  assert.equal(graph.find(node => node['@type'] === portrait.type)?.primaryImageOfPage?.['@id'], site + portrait.image + '#' + portrait.fragment);
  assert.deepEqual(graph.find(node => node['@type'] === 'Person')?.image?.map(img => img['@id']), portraitIds);
  assert(head.includes(`<link rel="canonical" href="${portrait.url}">`), `${portrait.page}: canonical URL`);
  assert.match(head, /<meta name="robots" content="index, follow, max-image-preview:large\b/, `${portrait.page}: permit image previews`);
  if (portrait.page === 'index.html') {
    assert(html.includes(`<img class="professional-hero__portrait" src="/${portrait.image}"`), 'Keep the approved homepage portrait in the hero');
  }
  const pageEntry = [...sitemap.matchAll(/<url>[\s\S]*?<\/url>/g)].find(([entry]) => entry.includes(`<loc>${portrait.url}</loc>`))?.[0] ?? '';
  for (const { image } of portraits) {
    assert([...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)].some(([, src]) => src.replace(/^\//, '') === image), `${portrait.page}: includes ${image}`);
    assert(pageEntry.includes(`<image:loc>${site}${image}</image:loc>`), `${portrait.page}: sitemap lists ${image}`);
  }
  for (const [key, value] of [
    ['thumbnail', site + portrait.image],
    ['og:image', site + portrait.image],
    ['og:image:secure_url', site + portrait.image],
    ['og:image:width', portrait.size],
    ['og:image:height', portrait.size],
    ['twitter:image', site + portrait.image],
    ['twitter:card', 'summary'],
  ]) {
    const tags = [...head.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => tag).filter(tag => new RegExp(`(?:property|name)=["']${key}["']`, 'i').test(tag));
    assert.equal(tags.length, 1, `${portrait.page}: exactly one ${key}`);
    assert(tags[0].includes(`content="${value}"`), `${portrait.page}: correct ${key}`);
  }
}
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
  if (isDist && surface.route) {
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
  assert(!root.includes('Baishalya Roul with brand ambassador'));
  for (const page of ['privacy.html', ...['index', 'field-photo-report', 'weekly-teaching-plan', 'notification-history-limits'].map(guide => `guides/${guide}.html`)]) {
    const html = await readFile(path.join(outputRoot, page), 'utf8');
    assert(html.includes(`https://baisalya.com/${socialImagePath(socialSurfaces[0])}`));
    assert(html.includes('rel="icon" href="/assets/brand/br-mark-192.png" type="image/png" sizes="192x192"'), `${page}: current brand favicon`);
    assert(html.includes('rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png" sizes="180x180"'), `${page}: current touch icon`);
  }
}
console.log(`Brand favicon and ${socialSurfaces.length} product-specific social previews: passed${isDist ? ' (production HTML)' : ''}`);
