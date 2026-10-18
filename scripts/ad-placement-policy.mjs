import path from 'node:path';

// Editorial selection, not a word-count threshold. All other pages stay ad-free.
// Keep brief references, product pitches, downloads and support outside this list.
export const reviewedAdPages = new Set([
  'devdesk/manual/user-manual.html',
  'devdesk/manual/getting-started.html',
  'devdesk/manual/developer-workspaces.html',
  'devdesk/manual/api-workspaces.html',
  'devdesk/manual/backup-restore.html',
  'devdesk/manual/container-operations.html',
  'construction-erp/manual.html',
  'shoppilot-erp/user-manual.html',
  'EduSheet/manual.html',
]);

export function applyAdPlacementPolicy(html, relativeFile) {
  const page = relativeFile.replaceAll('\\', '/').replace(/^shoppilot erp\//, 'shoppilot-erp/');
  // Remove legacy placements and loaders before applying the reviewed selection.
  html = html.replace(/<aside\b(?=[^>]*\bdata-ad-unit=["']manual["'])[^>]*>[\s\S]*?<\/aside>\s*/gi, '')
    .replace(/<meta\b(?=[^>]*\bname=["']baisalya-ad-page["'])[^>]*>\s*/gi, '')
    .replace(/<script\b(?=[^>]*\bsrc=["'][^"']*assets\/monetization\/(?:config|monetization)\.js(?:\?[^"']*)?["'])[^>]*>[\s\S]*?<\/script>\s*/gi, '');
  if (!reviewedAdPages.has(page)) return html;

  const prefix = path.posix.relative(path.posix.dirname(page), 'assets/monetization');
  if (!html.includes('assets/monetization/monetization.css')) {
    html = html.replace('</head>', `<link rel="stylesheet" href="${prefix}/monetization.css">\n</head>`);
  }
  html = html.replace('</head>', `<meta name="baisalya-ad-page" content="/${page}">\n</head>`);
  const placement = '<aside class="monetization-ad" data-ad-unit="manual" hidden aria-label="Advertisement"></aside>';
  html = html.replace('</main>', `${placement}\n</main>`);
  return html.replace('</body>', `<script src="${prefix}/config.js"></script>\n<script src="${prefix}/monetization.js" defer></script>\n</body>`);
}
