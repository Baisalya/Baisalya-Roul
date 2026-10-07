# Optional brand ambassador previews

The selected generated cards and the current ON/OFF state are recorded in
`scripts/preview-settings.json`. Every product retains its original logo card
as a fallback. Search favicons keep the brand/product logo.

Use the supplied reference photo with the ImageGen tool to create a new,
identity-preserving composition. Keep the product name and logo readable.
Save the final approved card as a **1200 × 630 PNG** in `assets/social/`, using
a new filename for each replacement (for example `baisalya-ambassador-v1.png`).
Do not replace the original logo cards.

Assign the image to the main site, then enable the optional previews:

```powershell
npm run preview:ambassador -- set baisalya assets/social/baisalya-ambassador-v1.png
npm run preview:ambassador -- on
```

Assign other product cards individually with keys `devdesk`, `construction-erp`,
`shoppilot`, `edusheet`, `surveycam`, `notivault`, `sitesnap`, `brightquest` or
`paperaid`. Products with no assigned ambassador image keep their logo cards.

To change a picture, save a new version and repeat `set` for that site's key.
To turn the ambassador off everywhere and restore the original logo previews:

```powershell
npm run preview:ambassador -- off
```

To see the current choices:

```powershell
npm run preview:ambassador -- status
```

To switch just one product back to its logo card, remove its assignment:

```powershell
npm run preview:ambassador -- unset devdesk
```

These controls change static website metadata, so rebuild, validate and publish
after a change. Link previews already cached by WhatsApp, Facebook or other
services can take time to refresh; a setting cannot instantly erase their cache.

The settings live in `scripts/preview-settings.json`; they do not create a public
admin page. You can also ask Codex to change a photo or switch the option off.
