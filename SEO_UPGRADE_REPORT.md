# Baisalya.com SEO Upgrade — 2026-08-28

Baseline: deployed GitHub Pages artifact from commit `f8133bd096ee1583e098aa4c8a0afa0404f7b086`.

## Implemented

- Strengthened the homepage entity signals for **Baishalya Roul**, **Baisalya**, **Baishalya**, and **Baisalya Roul**.
- Added/expanded Schema.org JSON-LD for the portfolio and all primary software pages.
- Added dedicated `SoftwareApplication` entities for DevDesk, SurveyCam, ShopPilot ERP, Construction ERP, NotiVault, and EduSheet.
- Added a dedicated **SiteSnap** canonical landing page plus `SoftwareSourceCode` schema linking the GitHub project and SurveyCam.
- Added `ProfilePage`, `WebSite`, `ItemList`, `WebPage`, and `BreadcrumbList` structured data where appropriate.
- Improved product page titles/descriptions for exact-name and high-intent searches.
- Normalized Open Graph/Twitter metadata and absolute product images.
- Added strong author/publisher association back to Baishalya Roul / Baisalya.
- Added NotiVault and SiteSnap sitemap coverage and updated the root sitemap index.
- Added current `lastmod` only to pages/sitemaps actually changed by this upgrade.
- Normalized homepage internal product links to canonical directory URLs.
- Preserved existing 404 `noindex` behavior and existing site functionality.

## Validation

- JSON-LD parse check: PASS on all upgraded primary pages.
- XML parse check: PASS on root and product sitemaps.
- Local `href`/`src` integrity check on all upgraded primary pages: PASS (0 missing local references).

## Important

SEO can improve crawlability, entity understanding, relevance, and click-through potential, but no implementation can guarantee #1 rankings or “trending” placement. Ranking still depends on indexing, competition, backlinks/mentions, user demand, and time.

After deployment, submit `https://baisalya.com/sitemap.xml` in Google Search Console and request indexing for the homepage plus each primary product URL, especially `/sitesnap/`.
