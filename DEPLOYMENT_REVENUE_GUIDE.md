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
AdSense is enabled **after** the release build, only in `dist/`, so the repository-safe source config remains disabled and protected product baselines stay stable.

The production workflow activates the approved AdSense client and responsive slot only when the repository variable `ADSENSE_CONSENT_READY` is explicitly `true`. A normal build keeps advertising disabled; there is no automatic post-build activation.

- Publisher/client: `ca-pub-1529558529658186`
- Responsive manual slot: `9546051599`

The workflow runs:

```powershell
npm run release
npm run adsense:configure -- --root=dist --client=ca-pub-1529558529658186 --slot=9546051599 --consent-ready=true
npm run test:dist
```

Keep advertising disabled until the consent/CMP setup has been verified. To stop production AdSense requests on the next deployment, create/set this GitHub Actions repository variable (or remove it):

`ADSENSE_CONSENT_READY=false`

Path: **Repository Settings → Secrets and variables → Actions → Variables**.

Before enabling production ads, verify the consent/CMP solution, including Google-certified TCF consent where required, through AdSense Privacy & messaging. Then set `ADSENSE_CONSENT_READY=true` and deploy again. This flag is an operator acknowledgement, not visitor consent. The configurator uses `autoAds: false`; the loader only runs on eligible pages with an explicit manual slot and excludes the homepage, downloads, legal/privacy/deletion/404 pages, NotiVault and BrightQuest Kids. Disable Auto Ads in the AdSense account as well to prevent automatic placements on otherwise eligible pages; that account setting is not controlled by this repository.

## Local production test
To test the fully activated output locally after your consent solution is ready:

```powershell
npm ci --prefix notivault-website
npm run release
npm run adsense:configure -- --root=dist --client=ca-pub-1529558529658186 --slot=9546051599 --consent-ready=true
npm run test:dist
```

Do not run the configurator against the repository source root. It intentionally refuses that target.
