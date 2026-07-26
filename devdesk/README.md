# DevDesk complete manual website

This folder is a dependency-free static website for GitHub Pages or any static host.

## Contents

- Landing page and platform download cards
- 41 detailed manual topics, including an expanded five-page API Studio section
- Responsive sidebar and table of contents
- Offline search index
- Dark/light theme
- Copy buttons for commands and examples
- Service worker for deployed offline caching
- Sitemap, robots file, 404 page, and web manifest

## Configure download links

Edit `assets/js/site-config.js`.

- Android currently points to the Google Play package ID and is labelled testing.
- Windows points to the latest GitHub release page.
- macOS is deliberately disabled until a signed/notarized package exists.

## Deploy with GitHub Pages

1. Create a public repository, for example `devdesk-manual`.
2. Copy the contents of this folder to the repository root.
3. In **Settings → Pages**, select **GitHub Actions** or deploy from the `main` branch root.
4. Update `robots.txt` and `sitemap.xml` if the repository name differs.
5. Open the deployed site in an incognito window and test search, theme, mobile navigation, and every download link.

## Local preview

```bash
python -m http.server 8080
```

Open `http://localhost:8080/`.

## Documentation basis

The site content was prepared from the uploaded DevDesk source, its bundled offline manuals, feature code, privacy boundaries, and the official Open Knowledge Format v0.2 specification. The API Studio section is synchronized with the uploaded 2026-07-26 project state and explicitly distinguishes visible controls from tested service-layer capabilities. Labels can change in later app versions, so update the relevant manual page when the UI changes.
