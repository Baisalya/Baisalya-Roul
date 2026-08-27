# Baisalya Release Hotfix — 2026-08-28

This hotfix repairs the CI/release contract after the SEO + navigation + professional ad expansion.

## What it fixes

- Replaces brittle professional-home checks with JSON-LD-aware alias checks.
- Keeps SEO-clean canonical `/product/` routes instead of reverting to `index.html` links.
- Scopes the legacy “portfolio” rejection to visible body content, so SEO metadata is not falsely rejected.
- Adds a visible SiteSnap internal link from the root professional home.
- Includes `sitesnap/` in the production release build.
- Copies `notivault-website/sitemap.xml` into `dist/`.
- Keeps protected ShopPilot source files unchanged and injects one restrained ad into the three production ShopPilot content pages during the build.
- Updates source revenue validation for the new professional manual-ad policy.
- Keeps source AdSense config disabled (safe/CI-friendly) and activates the real publisher/slot only in `dist` after the consent gate.
- Refreshes `release-manifest.json` after production AdSense activation so `test:dist` remains valid.
- Extends dist validation to SiteSnap, NotiVault sitemap, canonical product links, and representative ad/ad-free pages.

## Apply

From the repository root:

```powershell
node .\apply-release-hotfix.mjs
npm ci --prefix notivault-website
npm run release
```

Then review `git diff` and commit the changes.

## AdSense production activation

The workflow uses the approved public values:

- `ca-pub-1529558529658186`
- slot `9546051599`

Ads remain disabled unless the GitHub Actions repository variable below is set after a compliant consent/CMP setup is ready:

`ADSENSE_CONSENT_READY=true`

The workflow then activates AdSense only in `dist/`, never in the checked-in source config.
