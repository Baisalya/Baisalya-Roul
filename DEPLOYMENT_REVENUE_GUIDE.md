# baisalya.com — Deployment & Revenue Guide

## Deployment
1. Push this repository to `Baisalya/Baisalya-Roul` on branch `main`.
2. GitHub → repository **Settings → Pages → Source: GitHub Actions**.
3. Set the Pages custom domain to `baisalya.com`.
4. In Spaceship DNS, point the apex (`@`) to GitHub Pages and `www` to `baisalya.github.io`.
5. After DNS validates in GitHub, enable **Enforce HTTPS**.
6. Every push to `main` now runs `.github/workflows/deploy-baisalya-pages.yml`, executes the full release gate and deploys `dist/`.

## Professional revenue model
The site intentionally avoids ad-heavy product pages.

### Immediately active
- Buy Me a Coffee support links on the professional site and every product homepage.
- Business/product inquiry links using `baishalya1999@gmail.com`.
- Existing store/download/product conversion links remain primary.

### AdSense-ready but OFF by default
Manual ad placements exist only on **EduSheet** and **SurveyCam**, where long-form informational content makes a restrained placement reasonable. DevDesk, ShopPilot, Construction ERP and NotiVault use support/inquiry monetization only.

`assets/monetization/config.js` ships with advertising disabled. No AdSense request is made until a real account is configured and the consent gate is explicitly enabled.

After AdSense approval and after you have a compliant consent solution:

```powershell
npm run adsense:configure -- --client=ca-pub-YOUR_REAL_ID --slot=YOUR_REAL_SLOT --consent-ready=true
npm test
npm run release
```

The configure command writes the real client/slot config and generates the root `ads.txt`. Never commit a fake publisher ID.

## Placement rules
- No ads in hero/navigation.
- No popups/interstitials.
- Maximum one manual ad placement on an eligible product homepage.
- NotiVault website has no ad slot to preserve its privacy-focused brand positioning.
- Business products prioritize demos/inquiries over ad revenue.
