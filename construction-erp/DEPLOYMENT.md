# Free hosting deployment

## GitHub Pages

1. Edit `site.config.json` with real public values.
2. Create a GitHub repository and upload this project.
3. In **Settings → Pages**, select **GitHub Actions** as the source.
4. Push to `main`. The included workflow builds, validates, and deploys `dist`.
5. In Pages settings, enable **Enforce HTTPS**.

Project-page URLs such as `https://username.github.io/repository` are supported because all website assets and navigation use relative paths.

## Cloudflare Pages

- Connect the repository.
- Build command: `python3 scripts/build_site.py`
- Output directory: `dist`
- Production branch: `main`

The included `src/_headers` file adds security and cache headers on Cloudflare Pages.

## Netlify

Connect the repository. `netlify.toml` already defines the build command and `dist` output.

## Large application files

Do not place large `.aab`, `.apk`, `.msix`, or `.exe` files in the website folder. Publish Android through Google Play, Windows through Microsoft Store, and optional signed installers through GitHub Releases or another verified release host. Put those HTTPS links in `site.config.json`.

## Custom domain

After the host is working, add the custom domain in the host dashboard, enable HTTPS, update `siteUrl`, rebuild, and verify `robots.txt`, `sitemap.xml`, canonical URLs, Privacy Policy, Support, and Account Deletion pages.
