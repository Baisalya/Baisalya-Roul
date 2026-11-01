import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { applyAmbassadorCampaign } from './ambassador-campaigns.mjs';
import { socialSurfaces, socialImagePath } from './social-surfaces.mjs';

const root = path.resolve(process.argv[2] || '.');
const read = file => readFile(path.join(root, file), 'utf8');
const configContext = { window: {} };
vm.runInNewContext(await read('friction-atlas/assets/js/site-config.js'), configContext);
const config = configContext.window.FA_CONFIG;
assert.equal(config.releaseLabel, 'Not released yet');
assert.equal(config.androidUrl, '');
assert.equal(config.windowsUrl, '');
const pages = ['index', 'download', 'bots', 'manual', 'privacy', 'terms', 'support'];
const image = socialImagePath(socialSurfaces.find(surface => surface.key === 'friction-atlas'));
for (const page of pages) {
  const html = await read(`friction-atlas/${page}.html`);
  assert(html.includes('Not released yet'), `${page}: visible pre-release notice`);
  assert(html.includes(`https://baisalya.com/${image}`), `${page}: product-specific social cover`);
  assert(!/href="https:\/\/(?:play\.google\.com|apps\.microsoft\.com)/.test(html), `${page}: no premature store link`);
}
for (const surface of socialSurfaces) {
  let file = (surface.route ? surface.route + '/' : '') + 'index.html';
  if (process.argv[2] !== 'dist') {
    file = file.replace('brightquest-kids/', 'BrightQuest_Kids/');
  }
  const html = await read(file);
  assert.equal((html.match(/data-ambassador-campaign=/g) || []).length, surface.route ? 1 : 0, `${file}: product-only ambassador campaigns`);
  if (!surface.route) {
    assert(!/ambassador-mint|class="ambassador-campaign|assets\/brand\/ambassadors\//.test(html), 'Portfolio must not display the ambassador');
    const software = html.match(/<section\b[^>]*\bid="software"[\s\S]*?<section\b[^>]*\bid="engineering"/)?.[0] || html.slice(html.indexOf('id="software"'));
    assert(software.includes('<h3>Friction Atlas: Habits &amp; Focus</h3>'), 'Friction Atlas belongs in the software list');
  }
  const route = (surface.route ? surface.route + '/' : '') + 'index.html';
  const once = applyAmbassadorCampaign(html, route);
  assert.equal(applyAmbassadorCampaign(once, route), once, `${file}: build must not duplicate campaigns`);
}

// Exercise the actual download runtime: blank config must prevent navigation,
// while real listings can be activated through the same configuration.
const app = await read('friction-atlas/assets/js/app.js');
function runDownloads(released) {
  const buttons = ['android', 'windows'].map(platform => ({
    dataset: { download: platform },
    classes: new Set(['btn-disabled']), attributes: { 'aria-disabled': 'true' },
    setAttribute(key, value) { this.attributes[key] = value; },
    removeAttribute(key) { delete this.attributes[key]; },
    addEventListener(name, handler) { this[name] = handler; },
    querySelector() { return { replaceChildren() {} }; },
  }));
  for (const button of buttons) button.classList = {
    add: name => button.classes.add(name), remove: name => button.classes.delete(name),
  };
  const cfg = { ...config, ...released };
  vm.runInNewContext(app, {
    window: { FA_CONFIG: cfg }, Date,
    document: { querySelector: () => null, querySelectorAll: selector => selector === '[data-download]' ? buttons : [] },
  });
  return buttons;
}
for (const button of runDownloads()) {
  assert.equal(button.href, '#');
  assert.equal(button.attributes['aria-disabled'], 'true');
  let prevented = false;
  button.click({ preventDefault() { prevented = true; } });
  assert(prevented, 'Pre-release downloads must not navigate');
}
for (const button of runDownloads({ androidUrl: 'https://play.google.com/store/apps/details?id=example', windowsUrl: 'https://apps.microsoft.com/detail/EXAMPLE' })) {
  assert.equal(button.href.startsWith('https://'), true);
  assert(!button.classes.has('btn-disabled'));
  assert.equal(button.attributes['aria-disabled'], undefined);
}
console.log('Friction Atlas release state, download controls and all ambassador campaigns: passed');
