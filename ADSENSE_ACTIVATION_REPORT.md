# Baisalya.com AdSense Activation Report

Date: 2026-08-28

## Configured AdSense unit
- Publisher client: `ca-pub-1529558529658186`
- Responsive ad slot: `9546051599`
- Central config: `assets/monetization/config.js`
- AdSense account declaration already present on the portfolio homepage.
- Root `ads.txt` already matches publisher `pub-1529558529658186`.

## Serving model
Ads are enabled through the existing centralized lazy-loading runtime. The Google AdSense library is not duplicated in every HTML file; it is loaded only when a configured manual placement is approached in the viewport.

Configured placement count: **69 pages**
- DevDesk: 53
- Construction ERP: 5
- EduSheet: 5
- ShopPilot ERP: 3
- SurveyCam: 2
- SiteSnap: 1
- NotiVault: 0 (kept ad-free)
- Main Baisalya portfolio: 0 (kept ad-free)

Legal/privacy/deletion/404 pages remain ad-free under the existing professional placement policy.

## Navigation validation
All **84/84 software HTML pages** retain a visible route back to `Baisalya.com`.

## Validation
- AdSense config client/slot: PASS
- `ads.txt` publisher: PASS
- 69 monetized pages include the centralized config/runtime: PASS
- Ad policy exclusions: PASS
- 84/84 software pages link to Baisalya.com: PASS
- `config.js` JavaScript syntax: PASS
- `monetization.js` JavaScript syntax: PASS
- Release manifest SHA-256 integrity: PASS

## Consent / privacy note
The website-side activation flag is enabled so ads can serve when Google allows the account/site/ad unit to serve. This package does **not** create or configure an AdSense Privacy & Messaging / certified CMP message. If visitors can come from the EEA, UK, or Switzerland, configure an appropriate Google-certified CMP/privacy message in AdSense before relying on personalized advertising there.
