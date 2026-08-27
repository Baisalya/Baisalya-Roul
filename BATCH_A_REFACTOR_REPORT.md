# Batch A Refactor Report — Steps 2 + 3 + 4

## Completed

### Step 2 — Professional information architecture
- Replaced the résumé/portfolio-style navigation with Home / About / Software / Engineering / Contact.
- Removed the generic percentage skill showcase from the root page.
- Removed unverifiable placeholder project cards and `href="#"` demo links.
- Reframed education as compact background context rather than a long résumé timeline.

### Step 3 — Hero + brand system
- Rebuilt the hero around Baishalya Roul as a software builder, not a portfolio template.
- Added a restrained BR brand lockup, professional headline, two clear CTAs, and an engineering-focus proof row.
- Added a software-builder visual that references the real product ecosystem without inventing metrics.
- Retained light/dark theme controls and the existing public JS/CSS entrypoints.

### Step 4 — Software ecosystem
- Replaced generic project cards with a verified software index.
- Surfaced DevDesk, ShopPilot, Construction ERP, NotiVault, EduSheet, and SurveyCam.
- Preserved current release truth: ShopPilot Private Preview, Construction ERP / NotiVault Coming Soon, DevDesk public store links, SurveyCam Google Play.
- Kept every dedicated product website untouched.
- Added `src/site/content/SOFTWARE_CATALOG.md` as the root-page content truth contract.

## Validation added
- `scripts/validate-professional-home.mjs`
- Rejects stale portfolio identity, placeholder project names, and placeholder `href="#"` links.
- Requires the new professional sections and verified product routes.

## Deferred by plan
- Deep engineering capability architecture: Batch B / Step 5.
- Runtime/interaction decomposition and performance cleanup: Batch B / Step 6.
- Full design-system decomposition and responsive hardening: Batch B / Step 7.
- Domain SEO/schema work: Step 8.
- Contact conversion refactor: Step 9.
- Easter egg isolation: Step 10.

## QA results
- `npm test`: PASS
  - Root site ownership boundary: PASS
  - Professional home information architecture: PASS
  - Existing release-content contract: PASS
- JavaScript syntax checks for root/site validators/runtime: PASS
- Root HTML duplicate IDs: none
- Root local references: none missing
- Protected product directories: 419 files byte-for-byte identical to the Step 1 baseline
- `npm run build`: not executable in this offline environment because the Vite binary/package is not installed in the snapshot (`vite: not found`). No dependency version was changed or added.
