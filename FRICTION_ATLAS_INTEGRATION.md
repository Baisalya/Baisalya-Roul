# Friction Atlas and ambassador integration

Completed locally on 1 November 2026.

- Added Friction Atlas to the portfolio navigation, release-preparation cards and software discovery metadata.
- Included the complete Friction Atlas website, assets and sitemap in the production release builder.
- Added responsive ambassador sections after the hero on the portfolio and all ten product homepages. Existing product portraits retain their individual outfits and app logos; Friction Atlas uses a new mint-blazer portrait.
- Kept Friction Atlas explicitly **Not released yet** in website text, portfolio copy, metadata descriptions and download configuration. Both store links remain empty and download controls are unavailable.
- Created evergreen artwork with Android/Google Play and Windows/Microsoft Store branding. Release status is not baked into either image, so artwork can remain after launch.
- Optimized campaign JPEGs to approximately 100–125 KB each. The original social-preview PNGs remain available for link crawlers.
- Fixed tablet navigation spacing and a pre-existing decorative NotiVault overflow found during responsive checks.
- Reviewed the existing EduSheet mobile/planner source differences and aligned their protected manifest entries without modifying those pages for this task.

## Generated assets

- `friction-atlas/assets/img/brand/ambassador-mint-v1.png` — generated portrait source.
- `friction-atlas/assets/img/brand/ambassador-mint-v1.jpg` — optimized website portrait.
- `assets/social/friction-atlas-ambassador-v2.png` — 1200 × 630 evergreen link preview.
- `friction-atlas/AMBASSADOR_ASSETS.json` — exact built-in ImageGen prompts and artwork policy.
- `deliverables/friction-atlas/desktop-banner.jpg` and `mobile-banner.jpg` — browser QA screenshots.

## Validation

- `npm test` passed, including all existing source checks and the new Friction Atlas/campaign validator.
- `node scripts/build-release.mjs` passed.
- `npm run test:dist` passed: local references, canonical URLs, sitemaps, release hashes, social-preview dimensions and campaign/download states.
- `npm run release:preflight` passed.
- Protected source integrity (398 files), mobile interaction regressions and `git diff --check` passed after final edits.
- Checked all eleven homepages at 390, 768, 1024 and 1440 px. Resolved the NotiVault overflow and repeated the affected phone/tablet checks successfully.
- Browser-verified both Friction Atlas store controls remain disabled with no public installer link.

## Publishing

This repository publishes baisalya.com through the `Deploy baisalya.com` GitHub Actions
workflow on pushes to `main`. The workflow builds and validates the complete website
before deploying its `dist/` artifact to GitHub Pages. `.openai/hosting.json` belongs to
the separate ShopPilot hosted Site and is not used by that GitHub Pages deployment.
The root hosting identity and Git remote configuration were preserved.

## At app release

Add the actual Google Play and Microsoft Store URLs in
`friction-atlas/assets/js/site-config.js`. Update release notices, portfolio status,
metadata descriptions and release assertions to reflect the actual release. The image
assets can stay unchanged. Shared campaign copy is maintained in
`scripts/ambassador-campaigns.mjs`; run `node scripts/prepare-ambassador-campaigns.mjs`
after editing it, including the equivalent NotiVault JSX section when its copy changes.
