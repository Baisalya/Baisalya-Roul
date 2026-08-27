# Batch D — Steps 11 + 12

## Build pipeline hardening

- Replaced the root Vite hook pipeline with a deterministic Node.js release builder (`scripts/build-release.mjs`).
- Root `vite.config.js` and root Vite dependency were removed; product-internal build tooling was not changed.
- Build output is cleaned before each release build, preventing stale files from surviving into `dist/`.
- Root runtime files/assets and product outputs have explicit copy contracts.
- Added EduSheet to the production output contract; it was linked from the root site but was not explicitly copied by the former Vite hook.
- Preserved the real NotiVault build/export path. Release build fails fast when its dependencies are not installed instead of emitting an incomplete subsite.
- Preserved the root NotiVault preview path by copying its `public/` assets into the generated static output.
- Added a deterministic SHA-256 `dist/release-manifest.json`.

## Final release gate

- Added `scripts/validate-batch-d.mjs`.
- Added `scripts/validate-release-preflight.mjs`.
- Added `scripts/validate-protected-products.mjs` and a 419-file protected-product SHA-256 baseline.
- Expanded `validate-dist.mjs` to recursively validate HTML/CSS/JS local references and release-manifest hashes.
- `npm run release` now means: source tests → dependency preflight → clean build → dist validation.
- `npm run build:plan` validates the release source/copy plan without requiring product dependencies.

## Protected software websites

The source content under DevDesk, Construction ERP, EduSheet, NotiVault, `shoppilot erp`, and `shoppilot-erp` is not modified by Batch D.

## Validation results

- `npm test`: PASS.
- `npm run build:plan`: PASS.
- Protected product integrity: PASS (419/419 files).
- JavaScript syntax checks for Batch D build/validation scripts: PASS.
- Release dependency preflight: correctly BLOCKED in this offline workspace because `notivault-website/node_modules` is not installed. The required production command is `npm ci --prefix notivault-website` before `npm run release`.
- No protected product source file was changed.

The release gate is intentionally fail-closed: it will not emit a knowingly incomplete NotiVault deployment.
