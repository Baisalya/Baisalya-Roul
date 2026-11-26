import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { socialSurfaces } from './social-surfaces.mjs';

const directory = 'assets/app-promos';
const playlistScriptPattern = /<script type="application\/json" id="app-promo-playlist">([\s\S]*?)<\/script>/;
const videoExtensions = new Set(['.mp4', '.m4v', '.webm']);
const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.webp']);
const sortByName = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
const products = new Map(socialSurfaces.filter(({ route }) => route).flatMap(product => [
  [product.key, product],
  [product.route.toLowerCase(), product],
]));

function displayName(filename) {
  const name = filename.replace(/^\d+[\s_.-]+/, '').replace(/[_-]+/g, ' ').trim();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function assetUrl(folder, filename) {
  return `/${directory}/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;
}

async function findPromos(outputRoot) {
  const root = path.join(outputRoot, directory);
  const folders = await readdir(root, { withFileTypes: true }).catch(error => {
    if (error.code === 'ENOENT') return [];
    throw error;
  });
  const videos = [];
  const images = [];
  for (const folder of folders.sort((a, b) => sortByName.compare(a.name, b.name))) {
    if (!folder.isDirectory() || folder.name.startsWith('.')) continue;
    const product = products.get(folder.name.toLowerCase());
    const files = (await readdir(path.join(root, folder.name), { withFileTypes: true }))
      .filter(entry => entry.isFile() && !entry.name.startsWith('.'))
      .map(entry => entry.name)
      .sort(sortByName.compare);
    const posters = new Map();
    for (const file of files) {
      const extension = path.extname(file).toLowerCase();
      const stem = path.basename(file, path.extname(file));
      if (stem.toLowerCase().endsWith('.poster') && imageExtensions.has(extension)) {
        posters.set(stem.slice(0, -'.poster'.length), file);
      }
    }
    for (const file of files) {
      const extension = path.extname(file).toLowerCase();
      const stem = path.basename(file, path.extname(file));
      if (stem.toLowerCase().endsWith('.poster')) continue;
      const isVideo = videoExtensions.has(extension);
      if (!isVideo && !imageExtensions.has(extension)) continue;
      const src = assetUrl(folder.name, file);
      const poster = posters.get(stem);
      const promo = {
        app: product?.name ?? displayName(folder.name),
        href: product ? `/${product.route}/` : null,
        title: displayName(stem),
        type: isVideo ? 'video' : 'image',
        src,
        poster: isVideo ? (poster ? assetUrl(folder.name, poster) : null) : src,
      };
      (isVideo ? videos : images).push(promo);
    }
  }
  return [...videos, ...images];
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export async function prepareAppPromos(outputRoot) {
  const file = path.join(outputRoot, 'index.html');
  const html = await readFile(file, 'utf8');
  const match = html.match(playlistScriptPattern);
  if (!match) throw new Error('Homepage app promo playlist placeholder is missing.');
  let promos = [];
  try {
    const parsed = JSON.parse(match[1].trim() || '[]');
    if (Array.isArray(parsed) && parsed.length) promos = parsed;
  } catch {
    promos = [];
  }
  if (!promos.length) promos = await findPromos(outputRoot);
  if (!promos.length) return;

  const [first] = promos;
  const payload = JSON.stringify(promos).replaceAll('<', '\\u003c');
  const poster = first.poster
    ? `<img data-promo-still src="${escapeHtml(first.poster)}" alt="${escapeHtml(first.title)}" decoding="async">`
    : '<img data-promo-still alt="" decoding="async" hidden>';
  const appName = escapeHtml(first.app);
  const appHref = first.href ? ` href="${escapeHtml(first.href)}"` : '';
  const updated = html
    .replace(playlistScriptPattern, () => `<script type="application/json" id="app-promo-playlist">${payload}</script>`)
    .replace('data-app-promos hidden', 'data-app-promos')
    .replace('<img data-promo-still alt="" decoding="async" hidden>', () => poster)
    .replace('<a data-promo-app></a>', () => `<a data-promo-app${appHref}>${appName}</a>`)
    .replace('<p data-promo-title></p>', () => `<p data-promo-title>${escapeHtml(first.title)}</p>`);
  await writeFile(file, updated, 'utf8');
}
