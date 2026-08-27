# Batch C — Steps 8, 9, 10

## Step 8 — baisalya.com SEO and identity

- Added canonical `https://baisalya.com/` identity.
- Added robots, author, theme-color, Open Graph, and Twitter metadata.
- Added Schema.org `Person` + `WebSite` JSON-LD using only verified identity/capability information.
- Added `robots.txt` and `sitemap.xml` for the root professional website.
- Added dedicated BR favicon, Apple touch icon, and 1200×630 social card assets.

## Step 9 — Contact and conversion architecture

- Preserved the existing FormSubmit endpoint and spam honeypot.
- Added a clearer distinction between product questions and new software requirements.
- Added platform context without adding a backend or new dependency.
- Added bounded form inputs and explicit guidance against sending secrets.
- Preserved existing product/service selector values required by release checks.

## Step 10 — Easter egg isolation

- Removed the debug-game DOM from initial HTML.
- Removed the eager `easter-egg.js` script and eager easter-egg stylesheet from the main cascade.
- Added a low-priority footer Developer mode trigger.
- The game runtime and CSS now load only after explicit activation.
- Added proper dialog semantics, Escape close, focus restoration, reduced-motion behavior, and game-loop cancellation when closed.

## Protected product websites

No product-site implementation files are intentionally modified by Batch C. Byte-for-byte regression comparison is performed before packaging.

## Validation

- `npm test`: PASS.
- Root site ownership boundary: PASS.
- Professional home contract: PASS.
- Batch B architecture contract: PASS after superseding its stale eager-easter stylesheet requirement.
- Batch C SEO/contact/easter isolation contract: PASS.
- Existing release-content contract: PASS.
- Root duplicate IDs: 0.
- Missing root local references: 0.
- JSON-LD parses with Person and WebSite graph entries.
- Protected product directories: 419 files compared, 0 changed, 0 missing, 0 added.
- JavaScript syntax checks: PASS.
- `npm run build`: not executable in this environment because the `vite` binary is not installed (`vite: not found`). No dependency was added or changed.

