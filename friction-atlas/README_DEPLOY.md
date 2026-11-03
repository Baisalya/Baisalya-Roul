# Friction Atlas static website

Deployment-ready static site for **Friction Atlas: Habits & Focus**. No build tool, npm package, framework, database, analytics SDK or external font is required.

## Pages
- `index.html` — marketing home
- `bots.html` — Friction Bot collection + interactive mood preview
- `manual.html` — searchable user manual
- `download.html` — Android + Windows release cards
- `privacy.html` — app + website privacy policy baseline
- `terms.html` — terms & conditions baseline
- `support.html` — troubleshooting + FAQ

## Add the real download links
Edit only `assets/js/site-config.js`:

```js
androidUrl: "YOUR_GOOGLE_PLAY_URL",
windowsUrl: "YOUR_WINDOWS_URL",
```

When the URL is empty, the website intentionally shows the buttons as unavailable instead of sending users to a fake link.

## Deploy to baisalya.com/friction-atlas/
Copy this folder into your GitHub Pages repository as `friction-atlas/` and commit/push. All page/assets links are relative and work from a subdirectory.

If deploying at the domain root instead, copy the contents to the root. Update the absolute URLs in `robots.txt` and `sitemap.xml` to match the final public location. Preserve your existing `CNAME` file if your GitHub Pages repo already uses one.

## Before Play Store submission
1. Confirm `baishalya1999@gmail.com` is also the public support/privacy email used in Play Console. The site now names Baishalya Roul and uses the contact channel published on baisalya.com.
2. Verify every permission disclosure still matches the shipping app build.
3. Add the final Google Play URL to `site-config.js`.
4. If the enhanced Accessibility-based short-form feature is removed from the Play build, update the manual/privacy page so the website does not advertise a feature that is not shipped.
5. Legal pages are a product baseline and should be reviewed for jurisdiction-specific requirements before commercial launch.

## Brand
Tagline: **Understand your habits. Find your focus.**
Marketing line: **Habits don’t fail randomly.**
Core positioning: **Track the obstacle, not the streak.**


## Portfolio integration (1 November 2026)

The root release builder now includes `/friction-atlas/`, its assets and sitemap.
The portfolio navigation and release-preparation card link to the product website.
Android and Windows are **not released yet**; both store URLs remain empty.

The ambassador portrait and social preview are evergreen: do not bake release
status into image pixels. Keep `Not released yet` / `Coming soon` in editable HTML
and configuration. After release, update `assets/js/site-config.js`, release copy,
portfolio status and social descriptions together. The artwork can stay unchanged.

Campaign source: `scripts/ambassador-campaigns.mjs`; shared styles:
`assets/brand/ambassador.css` at the repository root. Run
`node scripts/prepare-ambassador-campaigns.mjs` after changing shared campaign copy.
The release builder also applies campaigns to generated pages, including NotiVault.
ImageGen prompts are recorded in `AMBASSADOR_ASSETS.json`.

## App feature alignment — 2 November 2026

The product pages now describe app 1.11.0+17: weekly routine/history, focus and separate breaks, selected-app Focus guard, sensor/manual walking, contextual tiny bots, version-aware rating prompts and developer/support links. The homepage includes an interactive companion-state preview and planned INR Pro pricing (₹30/month, ₹199/year, ₹2,999 lifetime). Collectible bots can be bought individually; future Pro Lifetime includes all catalog bots.

Developer: Baishalya Roul. Official website: https://baisalya.com/. Coffee support: https://www.buymeacoffee.com/baisalya (the link published on the official homepage). Coffee support is voluntary and grants no app entitlement. Links use ordinary navigation, with no payment widget embedded.

Privacy/manual/support now distinguish Enhanced tracking from the separate screen-content-disabled Focus guard service, cover walking activity access and explain optional receipt verification. Store URLs remain empty and downloads unavailable. These local source changes do not publish the website or enable app billing.

Validate from the repository root with `npm test`, `node scripts/build-release.mjs`, `npm run test:dist` and `npm run release:preflight`. The source is the `friction-atlas/` folder; `dist/` is generated output. The root `.openai/hosting.json` remains the unrelated ShopPilot identity described above.

### App 1.12.0+18 alignment

The manual now has 16 sections, including Android app visits and per-visit observed items. First-install consent, bundled English documents, unknown historical counts, partial coverage, local timestamp retention and JSON backup limits are documented consistently across the manual, privacy and terms pages. Store readiness is unchanged. Source tests, production build, distribution tests and release preflight passed locally; no publication occurred.

### Current checkpoint — 3 November 2026

The current app source is 1.14.0+20. The upcoming release includes all app features without a subscription and sells only optional permanent bots. Future INR30 monthly, INR199 yearly and INR2999 lifetime products are inactive Play drafts. Lifetime includes all catalog bots; monthly/yearly do not. The four India-only bot Buy options are active at INR19/29/39/49. The app itself has not been submitted or released.

Android Quick Settings Off/On was exercised on the physical phone with 1.13.0+19. Source 1.14 adds Settings > Your companion > Floating bot size, with a preview, remembered 100%-250% size and Reset to tiny. Artwork keeps its proportions and expanded controls stay compact. Supplied image assets are not rigged 3D models. Android 1.14 build/install/live size testing remains pending because automatic approval review blocked the release/QA build command; Play draft and phone remain at 1.13.0+19.

The Friction Atlas bot entitlement backend was separately pushed/deployed and stays fail-closed for future Pro products. Website source tests, production build, distribution checks and diff checks pass. These website changes remain local and unpublished; do not use the unrelated root hosting identity to deploy them.

### App 1.15.0+21 source alignment

Original artwork remains the default. Optional 3D characters now use five original geometric mesh models, perspective projection, lighting, articulated poses and reduced-motion support on Windows and Android. Explore demo shows all bot content with isolated sample interactions; it never changes actual habits, permissions or purchase ownership. Practice focus/walk controls are explicitly simulated. No reviewer backdoor, fake purchase receipt or persistent entitlement is added.

The source is tested locally; signed Android build/install and Play submission depend on completing the manual build handoff. The public release remains unavailable. All three Pro products remain inactive drafts; current checkout offers only optional bots. The confirmed intended audience is 13+.
