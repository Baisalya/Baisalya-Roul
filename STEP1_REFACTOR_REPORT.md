# Step 1 — Root Site Architecture & Protected Product Boundary

## Completed

- Introduced `src/site/` as the root professional website ownership boundary.
- Preserved `/index.html`, `/style.css`, and `/main.js` as stable public entrypoints.
- Quarantined the existing root runtime and CSS for later decomposition without changing product sites.
- Extracted the root Buy Me a Coffee component CSS out of inline HTML.
- Added automated boundary validation.
- Kept all dedicated software/product website directories unchanged.

## Protected product surfaces

`devdesk/`, `construction-erp/`, `EduSheet/`, `notivault-website/`, `shoppilot erp/`, and `shoppilot-erp/`.

## Validation

Run `npm test` for the boundary contract plus existing release-content checks. The production build remains `npm run build` and is intentionally not structurally changed in Step 1.
