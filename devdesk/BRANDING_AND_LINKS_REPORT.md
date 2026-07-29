# Branding and links report

Date: 2026-07-29

## Updated logo locations

### Portfolio

- `../index.html`
  - DevDesk featured project card.
  - Open Graph and structured application metadata.
- Vite production output receives optimized 256 and 512 pixel assets.

### DevDesk product and manual website

- `index.html`
- `downloads.html`
- `404.html`
- All generated pages under `manual/`
- `site.webmanifest`
- `sw.js`
- `tool/refresh_manual.dart`

### New assets

- `assets/img/devdesk-logo-master.png`
- `assets/img/devdesk-logo-16.png`
- `assets/img/devdesk-logo-24.png`
- `assets/img/devdesk-logo-32.png`
- `assets/img/devdesk-logo-48.png`
- `assets/img/devdesk-logo-64.png`
- `assets/img/devdesk-logo-128.png`
- `assets/img/devdesk-logo-192.png`
- `assets/img/devdesk-logo-256.png`
- `assets/img/devdesk-logo-512.png`

The old unreferenced `assets/img/devdesk-logo.png` was removed. Git history can
recover it. The application launcher, executable, taskbar, Start menu, splash,
and MSIX package icons were not changed because the application source is not in
this repository.

## Microsoft Store links added

- Portfolio DevDesk project card.
- DevDesk landing page primary action.
- DevDesk landing page Windows availability action.
- DevDesk footer.
- Downloads page Windows platform card.
- Downloads page footer.
- Global user manual.
- Downloads and installation manual.
- Settings and appearance manual.
- Generated manual navigation and search descriptions where relevant.

All use:

`https://apps.microsoft.com/detail/9N8NH1LMZX1S?hl=en-us&gl=IN&ocid=pdpshare`

External actions use a new tab with `noopener noreferrer` and accessible labels
where the action needs additional platform or new-tab context.

## Android closed-testing links and wording

- Portfolio DevDesk project card.
- DevDesk landing page.
- Downloads page.
- Global user manual.
- Getting started.
- Downloads and installation.
- Settings and appearance.
- Privacy and security.

Public tester email addresses were not added. The interface says to contact the
developer to join.

## External references added

- CommonMark specification:
  `https://spec.commonmark.org/current/`
- JSON standard, RFC 8259:
  `https://www.rfc-editor.org/info/rfc8259`
- HTTP semantics, RFC 9110:
  `https://www.rfc-editor.org/info/rfc9110`
- OpenAPI specification:
  `https://spec.openapis.org/oas/latest.html`
- Git documentation:
  `https://git-scm.com/doc`
- Microsoft Store app update guidance:
  `https://support.microsoft.com/en-us/accounts-billing/get-updates-for-apps-and-games-in-microsoft-store`
- Android Storage Access Framework:
  `https://developer.android.com/guide/topics/providers/document-provider`
- Open Knowledge Format v0.2 specification:
  `https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md`
