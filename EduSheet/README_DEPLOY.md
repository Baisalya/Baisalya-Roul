# EduSheet Static Website — Deployment

This website is intentionally **100% static**: HTML + CSS + vanilla JavaScript only. No backend, database, npm, build step or server-side framework is required.

## Before publishing
1. Open `assets/js/site.js`.
2. Set `googlePlayUrl` to the official Google Play listing.
3. Set `microsoftStoreUrl` to the official Microsoft Store listing.
4. Verify `supportEmail`.
5. Open `privacy.html` and replace every square-bracket legal placeholder.
6. Confirm `sitemap.xml` keeps the production origin `https://baisalya.com/EduSheet/`.
7. Re-check the privacy wording against the exact release APK/MSIX and all third-party SDK behavior.

## GitHub Pages
Upload the contents of this folder to a repository and enable Pages for the branch/folder containing `index.html`. All links are relative, so the site works under a project path such as `username.github.io/repository/`.

## Other static hosting
The same folder can be uploaded directly to Netlify, Cloudflare Pages, Firebase Hosting, S3/static hosting, or a normal cPanel/public_html directory. No build command is required.

## Language switch
English/Hinglish selection is stored locally in the browser with `localStorage`. No language preference is sent anywhere.
