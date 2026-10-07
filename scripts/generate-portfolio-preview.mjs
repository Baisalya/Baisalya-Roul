import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { socialSurfaces } from './social-surfaces.mjs';

// Exact-photo layout: do not synthesize, retouch, relight or replace the face.
// The original private photo is supplied locally and is not checked in.
const referencePath = process.argv[2];
if (!referencePath) throw new Error('Supply the original owner photo path.');
const sharp = createRequire(import.meta.url)(process.env.SOCIAL_SHARP_MODULE || 'sharp');
const surface = socialSurfaces[0];
const photo = await sharp(referencePath)
  .extract({ left: 310, top: 609, width: 700, height: 800 })
  .resize(488, 558)
  .png().toBuffer();
const logo = await sharp(await readFile(surface.logo)).resize(96, 96).png().toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#081222"/><stop offset="1" stop-color="#15283e"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="672" y="34" width="492" height="562" fill="#071019" stroke="#7ab8ff" stroke-opacity=".45" stroke-width="2"/>
  <image x="64" y="52" width="96" height="96" href="data:image/png;base64,${logo.toString('base64')}"/>
  <text x="64" y="194" fill="#7ab8ff" font-family="Segoe UI,Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="2">INDEPENDENT SOFTWARE BUILDER</text>
  <text x="60" y="281" fill="#f5f8ff" font-family="Segoe UI,Arial,sans-serif" font-size="62" font-weight="700" letter-spacing="-2">Baishalya Roul</text>
  <text x="64" y="351" fill="#c7d7e9" font-family="Segoe UI,Arial,sans-serif" font-size="29">Practical software.</text>
  <text x="64" y="397" fill="#c7d7e9" font-family="Segoe UI,Arial,sans-serif" font-size="29">Built around your work.</text>
  <path d="M64 523H610" stroke="#aec9e6" stroke-opacity=".18"/>
  <text x="64" y="574" fill="#d9e8fa" font-family="Segoe UI,Arial,sans-serif" font-size="23" font-weight="600">baisalya.com</text>
</svg>`;
await sharp(Buffer.from(svg)).composite([{ input: photo, left: 674, top: 36 }])
  .png({ compressionLevel: 9 }).toFile('assets/social/baisalya-original-photo-v2.png');
console.log('Saved the portfolio preview using only a crop and resize of the original photograph.');
