# SurveyCam Website Integration

## Added
- `surveycam/` standalone product website
- `surveycam/index.html`
- `surveycam/privacy.html`
- `surveycam/support.html`
- `surveycam/styles.css` / `site.js`
- `surveycam/robots.txt` / `sitemap.xml`
- local SurveyCam logo and social preview assets

## Root website integration
- SurveyCam card now links to the dedicated website first.
- Google Play and GitHub remain available as secondary actions.
- Root title updated to current public Play Store naming: `SurveyCam - Location & Geo Tag`.

## Release integration
- Deterministic Node build now copies the SurveyCam runtime to `dist/surveycam/`.
- Dist validator requires SurveyCam production files.
- Dedicated SurveyCam source validation added to `npm test`.

## Source truth
Product claims are limited to the current Google Play listing and existing repository assets. No fictional release, customer, analytics, cloud, or backend claims were added.
