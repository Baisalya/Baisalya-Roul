# PaperAid integration into Baisalya-Roul

The current repository release builder explicitly lists product directories, so
adding only the `paperaid/` folder is not enough for the `dist/` deployment.

After copying this folder to the repository root, update the repo-level release
scripts with the same pattern already used for SurveyCam / EduSheet:

## scripts/build-release.mjs
Add a PaperAid runtime list:

```js
const paperAidRuntimeFiles = [
  '404.html', 'config.json', 'download.html', 'index.html', 'manual.html',
  'privacy-policy.html', 'quick-start.html', 'robots.txt', 'site-config.js',
  'site.webmanifest', 'sitemap.xml', 'support.html', 'terms-of-service.html',
  'update.json',
];
```

In `validateSourcePlan()` require those files and `paperaid/assets`.

During the production copy stage add:

```js
const paperAidOutput = path.join(outputRoot, 'paperaid');
await copyFiles(path.join(projectRoot, 'paperaid'), paperAidOutput, paperAidRuntimeFiles);
await cp(path.join(projectRoot, 'paperaid', 'assets'), path.join(paperAidOutput, 'assets'), {
  recursive: true,
  force: true,
});
```

The existing final `versionHtmlFiles(outputRoot, versionMonetizationRuntime)` and
`ensureSeoMetadata(outputRoot)` steps can then process PaperAid too.

## scripts/validate-dist.mjs
Add:
- `paperaid/sitemap.xml` to `expectedChildren`
- `paperaid/index.html` to the required production files
- `paperaid/index.html` to the pages that must contain exactly one manual ad slot
- PaperAid manual/privacy/download pages should remain ad-free

## scripts/validate-revenue-ready.mjs
Add `paperaid/index.html` to:
- professional creator-support checks
- exactly-one-manual-ad checks

Add these to the ad-free list:
- `paperaid/download.html`
- `paperaid/quick-start.html`
- `paperaid/manual.html`
- `paperaid/privacy-policy.html`
- `paperaid/terms-of-service.html`
- `paperaid/support.html`

## Root sitemap.xml
Add:

```xml
<sitemap><loc>https://baisalya.com/paperaid/sitemap.xml</loc><lastmod>2026-09-24</lastmod></sitemap>
```

## Optional portfolio home update
Add PaperAid to the root SoftwareApplication structured-data list and software
cards once you want it visible on the main baisalya.com portfolio.

## Store links
Edit `paperaid/site-config.js` when the listings exist. Keep both URLs blank
until the official store pages are actually live.
