# baisalya.com

Source repository and GitHub Pages release pipeline for `baisalya.com` and the product websites published below it.

## Safe release

```powershell
npm ci --prefix notivault-website
npm run release
git status --short
git push origin main
```

The production artifact is generated in `dist/` and deployed by `.github/workflows/deploy-baisalya-pages.yml`. Do not edit `dist/` by hand.

For DNS, AdSense, contact-form activation, troubleshooting, and rollback instructions, read [OPERATIONS_MANUAL.md](OPERATIONS_MANUAL.md).

If an intentional change inside a protected product makes `test:protected-products` fail, review that product's diff first, then run:

```powershell
npm run protected:refresh
npm run release
```

Never refresh the protected baseline merely to hide an unexplained change.
