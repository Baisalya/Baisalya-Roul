import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const runtime = await readFile('assets/monetization/monetization.js', 'utf8');
const enabledConfig = {
  enabled: true, consentReady: true, autoAds: true,
  adsenseClient: 'ca-pub-1529558529658186', manualSlot: '9546051599',
};

function load(pathname, config = enabledConfig, hasSlot = true) {
  let activations = 0;
  const schedule = () => { activations++; };
  const context = {
    window: { location: { pathname }, BAISALYA_MONETIZATION: config, requestIdleCallback: schedule },
    document: { querySelectorAll: () => hasSlot ? [{}] : [] },
    requestIdleCallback: schedule,
  };
  vm.runInNewContext(runtime, context);
  return activations;
}

// A stale Auto Ads config or an accidental slot must never monetize these pages.
for (const pathname of [
  '/', '/index.html', '/privacy.html', '/EduSheet/download.html',
  '/devdesk/downloads.html', '/devdesk/privacy-policy.html',
  '/paperaid/download.html', '/paperaid/privacy-policy.html',
  '/paperaid/terms-of-service.html', '/construction-erp/account-deletion.html',
  '/construction-erp/data-safety.html', '/construction-erp/404.html',
  '/brightquest-kids/', '/BrightQuest_Kids/index.html',
  '/notivault-website/', '/notivault-website/privacy-policy/index.html',
]) assert.equal(load(pathname), 0, `${pathname} must not schedule an ad request`);

assert.equal(load('/paperaid/index.html', { ...enabledConfig, enabled: false }), 0);
assert.equal(load('/paperaid/index.html', { ...enabledConfig, consentReady: false }), 0);
assert.equal(load('/paperaid/index.html', enabledConfig, false), 0, 'Auto Ads cannot bypass the manual slot requirement');
assert.equal(load('/paperaid/index.html', { ...enabledConfig, autoAds: false }), 1);
assert.equal(load('/devdesk/manual/user-manual.html', { ...enabledConfig, autoAds: false }), 1);

const pkg = JSON.parse(await readFile('package.json', 'utf8'));
assert.equal(pkg.scripts.postbuild, undefined, 'An ordinary build must not silently enable advertising');
const workflow = await readFile('.github/workflows/deploy-baisalya-pages.yml', 'utf8');
assert(workflow.includes("vars.ADSENSE_CONSENT_READY == 'true'"), 'Production advertising requires an explicit consent acknowledgement');
assert(!workflow.includes("vars.ADSENSE_CONSENT_READY != 'false'"));
const privacy = await readFile('privacy.html', 'utf8');
assert(privacy.includes('https://policies.google.com/technologies/partner-sites'));
assert(privacy.includes('cookies') && privacy.includes('IP addresses') && privacy.includes('consent'));

console.log('Ad-free routes, consent gates and build activation regressions: passed');
