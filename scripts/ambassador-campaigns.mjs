import path from 'node:path';
import { socialSurfaces } from './social-surfaces.mjs';

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const relativeAsset = (page, asset) => path.posix.relative(path.posix.dirname(page), asset);
const descriptions = {
  devdesk: 'Bring notes, research, APIs and developer tools into one connected workspace.',
  'construction-erp': 'Connect site records, budgets, resources and daily operations across your team.',
  shoppilot: 'Keep sales, stock and the everyday work of your shop connected.',
  edusheet: 'Plan your teaching week, organize lessons and create your next question paper.',
  surveycam: 'Give every field photo the location, time and context your work needs.',
  notivault: 'Keep selected notification previews private and searchable on your Android device.',
  sitesnap: 'Explore the open-source field-camera project behind SurveyCam.',
  brightquest: 'Discover playful learning, guided practice and an experience made for young learners.',
  paperaid: 'Scan, prepare and organize documents with local-first tools for Android and Windows.',
  'friction-atlas': 'Understand what blocks a habit. Test a small change. Find the patterns that help you focus.',
};
const destinations = {
  devdesk: 'downloads.html', 'construction-erp': 'features.html', shoppilot: 'user-manual.html',
  edusheet: 'download.html', surveycam: '#features', notivault: '#features', sitesnap: '#source-or-app',
  brightquest: 'downloads.html', paperaid: 'download.html', 'friction-atlas': 'manual.html',
};

export function campaignMarkup(page) {
  const route = page.includes('/') ? page.split('/')[0] : '';
  const surface = socialSurfaces.find(item => item.route === route);
  if (!surface || !surface.route || page !== `${route}/index.html`) return '';
  const friction = surface.key === 'friction-atlas';
  const image = friction ? 'friction-atlas/assets/img/brand/ambassador-mint-v1.jpg' : `assets/brand/ambassadors/${surface.key}-v1.jpg`;
  const logo = friction ? 'friction-atlas/assets/img/brand/app-icon-256.png' : null;
  const href = destinations[surface.key];
  const title = friction ? 'Understand your habits. Find your focus.' : surface.lines.join(' ');
  return `<section class="ambassador-campaign" id="campaign-${surface.key}" data-ambassador-campaign="${surface.key}" aria-labelledby="ambassador-${surface.key}">
  <div class="ambassador-campaign__panel">
    <div class="ambassador-campaign__copy">
      <p class="ambassador-campaign__eyebrow">${escape(surface.name + ' · Brand ambassador')}</p>
      <h2 id="ambassador-${surface.key}">${escape(title)}</h2>
      <p class="ambassador-campaign__description">${escape(descriptions[surface.key])}</p>
      <a class="ambassador-campaign__link" href="${escape(href)}">${friction ? 'See how it works' : 'Explore ' + escape(surface.name)} <span aria-hidden="true">→</span></a>
      ${friction ? '<p class="ambassador-campaign__status">Not released yet · Android &amp; Microsoft Store coming soon</p>' : ''}
    </div>
    <figure class="ambassador-campaign__portrait${friction ? ' ambassador-campaign__portrait--original' : ''}">
      <img class="ambassador-campaign__image" src="${relativeAsset(page, image)}" width="${friction ? '1024' : '1200'}" height="${friction ? '1536' : '630'}" loading="lazy" decoding="async" alt="${escape(friction ? 'Friction Atlas brand ambassador in a modern mint blazer' : surface.name + ' brand ambassador with the app logo')}">
      ${logo ? `<img class="ambassador-campaign__logo" src="${relativeAsset(page, logo)}" width="76" height="76" loading="lazy" alt="Friction Atlas app logo">` : ''}
    </figure>
  </div>
  <p class="ambassador-campaign__caption">${escape(surface.name + ' · Represented by our brand ambassador')}</p>
</section>`.replace(/[ \t]+$/gm, '');
}

// Find the complete hero, including any nested section elements.
export function applyAmbassadorCampaign(html, page) {
  // The portfolio lists products; ambassador campaigns belong to product sites.
  if (page === 'index.html') {
    return html
      .replace(/<section\b[^>]*\bdata-ambassador-campaign=["']baisalya["'][^>]*>[\s\S]*?<\/section>\s*/i, '')
      .replace(/<link\b[^>]*\bhref=["'](?:\/)?assets\/brand\/ambassador\.css["'][^>]*>\s*/i, '');
  }
  const markup = campaignMarkup(page);
  if (!markup) return html;
  const existing = /<section\b[^>]*\bdata-ambassador-campaign=["'][^"']+["'][^>]*>[\s\S]*?<\/section>/i;
  if (existing.test(html)) html = html.replace(existing, markup);
  else {
    const hero = /<section\b[^>]*\bclass=["'][^"']*\b(?:hero|professional-hero)\b[^"']*["'][^>]*>/i.exec(html);
    if (!hero) throw new Error(`No hero insertion point: ${page}`);
    const tags = /<\/?section\b[^>]*>/gi;
    tags.lastIndex = hero.index;
    let depth = 0, end;
    for (let tag; (tag = tags.exec(html));) {
      depth += /^<\//.test(tag[0]) ? -1 : 1;
      if (!depth) { end = tags.lastIndex; break; }
    }
    if (!end) throw new Error(`Unclosed hero: ${page}`);
    html = html.slice(0, end) + '\n' + markup + html.slice(end);
  }
  if (!html.includes('assets/brand/ambassador.css')) {
    html = html.replace('</head>', `<link rel="stylesheet" href="${relativeAsset(page, 'assets/brand/ambassador.css')}">\n</head>`);
  }
  return html;
}
