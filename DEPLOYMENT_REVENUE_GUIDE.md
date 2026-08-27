# baisalya.com — Deployment & Revenue Guide

## Deployment
1. Push this repository to `Baisalya/Baisalya-Roul` on branch `main`.
2. GitHub → repository **Settings → Pages → Source: GitHub Actions**.
3. Keep the Pages custom domain set to `baisalya.com` and **Enforce HTTPS** enabled after DNS validation.
4. Every push to `main` runs `.github/workflows/deploy-baisalya-pages.yml`, validates the source contract, builds `dist/`, validates production output, and deploys the Pages artifact.

## Professional revenue model
The main Baisalya professional home stays ad-free. Product advertising is restrained to useful content pages; legal/privacy/deletion/404 surfaces and NotiVault stay ad-free.

### Manual ad policy
- Maximum one manual responsive ad placement per eligible page.
- No ads inside hero/navigation or as popups/interstitials.
- DevDesk documentation, Construction ERP content, EduSheet content, SurveyCam content, SiteSnap, and selected ShopPilot content may carry one manual placement.
- ShopPilot source files are protected; its ad is injected into the production copy during `build-release.mjs`.
- NotiVault remains intentionally ad-free to preserve its privacy-first positioning.

### AdSense source safety
`assets/monetization/config.js` is intentionally committed with advertising disabled and contains no publisher ID. This is the repository-safe default and must stay that way.

The approved public identifiers are:
- Publisher/client: `ca-pub-1529558529658186`
- Responsive manual slot: `9546051599`

`ads.txt` contains the matching publisher record.

### Production activation
AdSense is enabled **after** the release build, only in `dist/`, so source validation and protected product baselines remain stable.

Before enabling the deployment gate, configure a compliant consent/CMP solution for regions where consent is required. Then create this GitHub Actions repository variable:

`ADSENSE_CONSENT_READY=true`

Path: **Repository Settings → Secrets and variables → Actions → Variables**.

On the next push to `main`, the workflow runs:

```powershell
npm run release
npm run adsense:configure -- --root=dist --client=ca-pub-1529558529658186 --slot=9546051599 --consent-ready=true
npm run test:dist
```

If `ADSENSE_CONSENT_READY` is absent or not `true`, deployment still succeeds but the checked-in disabled config remains in `dist`, so no AdSense request is made.

## Local production test
To test the fully activated output locally after your consent solution is ready:

```powershell
npm ci --prefix notivault-website
npm run release
npm run adsense:configure -- --root=dist --client=ca-pub-1529558529658186 --slot=9546051599 --consent-ready=true
npm run test:dist
```

Do not run the configurator against the repository source root. It intentionally refuses that target.
