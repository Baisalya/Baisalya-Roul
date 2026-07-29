# Changed files report

Branch: `codex/devdesk-branding-manual-update`

Date: 2026-07-29

## Discovered projects

### Portfolio website

Path: `C:\Users\baish\Baisalya-Roul`

Build system: Vite and npm.

### DevDesk product, downloads, and manual website

Path: `C:\Users\baish\Baisalya-Roul\devdesk`

Build system: static HTML/CSS/JavaScript with Dart-based manual generation and
validation.

### DevDesk application source

No Flutter application source was found inside the requested repository. There
is no `pubspec.yaml`, `lib/`, `android/`, or `windows/` tree here. Consequently,
no application package identity, in-app UI, platform launcher icon, MSIX, APK,
or Flutter test file was changed.

## Portfolio website changes

- `.gitignore`
  - Ignores generated release deliverables.
- `index.html`
  - New DevDesk logo, accurate product copy, structured metadata, Microsoft
    Store action, global manual action, and Android closed-testing status.
- `style.css`
  - Responsive DevDesk card, accessible focus styles, availability text, and
    Store action styling.
- `easter-egg.js`
  - Module-safe callbacks for production bundling.
- `package.json`
- `package-lock.json`
  - Vite 8.1.5, reproducible tests, production build, and zero-audit dependency
    state.
- `vite.config.js`
  - Copies the complete DevDesk runtime site into the portfolio production
    output.
- `scripts/validate-release.mjs`
- `scripts/validate-dist.mjs`
  - Source and production-output release checks.

## DevDesk product and downloads website changes

- `devdesk/index.html`
- `devdesk/downloads.html`
- `devdesk/404.html`
- `devdesk/README.md`
- `devdesk/assets/css/styles.css`
- `devdesk/assets/js/app.js`
- `devdesk/assets/js/site-config.js`
- `devdesk/assets/js/search-index.js`
- `devdesk/site.webmanifest`
- `devdesk/sitemap.xml`
- `devdesk/sw.js`

These files now use the new branding, the supplied Microsoft Store URL, explicit
Windows availability, Android closed-testing status, safe external-link
handling, responsive layouts, and global-manual navigation.

## DevDesk logo assets

Added:

- `devdesk/assets/img/devdesk-logo-master.png`
- `devdesk/assets/img/devdesk-logo-16.png`
- `devdesk/assets/img/devdesk-logo-24.png`
- `devdesk/assets/img/devdesk-logo-32.png`
- `devdesk/assets/img/devdesk-logo-48.png`
- `devdesk/assets/img/devdesk-logo-64.png`
- `devdesk/assets/img/devdesk-logo-128.png`
- `devdesk/assets/img/devdesk-logo-192.png`
- `devdesk/assets/img/devdesk-logo-256.png`
- `devdesk/assets/img/devdesk-logo-512.png`

Removed because it was no longer referenced:

- `devdesk/assets/img/devdesk-logo.png`

## Documentation source changes

Added:

- `devdesk/content/user-manual.md`

Updated:

- `devdesk/content/getting-started.md`
- `devdesk/content/downloads-installation.md`
- `devdesk/content/settings-appearance.md`
- `devdesk/content/privacy-security.md`
- `devdesk/content/developer-workspaces.md`
- `devdesk/content/faq.md`

Generated output:

- All 46 HTML files under `devdesk/manual/` were regenerated to use the new
  logo, global-manual navigation, safe external links, current platform copy,
  and refreshed source content.
- `devdesk/manual/user-manual.html` is the new complete global manual.
- `devdesk/manual/index.html` now directs readers to the global manual.

## Documentation and release reports

- `CHANGED_FILES_REPORT.md`
- `devdesk/BUILD_REPORT.md`
- `devdesk/BRANDING_AND_LINKS_REPORT.md`
- `devdesk/DOCUMENTATION_COVERAGE_MATRIX.md`
- `devdesk/FEATURE_INVENTORY.md`
- `devdesk/MANUAL_TABLE_OF_CONTENTS.md`
- `devdesk/VERIFICATION_REPORT.md`
- `devdesk/WINDOWS_RELEASE_UPDATE.md`

## Manual tooling changes

- `devdesk/tool/refresh_manual.dart`
  - Generates the complete manual, refreshes focused manuals, navigation,
    branding, external-link safety, and the 42-entry search index.
- `devdesk/tool/validate_site.dart`
  - Verifies 46 HTML pages, local assets, fragments, IDs, encoding, search
    targets, Store URL, platform copy, external-link safety, and manual
    coverage anchors.

## Preserved pre-existing work

The worktree was already modified when this task began. Existing edits in the
following areas were preserved and incorporated rather than reset:

- `devdesk/assets/js/search-index.js`
- `devdesk/content/developer-workspaces.md`
- `devdesk/content/faq.md`
- Related generated manual pages for API Workspaces, developer workspaces, Git,
  FAQ, getting started, interface tour, graph, knowledge workspace, OKF,
  project structure, troubleshooting, and unified search.

No force checkout, reset, or unrelated deletion was used.

## Later code-verified OKF documentation update

The following website sources were rewritten again after read-only inspection of
the external Flutter OKF implementation:

- `devdesk/content/user-manual.md`
- `devdesk/content/structured-knowledge-okf.md`
- `devdesk/content/okf-bundle-structure.md`
- `devdesk/content/okf-concepts-metadata.md`
- `devdesk/content/okf-conversion-migration.md`
- `devdesk/content/okf-trust-sources-lifecycle.md`
- `devdesk/content/okf-attested-computation.md`

Matching HTML pages and the search index were regenerated. The manual generator
now explicitly regenerates all six focused OKF pages. Feature inventory,
coverage matrix, build report, and verification report were updated with the
code and test evidence.
