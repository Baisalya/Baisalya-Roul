import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const failures = [];
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const siteMain = await readFile(path.join(root, 'src/site/main.js'), 'utf8');
const siteCss = await readFile(path.join(root, 'src/site/styles/site.css'), 'utf8');

function requireText(source, expected, label = expected) {
  if (!source.includes(expected)) failures.push(`Batch C missing ${label}`);
}
function rejectText(source, unexpected, label = unexpected) {
  if (source.includes(unexpected)) failures.push(`Batch C must not contain ${label}`);
}
async function requireFile(relativePath) {
  try { await access(path.join(root, relativePath)); }
  catch { failures.push(`Batch C missing file: ${relativePath}`); }
}
async function rejectFile(relativePath) {
  try { await access(path.join(root, relativePath)); failures.push(`Batch C stale eager file remains: ${relativePath}`); }
  catch { /* expected */ }
}

for (const [expected, label] of [
  ['<link rel="canonical" href="https://baisalya.com/">', 'canonical URL'],
  ['property="og:url" content="https://baisalya.com/"', 'Open Graph URL'],
  ['property="og:image" content="https://baisalya.com/assets/brand/baisalya-og.png"', 'Open Graph image'],
  ['name="twitter:card" content="summary_large_image"', 'Twitter card'],
  ['type="application/ld+json"', 'JSON-LD structured data'],
  ['"@type": "Person"', 'Person structured data'],
  ['"@type": "WebSite"', 'WebSite structured data'],
  ['name="platform"', 'platform inquiry context'],
  ['name="source" value="baisalya.com"', 'form source context'],
  ['data-easter-secret', 'hidden profile developer-mode trigger'],
]) requireText(html, expected, label);

for (const unexpected of [
  '<div id="debug-mode"',
  '<script type="module" src="easter-egg.js"></script>',
  'onclick="exitDebugMode()"',
  'onclick="restartGame()"',
  'data-easter-trigger',
  'Play BR Debug Run',
]) rejectText(html, unexpected, unexpected);

requireText(siteMain, "./interactions/easter-egg-loader.js", 'lazy easter-egg loader import');
rejectText(siteCss, 'easter-egg-compat.css', 'eager easter-egg stylesheet');

for (const file of [
  'robots.txt',
  'sitemap.xml',
  'sitemap-pages.xml',
  'assets/brand/br-mark.svg',
  'assets/brand/apple-touch-icon.png',
  'assets/brand/baisalya-og.png',
  'src/site/interactions/easter-egg-loader.js',
  'src/site/easter-egg/runtime.js',
  'src/site/easter-egg/easter-egg.css',
]) await requireFile(file);

for (const file of [
  'easter-egg.js',
  'src/site/styles/components/easter-egg-compat.css',
]) await rejectFile(file);

const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapPages = await readFile(path.join(root, 'sitemap-pages.xml'), 'utf8');
requireText(robots, 'Sitemap: https://baisalya.com/sitemap.xml', 'robots sitemap reference');
requireText(sitemap, '<sitemapindex', 'root sitemap index');
requireText(sitemap, '<loc>https://baisalya.com/sitemap-pages.xml</loc>', 'main-pages sitemap entry');
requireText(sitemapPages, '<loc>https://baisalya.com/</loc>', 'canonical home sitemap entry');

const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!ldMatch) failures.push('Batch C JSON-LD block not found');
else {
  try {
    const data = JSON.parse(ldMatch[1]);
    if (!Array.isArray(data['@graph']) || data['@graph'].length < 2) {
      failures.push('Batch C JSON-LD graph is incomplete');
    }
  } catch (error) {
    failures.push(`Batch C JSON-LD is invalid JSON: ${error.message}`);
  }
}

if (failures.length) {
  failures.forEach((failure) => console.error(`ERROR: ${failure}`));
  process.exitCode = 1;
} else {
  console.log('Batch C SEO, contact, and easter-egg isolation: passed');
}
