Baisalya NotiVault Static SEO Hotfix — 2026-08-28

Run from repository root:

  node .\apply-notivault-static-seo-hotfix.mjs
  npm run release

What it fixes:
- Allows only application/ld+json script tags in NotiVault static HTML.
- Keeps executable JavaScript/module scripts forbidden.
- Preserves NotiVault JSON-LD in the production static export.
- Stops the release build from rewriting checked-in protected NotiVault HTML.
- Adds dist checks for structured data + no executable scripts.

No protected-product baseline refresh is required for this hotfix because only scripts/ files are changed.
