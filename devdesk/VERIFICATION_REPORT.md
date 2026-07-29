# Verification report

Date: 2026-07-29

Branch: `codex/devdesk-branding-manual-update`

## Passed automated checks

### Clean dependency installation

Command:

```powershell
npm ci
```

Result:

- Passed.
- 15 packages installed.
- 16 packages audited.
- 0 vulnerabilities.

### Dart formatting

Command:

```powershell
dart format --output=none --set-exit-if-changed `
  devdesk\tool\refresh_manual.dart `
  devdesk\tool\validate_site.dart
```

Result:

- Passed.
- 2 files checked.
- 0 formatting changes required.

### Manual regeneration

Command:

```powershell
dart --packages=C:\Users\baish\StudioProjects\devdesk\.dart_tool\package_config.json `
  devdesk\tool\refresh_manual.dart
```

Result:

- Passed.
- Global manual and 16 directly changed focused manuals refreshed.
- Shared branding and search content refreshed.
- Search index contains 42 entries.

The external package configuration supplies the already-installed Dart
`markdown` dependency. It is not used as application source and was not
modified.

### Static-site integrity

Command:

```powershell
dart --packages=C:\Users\baish\StudioProjects\devdesk\.dart_tool\package_config.json `
  devdesk\tool\validate_site.dart
```

Result:

- Passed.
- 46 HTML files verified.
- Local links, assets, fragments, IDs, encoding, search targets, external-link
  safety, branding, platform wording, and required global-manual anchors passed.

### Portfolio and production build

Command:

```powershell
npm run check
```

Result:

- Source release-content tests passed.
- Vite 8.1.5 production build passed.
- Production-output tests passed.
- DevDesk static runtime was copied into the production output.

Production outputs:

- `C:\Users\baish\Baisalya-Roul\dist\index.html`
- `C:\Users\baish\Baisalya-Roul\dist\assets\`
- `C:\Users\baish\Baisalya-Roul\dist\devdesk\index.html`
- `C:\Users\baish\Baisalya-Roul\dist\devdesk\downloads.html`
- `C:\Users\baish\Baisalya-Roul\dist\devdesk\manual\user-manual.html`

### Dependency audit

Command:

```powershell
npm audit --audit-level=moderate
```

Result:

- Passed.
- 0 vulnerabilities.

### Official external references

Command:

```powershell
curl.exe -L --max-time 30 -s -o NUL -w "%{http_code} %{url_effective}`n" <URL>
```

Result:

- Microsoft Store: HTTP 200.
- CommonMark specification: HTTP 200.
- JSON RFC 8259: HTTP 200.
- HTTP RFC 9110: HTTP 200.
- OpenAPI specification: HTTP 200.
- Git documentation: HTTP 200.
- Microsoft Store update guidance: HTTP 200.
- Android Storage Access Framework guidance: HTTP 200.

## Passed browser smoke tests

The production build was served locally with Vite Preview and tested in the
Codex in-app Chromium browser.

### Portfolio

- 1440 × 900 desktop.
- New DevDesk logo rendered at equal width and height without distortion.
- Supplied Microsoft Store URL was exact.
- New-tab link used `noopener noreferrer`.
- Accessible Store label was present.
- No horizontal overflow.
- No console warnings or errors.

### DevDesk landing page

- 1440 × 900 desktop.
- New brand logo rendered.
- All three Store links used the supplied URL.
- Windows Store and Android closed-testing wording appeared.
- No horizontal overflow.
- No console warnings or errors.

### Downloads

- 390 × 844 mobile.
- Windows Store card and Android closed-testing card rendered responsively.
- Android contact guidance was present without a public tester email address.
- No horizontal overflow.
- No console warnings or errors.

### Complete user manual

- 1440 × 900 desktop.
- 768 × 1024 tablet.
- 390 × 844 mobile.
- 360 × 640 narrow window.
- 844 × 390 landscape.
- No final horizontal overflow at any tested size.
- Mobile documentation drawer opened and reported `aria-expanded="true"`.
- Search opened with focus in the search input.
- Query `Microsoft Store` produced seven relevant results.
- Escape closed search.
- Theme control changed dark to light and back to dark.
- Desktop sidebar and table of contents remained readable.
- No console warnings or errors.

An initial mobile run found long inline URLs causing page-level overflow. The
CSS was corrected with safe wrapping and the complete viewport matrix was
rerun successfully.

## Screenshots

- `C:\Users\baish\Baisalya-Roul\deliverables\screenshots\portfolio-devdesk-desktop.png`
- `C:\Users\baish\Baisalya-Roul\deliverables\screenshots\devdesk-home-desktop.png`
- `C:\Users\baish\Baisalya-Roul\deliverables\screenshots\devdesk-downloads-mobile.png`
- `C:\Users\baish\Baisalya-Roul\deliverables\screenshots\devdesk-manual-desktop-dark.png`
- `C:\Users\baish\Baisalya-Roul\deliverables\screenshots\devdesk-manual-mobile-menu.png`

## Failed or superseded diagnostics

- A PowerShell `Invoke-WebRequest` batch reported an environment-side null
  object error for every URL. The same URLs were immediately retested with
  `curl.exe`; all returned HTTP 200.
- The first 390-pixel manual smoke test found horizontal overflow. This was a
  real issue, was fixed, and the final responsive matrix passed.

There are no unresolved failures in the static portfolio or DevDesk website
checks listed above.

## Skipped checks

The following were not run because the requested repository does not contain
the Flutter application source:

- `flutter analyze`
- Flutter unit, widget, integration, navigation, onboarding, and link-launch
  tests
- Android debug build
- Android release build
- Windows release build
- MSIX package generation
- In-app Settings, About, Help, splash, launcher, taskbar, executable, and
  package-icon verification
- Signed release installation

These are not reported as passed.

Exact 200% operating-system text scaling and real Android split-screen/freeform
window behavior were also not automatable in the available desktop browser.
The manual was verified at narrow viewports and uses wrapping, scrollable code
blocks/tables, responsive drawers, and scalable units, but those two physical
environment checks remain release-time manual gates.

## ZIP package verification

The final source state was packaged with Git archive so ignored build caches,
dependencies, credentials, and the `.git` directory are excluded.

- `portfolio-complete-source.zip`: complete tracked repository source.
- `portfolio-changed-files.zip`: 11 changed portfolio entries.
- `devdesk-static-site-complete.zip`: complete tracked DevDesk static site.
- `devdesk-static-site-changed-files.zip`: 94 changed DevDesk site entries.
- `portfolio-production-dist.zip`: deployable Vite production output.

Every ZIP was reopened with .NET `System.IO.Compression.ZipFile`, its entries
were enumerated successfully, and a SHA-256 checksum was generated. The final
values are stored beside the archives in `deliverables/SHA256SUMS.txt`.

No ZIP is labelled as the complete Flutter application. The application source
needed to produce that archive is outside the requested repository.

## Code-verified OKF documentation update

The later OKF documentation pass was verified read-only against the separate
Flutter source at `C:\Users\baish\StudioProjects\devdesk`.

Inspected implementation:

- `lib/features/okf/presentation/okf_dashboard_page.dart`
- `lib/features/okf/data/okf_workspace_service.dart`
- `lib/features/okf/domain/okf_validator.dart`
- `lib/features/okf/domain/okf_template_service.dart`
- `lib/features/okf/domain/okf_models.dart`
- `lib/features/okf/domain/okf_metadata.dart`
- `lib/app/router.dart`
- `lib/features/workspace_shell/domain/open_with_resolver.dart`
- OKF service and responsive widget tests

Command:

```powershell
flutter test `
  test\features\okf\okf_service_test.dart `
  test\features\okf\okf_dashboard_test.dart
```

Result:

- Passed.
- 27 OKF service and widget tests passed.
- Covered v0.2 validation, required versus optional findings, indexes, reserved
  files, reviewed conversion, legacy migration, sources, lifecycle, Attested
  Computation templates, 320-pixel Android width, wide Windows layout, and
  200% text scaling in a constrained window.

The Flutter repository already contained unrelated uncommitted branding and
platform changes. They were preserved; no Flutter source or app manual file was
modified during this website-only documentation update.

Website checks after rewriting all focused OKF pages:

- Six OKF HTML pages regenerated from Markdown.
- All six passed at 390 × 844 without horizontal overflow.
- Desktop Structure checks page passed at 1440 × 900.
- Search for `Create concept` returned the relevant OKF concept, structure,
  conversion, source, and global-manual results.
- No browser console warnings or errors.
- Full 46-page site validator and 42-entry search-index validator passed.
- Vite production build and production-output tests passed.
