# baisalya.com

Baishalya Roul's software website, product documentation and practical workflow guides.

Public profile URLs and the owner's search/AdSense preferences are recorded in [CONTACT_CHANNELS.md](CONTACT_CHANNELS.md). This maintenance note is excluded from production output.

## Content and advertising

The homepage links directly to five worked guides. Short DevDesk references include reproducible examples and troubleshooting; PaperAid is publicly released on Android through Google Play and on Windows through Microsoft Store.

Advertising is limited to the nine long-form manuals selected in scripts/ad-placement-policy.mjs. Product, download, support, legal and short reference pages stay ad-free. The source normalizer and release builder apply the same policy; the browser runtime also requires an exact page-path marker. Repository advertising configuration remains disabled. Public publisher identifiers and enabled configuration do not establish AdSense approval or consent compliance.

## Homepage app promos

Add web-ready media to `assets/app-promos/<app-name>/` and commit the files. The normal release build adds them to the homepage playlist automatically. Use the product route name such as `paperaid`, `surveycam`, or `edusheet` to link a promo to its app page. Videos play first, followed by images. Numbered filenames set the order within each app and supply the display titles.

Use MP4 (H.264/AAC), WebM, or compatible M4V for video, and AVIF, GIF, JPEG, PNG, or WebP for images. To give `01-demo.mp4` a preview frame, put `01-demo.poster.webp` beside it. Videos without a poster get an app-name preview automatically. Poster files do not become playlist items.

## Build and validate

Requires Node.js 20 or newer. Run:

~~~powershell
npm ci --prefix notivault-website
npm run release
~~~

The release command validates sources, builds dist/ with advertising disabled and validates assets, links, sitemaps, release hashes, content discovery and PaperAid release metadata. The production workflow enables manual advertising only when ADSENSE_CONSENT_READY is explicitly true. GitHub Pages deploys that output on pushes to main through .github/workflows/deploy-baisalya-pages.yml.

After editing guide source or ad selection:

~~~powershell
npm run content:prepare
npm run test:content-quality
~~~

Protected product edits require reviewing their diff and refreshing scripts/protected-product-manifest.json with npm run protected:refresh before release validation. DevDesk manual Markdown and generated HTML should be updated together using devdesk/tool/refresh_manual.dart in a Dart environment with the html and markdown packages available.

See [the deployment guide](DEPLOYMENT_REVENUE_GUIDE.md) for production configuration and consent requirements. Content improvements do not guarantee an AdSense approval; the account's review process remains separate.
