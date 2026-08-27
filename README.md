# Baisalya Hero + AdSense Final Fix — 2026-08-28

This patch is designed for the current `Baisalya/Baisalya-Roul` main-branch structure.

## What it changes

### Homepage hero
- Replaces the oversized sentence-style H1 with a compact two-line identity:
  - `Baishalya Roul`
  - `(Baisalya)`
- Adds a concise professional product tagline.
- Reduces desktop hero H1 from the previous very large 6.15rem ceiling to a balanced 4.9rem ceiling.
- Reduces hero minimum height, visual-card size, grid gap, and mobile scaling.
- Keeps the main name + Baisalya alias in the H1 for entity/brand SEO.

### AdSense production activation
- Repository source `assets/monetization/config.js` remains OFF.
- GitHub Pages `dist/` activates:
  - client: `ca-pub-1529558529658186`
  - slot: `9546051599`
- Production activation is ON by default.
- To pause ads, set GitHub Actions repository variable:
  `ADSENSE_CONSENT_READY=false`
- Existing ad-free policy is unchanged for main portfolio, NotiVault, legal/privacy/deletion and 404 pages.
- Existing manual ad placements remain controlled; Auto Ads do not need to be enabled.

## Apply

From repository root:

```powershell
node .\apply-hero-ads-final-fix.mjs
npm run test:professional-home
npm run test:revenue-ready
npm run release
```

If all pass:

```powershell
git add -A
git commit -m "Refine homepage hero and activate production AdSense"
git push origin main
```

## Consent note
Keep a Google-certified consent/CMP solution configured for regions where consent is required. If it is not ready, set `ADSENSE_CONSENT_READY=false` before deploying.
