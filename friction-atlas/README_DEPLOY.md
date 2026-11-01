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
1. Replace the placeholder contact wording in `privacy.html`, `terms.html`, and `support.html` with the exact public support/privacy email you will use in Play Console.
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
