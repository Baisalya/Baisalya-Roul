import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const failures = [];

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    failures.push(`SurveyCam missing file: ${relativePath}`);
    return false;
  }
}

for (const relativePath of [
  'surveycam/index.html',
  'surveycam/privacy.html',
  'surveycam/support.html',
  'surveycam/styles.css',
  'surveycam/site.js',
  'surveycam/robots.txt',
  'surveycam/sitemap.xml',
  'surveycam/assets/surveycam-logo.png',
  'surveycam/assets/surveycam-og.png',
]) await exists(relativePath);

const home = await readFile(path.join(root, 'surveycam/index.html'), 'utf8');
for (const expected of [
  'SurveyCam - Location & Geo Tag',
  'https://play.google.com/store/apps/details?id=com.baishalya.surveycam',
  'PDF proof reports',
  'Project-wise folders',
  'No data collection declared',
  'baishalya1999@gmail.com',
]) {
  if (!home.includes(expected)) failures.push(`SurveyCam home missing: ${expected}`);
}

// The campaign parameter is optional tracking metadata and HTML serializers may encode
// '&' as '&amp;'. The stable contract is the actual Play package URL above.
const playLinks = [...home.matchAll(/href=["']([^"']*play\.google\.com\/store\/apps\/details\?[^"']*)["']/gi)]
  .map((match) => match[1].replaceAll('&amp;', '&'));
if (!playLinks.some((href) => {
  try {
    const url = new URL(href);
    return url.hostname === 'play.google.com' &&
      url.pathname === '/store/apps/details' &&
      url.searchParams.get('id') === 'com.baishalya.surveycam';
  } catch {
    return false;
  }
})) {
  failures.push('SurveyCam home missing valid Google Play package link');
}

const rootHome = await readFile(path.join(root, 'index.html'), 'utf8');
if (!rootHome.includes('href="/surveycam/"')) {
  failures.push('Root software card missing canonical SurveyCam website link');
}

const privacy = await readFile(path.join(root, 'surveycam/privacy.html'), 'utf8');
for (const expected of [
  'does not share data with third parties',
  'does not collect data',
  'baishalya1999@gmail.com',
]) {
  if (!privacy.includes(expected)) failures.push(`SurveyCam privacy missing: ${expected}`);
}

if (failures.length) {
  failures.forEach((failure) => console.error(`ERROR: ${failure}`));
  process.exitCode = 1;
} else {
  console.log('SurveyCam website and canonical root integration: passed');
}
