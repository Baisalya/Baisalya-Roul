import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { socialSurfaces } from './social-surfaces.mjs';

// Apply the background mask to the original photo; never synthesize its RGB.
// The original private photo is supplied locally and is not checked in.
const referencePath = process.argv[2];
if (!referencePath) throw new Error('Supply the original owner photo path.');
const sharp = createRequire(import.meta.url)(process.env.SOCIAL_SHARP_MODULE || 'sharp');
const surface = socialSurfaces[0];
const { data, info } = await sharp(referencePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const maskPath = new URL('../assets/social/baisalya-owner-mask-v3.png', import.meta.url);
const mask = await sharp(await readFile(maskPath)).greyscale().raw().toBuffer({ resolveWithObject: true });
if (mask.info.width !== info.width || mask.info.height !== info.height) throw new Error('The foreground mask must match the original photo dimensions.');
let minX = info.width, minY = info.height, maxX = 0, maxY = 0;
for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
  const pixel = y * info.width + x, offset = pixel * 4;
  data[offset + 3] = mask.data[pixel];
  if (mask.data[pixel]) {
    minX = Math.min(minX, x); minY = Math.min(minY, y);
    maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
  } else {
    // Discard room pixels under transparency as well.
    data[offset] = 0; data[offset + 1] = 0; data[offset + 2] = 0;
  }
}
const cutout = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
  .png({ compressionLevel: 9 }).toBuffer();
await sharp(cutout).toFile('assets/social/baisalya-owner-cutout-v3.png');
const photo = await sharp(cutout).resize({ width: 760 }).png().toBuffer();
const photoSize = await sharp(photo).metadata();
const logo = await sharp(await readFile(surface.logo)).resize(96, 96).png().toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#081222"/><stop offset="1" stop-color="#15283e"/></linearGradient><radialGradient id="glow"><stop stop-color="#7ab8ff" stop-opacity=".16"/><stop offset="1" stop-color="#7ab8ff" stop-opacity="0"/></radialGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="947" cy="325" r="365" fill="url(#glow)"/>
  <image x="64" y="52" width="96" height="96" href="data:image/png;base64,${logo.toString('base64')}"/>
  <text x="64" y="194" fill="#7ab8ff" font-family="Segoe UI,Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="2">INDEPENDENT SOFTWARE BUILDER</text>
  <text x="60" y="281" fill="#f5f8ff" font-family="Segoe UI,Arial,sans-serif" font-size="62" font-weight="700" letter-spacing="-2">Baishalya Roul</text>
  <text x="64" y="351" fill="#c7d7e9" font-family="Segoe UI,Arial,sans-serif" font-size="29">Practical software.</text>
  <text x="64" y="397" fill="#c7d7e9" font-family="Segoe UI,Arial,sans-serif" font-size="29">Built around your work.</text>
  <path d="M64 523H610" stroke="#aec9e6" stroke-opacity=".18"/>
  <text x="64" y="574" fill="#d9e8fa" font-family="Segoe UI,Arial,sans-serif" font-size="23" font-weight="600">baisalya.com</text>
</svg>`;
await sharp(Buffer.from(svg)).composite([{ input: photo, left: 440, top: 630 - photoSize.height }])
  .png({ compressionLevel: 9 }).toFile('assets/social/baisalya-original-chair-v3.png');
console.log('Saved the original owner and chair on the brand background, without changing photo RGB.');
