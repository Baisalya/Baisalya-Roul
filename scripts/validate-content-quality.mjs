import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { applyAdPlacementPolicy, reviewedAdPages } from './ad-placement-policy.mjs';

const root = path.resolve(process.argv[2] || '.');
const read = file => readFile(path.join(root, file), 'utf8');
const play = 'https://play.google.com/store/apps/details?id=com.baishalya.paperaid';
const fixture = '<html><head></head><body><main><h1>Useful manual</h1><p>Keep this content.</p></main><aside class="creator-support">Support</aside><aside data-ad-unit="manual" hidden></aside><script src="../assets/monetization/config.js"></script><script src="../assets/monetization/monetization.js" defer></script></body></html>';
for (const file of ['devdesk/manual/uuid.html', 'devdesk/downloads.html', 'surveycam/support.html', 'paperaid/index.html', 'unreviewed/manual.html', 'guides/prepare-document-upload.html']) {
  const result = applyAdPlacementPolicy(fixture, file);
  assert(!result.includes('data-ad-unit'), `${file}: ad placeholder removed`);
  assert(!result.includes('assets/monetization/config.js'), `${file}: loader removed`);
  assert(result.includes('Keep this content.') && result.includes('creator-support'), `${file}: content and support preserved`);
}
for (const file of reviewedAdPages) {
  const result = applyAdPlacementPolicy(fixture, file);
  assert.equal((result.match(/data-ad-unit="manual"/g) || []).length, 1);
  assert(result.includes(`content="/${file}"`));
  assert.equal(applyAdPlacementPolicy(result, file), result, `${file}: repeat builds must not duplicate or move ads`);
}

// A copied template, unknown page or Auto Ads configuration must not request ads.
const runtime = await read('assets/monetization/monetization.js');
function scheduledAds({ pathname, approvedPath, autoAds = false, consentReady = true }) {
  let scheduled = 0;
  const window = { location: { pathname }, BAISALYA_MONETIZATION: {
    enabled: true, consentReady, autoAds, adsenseClient: 'ca-pub-1529558529658186', manualSlot: '9546051599',
  } };
  const document = {
    querySelectorAll: () => [{}],
    querySelector: () => approvedPath ? { content: approvedPath } : null,
  };
  window.requestIdleCallback = () => scheduled++;
  vm.runInNewContext(runtime, { window, document, requestIdleCallback: window.requestIdleCallback });
  return scheduled;
}
assert.equal(scheduledAds({ pathname: '/devdesk/manual/uuid.html' }), 0);
assert.equal(scheduledAds({ pathname: '/devdesk/manual/uuid.html', approvedPath: '/devdesk/manual/getting-started.html' }), 0);
assert.equal(scheduledAds({ pathname: '/devdesk/manual/getting-started.html', approvedPath: '/devdesk/manual/getting-started.html', autoAds: true }), 0);
assert.equal(scheduledAds({ pathname: '/devdesk/manual/getting-started.html', approvedPath: '/devdesk/manual/getting-started.html', consentReady: false }), 0);
assert.equal(scheduledAds({ pathname: '/devdesk/manual/getting-started.html', approvedPath: '/devdesk/manual/getting-started.html' }), 1);

const home = await read('index.html');
const identityGraph = JSON.parse(home.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1])['@graph'];
const person = identityGraph.find(node => node['@type'] === 'Person');
const profile = identityGraph.find(node => node['@type'] === 'ProfilePage');
assert.equal(profile.mainEntity['@id'], person['@id'], 'Profile page must identify the same person as the guides');
for (const url of ['https://www.instagram.com/baishalya/', 'https://www.facebook.com/baishalya.roul', 'https://www.youtube.com/@RelaxedInsaan']) {
  assert(person.sameAs.includes(url), 'Public identity must include the supplied profile URL');
}
const paperHome = await read('paperaid/index.html');
const download = await read('paperaid/download.html');
for (const [file, html] of [['index.html', home], ['paperaid/index.html', paperHome], ['paperaid/download.html', download]]) {
  assert(html.includes(`href="${play}"`), `${file}: public Android link works without JS`);
  assert(!/Android (?:is in preparation|public release is (?:still )?in preparation|Coming Soon)/i.test(html), `${file}: stale release status`);
}
const androidCard = download.match(/<article class="download-card">[\s\S]*?<\/article>/)?.[0] || '';
assert(download.includes('site-config.js?v=20261018'), 'Android release config must invalidate the earlier coming-soon config cache');
assert(androidCard.includes('Publicly released on Google Play'));
assert(!/aria-disabled|href="#/.test(androidCard), 'Public Android install action must be enabled');
assert((await read('paperaid/site-config.js')).includes(`androidStoreUrl: '${play}'`));
assert.equal(JSON.parse(await read('paperaid/update.json')).android.url, play);
for (const html of [home, paperHome]) {
  const nodes = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap(match => { const data = JSON.parse(match[1]); return data['@graph'] || [data]; });
  const app = nodes.find(node => node.name === 'PaperAid' && node['@type'] === 'SoftwareApplication');
  assert(app && app.operatingSystem.includes('Android') && app.operatingSystem.includes('Windows'));
  assert(app.sameAs.includes(play));
}

const hub = await read('guides/index.html');
const sitemap = await read('sitemap-pages.xml');
for (const slug of ['prepare-document-upload', 'debug-api-request', 'field-photo-report', 'weekly-teaching-plan', 'notification-history-limits']) {
  const file = `guides/${slug}.html`;
  const html = await read(file);
  const article = JSON.parse(html.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1]);
  assert.equal(article.author['@id'], person['@id'], `${file}: consistent author identity`);
  assert.equal(article.publisher['@id'], person['@id'], `${file}: consistent publisher identity`);
  assert.equal(article.mainEntityOfPage, `https://baisalya.com/${file}`, `${file}: article identifies its own canonical page`);
  assert(html.includes('property="og:type" content="article"'), `${file}: article preview type`);
  assert(hub.includes(`${slug}.html`) && home.includes(`/guides/${slug}.html`), `${file}: discoverable from home and hub`);
  assert(sitemap.includes(`https://baisalya.com/${file}`), `${file}: discoverable through sitemap`);
  for (const [, id] of html.matchAll(/<h2 id="([^"]+)"/g)) {
    assert(html.includes(`href="#${id}"`), `${file}: article outline matches section`);
  }
  assert(!html.includes('data-ad-unit') && !html.includes('assets/monetization/config.js'));
}
const sample = JSON.parse(await read('guides/examples/customer-request.json'));
assert.equal(new Date(sample.createdAtSeconds * 1000).toISOString(), '2024-01-01T00:00:00.000Z');
assert.equal(Buffer.from('DevDesk').toString('base64'), 'RGV2RGVzaw==');
assert.equal(encodeURIComponent('site report & photos'), 'site%20report%20%26%20photos');
const versionPattern = /version:\s+(\d+\.\d+\.\d+)/;
assert.equal('version: 2.5.1'.match(versionPattern)[1], '2.5.1');
assert.equal('version: 2x5x1'.match(versionPattern), null);
assert.equal('Version: 2.5.1'.match(versionPattern), null);
console.log(`Content discovery, worked fixtures, exact-page ad guards and PaperAid public release: passed${process.argv[2] === 'dist' ? ' (production)' : ''}`);
