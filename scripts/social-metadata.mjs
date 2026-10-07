import { socialSurfaces, socialImagePath } from './social-surfaces.mjs';

const escape = (text) => String(text).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const decode = (text) => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');

// Work only on the static head: crawlers must not need to execute JavaScript.
function metaValue(head, key) {
  const tag = [...head.matchAll(/<meta\b[^>]*>/gi)].find(([tag]) => new RegExp(`\\b(?:name|property)=["']${key}["']`, 'i').test(tag))?.[0] ?? '';
  return decode(tag.match(/\bcontent=(["'])([\s\S]*?)\1/i)?.[2] ?? '');
}
export function applySocialMetadata(html, relativePath) {
  if (/(?:^|\/)404\.html$/i.test(relativePath) || /http-equiv=["']refresh["']/i.test(html)) return html;
  const route = relativePath.includes('/') ? relativePath.split('/')[0] : '';
  const surface = socialSurfaces.find((item) => item.route === route) ?? socialSurfaces[0];
  return html.replace(/<head\b[^>]*>[\s\S]*?<\/head>/i, (head) => {
    const isHome = relativePath === (surface.route ? `${surface.route}/index.html` : 'index.html');
    const title = decode((head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? surface.name).replace(/\s+/g, ' ').trim());
    const description = isHome ? surface.description : (metaValue(head, 'description') || surface.description);
    const image = `https://baisalya.com/${socialImagePath(surface)}`;
    const properties = {
      'og:type': 'website', 'og:site_name': surface.route ? surface.name : 'Baisalya',
      'og:title': title, 'og:description': description,
      'og:image': image, 'og:image:secure_url': image, 'og:image:type': 'image/png',
      'og:image:width': '1200', 'og:image:height': '630',
      'og:image:alt': `${surface.name} — ${surface.lines.join(' ')}`,
    };
    const names = {
      'twitter:card': 'summary_large_image', 'twitter:title': title,
      'twitter:description': description, 'twitter:image': image,
      'twitter:image:alt': properties['og:image:alt'],
    };
    // Remove all matching tags, including stale or duplicate dimensions.
    head = head.replace(/<meta\b[^>]*>/gi, (tag) => {
      const key = tag.match(/\b(?:property|name)=["']([^"']+)["']/i)?.[1];
      return key && (key in properties || key in names) ? '' : tag;
    });
    if (!surface.route) {
      head = head.replace(/<link\b(?=[^>]*\brel=["'](?:icon|shortcut icon|apple-touch-icon)["'])[^>]*>/gi, '');
      head = head.replace('</head>', '<link rel="icon" href="/assets/brand/br-mark-192.png" type="image/png" sizes="192x192">\n<link rel="apple-touch-icon" href="/assets/brand/br-mark-192.png" sizes="192x192">\n</head>');
    }
    const tags = [
      ...Object.entries(properties).map(([key, value]) => `<meta property="${key}" content="${escape(value)}">`),
      ...Object.entries(names).map(([key, value]) => `<meta name="${key}" content="${escape(value)}">`),
    ];
    return head.replace('</head>', `${tags.join('\n')}\n</head>`)
      .replace(/[ \t]+$/gm, '').replace(/(?:\r?\n){3,}/g, '\n\n');
  });
}
