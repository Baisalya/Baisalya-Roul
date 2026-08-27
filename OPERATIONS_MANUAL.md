# baisalya.com Operations Manual

This is the practical recovery guide for the website owner. The intended setup is:

- GitHub repository: `https://github.com/Baisalya/Baisalya-Roul`
- Hosting: GitHub Pages, deployed by GitHub Actions from `main`
- Public domains: `https://baisalya.com` and the GitHub Pages fallback URL
- Registrar and DNS: Spaceship
- Contact delivery: FormSubmit to `baishalya1999@gmail.com`
- Advertising: Google AdSense, disabled in source until site approval and consent setup are complete

## 1. Normal release

Open PowerShell in `C:\Users\baish\Baisalya-Roul` and run:

```powershell
npm ci --prefix notivault-website
npm run release
git status --short
git diff --stat
```

If the release passes and the diff is expected:

```powershell
git add -A
git commit -m "Update baisalya.com"
git push origin main
```

The push starts `.github/workflows/deploy-baisalya-pages.yml`. In GitHub, open **Actions**, select **Deploy baisalya.com**, and confirm both the build and deploy jobs are green. Keep `dist/` local-only; the workflow rebuilds it.

## 2. GitHub Pages and Spaceship DNS

GitHub Pages must use **GitHub Actions** as its source and `baisalya.com` as its custom domain. The GitHub Pages fallback URL remains useful for deployment diagnostics.

Use these DNS records in Spaceship Advanced DNS:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `baisalya.github.io` |

Use the default/automatic TTL. Do not add wildcard records. Add the custom domain in GitHub Pages before changing DNS. DNS can take up to 24 hours to propagate. After GitHub reports the DNS check successful, enable **Enforce HTTPS**. Keep the repository root `CNAME` file set to exactly `baisalya.com`; the release builder publishes it with every GitHub Pages artifact.

Check DNS from PowerShell:

```powershell
Resolve-DnsName baisalya.com -Type A
Resolve-DnsName www.baisalya.com -Type CNAME
```

The apex result should contain the four GitHub Pages addresses above, and `www` should point to `baisalya.github.io`.

## 3. AdSense setup

The existing publisher account must first have website monetization active. Add `baisalya.com` in AdSense and use the AdSense code or meta-tag verification method Google provides.

The live site is connected to publisher `ca-pub-1529558529658186`. The root page carries Google's account meta tag and `/ads.txt` declares the same publisher. These values are public identifiers, not passwords. Keep them consistent if the AdSense account ever changes.

Keep ads disabled while the site is unapproved or consent is not ready:

```javascript
window.BAISALYA_MONETIZATION = Object.freeze({
  enabled: false,
  consentReady: false,
  adsenseClient: '',
  manualSlot: '',
});
```

Only after Google approves the site, create a manual responsive display unit, configure a compliant consent solution, and run:

```powershell
npm run adsense:configure -- --client=ca-pub-YOUR_REAL_ID --slot=YOUR_REAL_SLOT --consent-ready=true
npm run release
```

This writes `assets/monetization/config.js` and creates `ads.txt`. Review both before committing. Never commit a fake publisher ID. The site intentionally limits manual ads to eligible long-form EduSheet and SurveyCam pages.

An AdSense status such as **Getting your site ready to show ads** means Google is still reviewing the site. Do not turn on the monetization runtime until AdSense shows the site as ready, a real responsive ad-unit slot has been created, and the consent solution is live.

## 4. Contact form: how messages arrive

The root contact form posts directly to FormSubmit and targets `baishalya1999@gmail.com`. It sends the visitor's name, reply email, selected product/service, platform, message, and the fixed source value `baisalya.com`.

First-use activation is important:

1. After the live domain works, submit one harmless test message from the website.
2. Open `baishalya1999@gmail.com` and look for FormSubmit's activation email, including Spam.
3. The owner must click the activation link. Do not forward that link.
4. Submit a second test and confirm it arrives with subject **New baisalya.com software inquiry**.

The form has a hidden honeypot and browser validation. CAPTCHA is currently disabled. Never use the form for passwords, OTPs, payment details, recovery keys, or other secrets. If messages stop arriving, check Spam, verify the exact destination in `index.html`, and repeat a harmless test.

## 5. Sitemap, Search Console, and SEO

The sitemap address is exactly `https://baisalya.com/sitemap.xml`. The extension is `.xml`; `sitemap.xm` is a typo and should return 404. The root sitemap is an index that points Google to the main pages and every product sitemap.

After a successful deployment:

1. Open `https://baisalya.com/sitemap.xml` in an incognito window and confirm it loads XML.
2. Open Google Search Console for the `baisalya.com` domain property.
3. Go to **Sitemaps**, enter `sitemap.xml`, and select **Submit**.
4. If an older row says **Couldn't fetch**, resubmit after the live XML works. Google may take time to refresh the status.
5. Use **URL inspection** for the home page and important product pages, run **Test live URL**, and request indexing when the live test succeeds.

Useful URLs to inspect are:

- `https://baisalya.com/`
- `https://baisalya.com/devdesk/`
- `https://baisalya.com/surveycam/`
- `https://baisalya.com/shoppilot-erp/`
- `https://baisalya.com/construction-erp/`
- `https://baisalya.com/notivault-website/`
- `https://baisalya.com/EduSheet/`

The release process automatically enforces a canonical `baisalya.com` URL and indexable robots metadata on public HTML pages. It also rejects stale GitHub Pages URLs, placeholder domains, missing sitemap targets, and sitemap URLs that do not match a real production file. Never edit `dist/` directly; update the source and run `npm run release`.

Search engines decide ranking and indexing. A valid sitemap, structured data, canonical URLs, and Search Console submission improve discovery but do not guarantee an immediate result or a trending position. Keep product pages accurate, publish useful updates, link to them from relevant official profiles and repositories, and monitor Search Console **Pages**, **Sitemaps**, and **Performance** reports.

## 6. Common test failures

Run the failing test by itself after each fix.

- `Batch B legacy file still present`: delete only the exact obsolete file named by the validator, then run `npm run test:batch-b`.
- `Batch C stale eager file remains`: delete only the exact stale compatibility/easter-egg file named, then run `npm run test:batch-c`.
- `Obsolete root vite.config.js remains`: the root release no longer uses Vite; remove only the root file, not `notivault-website/vite.config.ts`.
- `NotiVault dependencies missing`: run `npm ci --prefix notivault-website`.
- `Protected ... changed from baseline`: first review `git diff -- devdesk construction-erp EduSheet notivault-website "shoppilot erp" shoppilot-erp`. If every change is intentional, run `npm run protected:refresh`; otherwise restore or fix the unexpected file. Then run `npm run test:protected-products`.
- `test:dist` failure: never patch `dist/` directly. Fix the source, run `npm run build`, then `npm run test:dist`.

## 7. Site or deployment recovery

If GitHub Actions fails, open the failed step, reproduce its command locally, fix the source, and push a new commit. Do not disable a release validator to make deployment green.

If `baisalya.com` fails but the GitHub Pages fallback works, the problem is DNS or custom-domain verification. Recheck the five DNS records, wait for propagation, and check GitHub Pages settings.

If both URLs fail, inspect the latest **Deploy baisalya.com** workflow. A successful build followed by a failed deploy usually indicates Pages/environment permissions; a failed build indicates a repository test or dependency problem.

To roll back a bad release without deleting history:

```powershell
git log --oneline -10
git revert COMMIT_ID
git push origin main
```

Use `git revert`, not `git reset --hard`, for a release that has already been pushed.
