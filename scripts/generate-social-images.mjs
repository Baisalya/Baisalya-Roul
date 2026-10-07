import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { socialSurfaces, socialImagePath } from './social-surfaces.mjs';

// Generated PNGs are checked in; production builds do not need Sharp.
// To regenerate, install Sharp locally or set SOCIAL_SHARP_MODULE to its path.
const require = createRequire(import.meta.url);
const sharp = require(process.env.SOCIAL_SHARP_MODULE || 'sharp');
const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
await mkdir('assets/social', { recursive: true });
for (const surface of socialSurfaces) {
  const logo = await sharp(await readFile(surface.logo)).resize(236, 236, { fit: 'contain', background: '#00000000' }).png().toBuffer();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#081222"/><stop offset="1" stop-color="#15283e"/></linearGradient><radialGradient id="glow"><stop stop-color="${surface.accent}" stop-opacity=".22"/><stop offset="1" stop-color="${surface.accent}" stop-opacity="0"/></radialGradient></defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <circle cx="997" cy="252" r="395" fill="url(#glow)"/>
    <path d="M0 540H1200 M780 0V630" stroke="#aec9e6" stroke-opacity=".12"/>
    <rect x="64" y="64" width="42" height="4" rx="2" fill="${surface.accent}"/>
    <text x="64" y="108" fill="${surface.accent}" font-family="Segoe UI,Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="2">${escape(surface.label)}</text>
    <text x="60" y="250" fill="#f5f8ff" font-family="Segoe UI,Arial,sans-serif" font-size="${surface.name.length > 15 ? 57 : 70}" font-weight="700" letter-spacing="-2">${escape(surface.name)}</text>
    <text x="64" y="325" fill="#c7d7e9" font-family="Segoe UI,Arial,sans-serif" font-size="29">${escape(surface.lines[0])}</text>
    <text x="64" y="371" fill="#c7d7e9" font-family="Segoe UI,Arial,sans-serif" font-size="29">${escape(surface.lines[1])}</text>
    <rect x="838" y="139" width="294" height="294" rx="66" fill="#0a1729" stroke="${surface.accent}" stroke-opacity=".35"/>
    <image x="867" y="168" width="236" height="236" href="data:image/png;base64,${logo.toString('base64')}"/>
    <text x="64" y="587" fill="#d9e8fa" font-family="Segoe UI,Arial,sans-serif" font-size="23" font-weight="600">baisalya.com${surface.route ? '/' + surface.route + '/' : ''}</text>
    <text x="1136" y="587" text-anchor="end" fill="${surface.accent}" font-family="Segoe UI,Arial,sans-serif" font-size="18">BY BAISHALYA ROUL</text>
  </svg>`;
  await writeFile(socialImagePath(surface).replace('.png', '.svg'), svg);
  await sharp(Buffer.from(svg)).png().toFile(socialImagePath(surface));
}
console.log(`Generated ${socialSurfaces.length} product-specific social thumbnails (1200 × 630).`);
