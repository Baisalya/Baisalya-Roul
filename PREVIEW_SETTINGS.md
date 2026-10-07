# Portfolio portrait and optional product ambassador previews

`scripts/preview-settings.json` selects the owner's portrait for the Baishalya
Roul portfolio and separate ambassador cards for nine product sites. The
ambassador ON/OFF switch affects products only: the portfolio keeps its owner's
portrait. Search favicons continue to use the brand/product logos.

The portfolio uses the owner's original photo with its room background removed,
keeping the owner and visible office chair together. ImageGen supplied the
foreground mask and empty studio glow background. Only the outermost alpha edge
is softened; the face, lighting, clothing, expression and chair RGB pixels come
from the original photo. To reproduce the card with its saved mask/background, supply that
same original photo to
`node scripts/generate-portfolio-preview.mjs <photo-path>` (requires Sharp or
`SOCIAL_SHARP_MODULE`). The original full photo stays outside the repository.

For product ambassador variants, use ImageGen with the supplied identity reference.
Keep the name and logo readable. Save a **1200 × 630 PNG** in `assets/social/`
with a new filename for each version. Keep original reference photos outside the
repository, and preserve the existing logo cards as fallbacks.

To replace the portfolio owner's portrait:

```powershell
npm run preview:ambassador -- portrait assets/social/baisalya-original-chair-v5.png
```

To restore the portfolio's logo card without changing any product:

```powershell
npm run preview:ambassador -- portrait-off
```

Assign an ambassador card to a product, then enable product previews:

```powershell
npm run preview:ambassador -- set devdesk assets/social/devdesk-ambassador-v2.png
npm run preview:ambassador -- on
```

Product keys are `devdesk`, `construction-erp`, `shoppilot`, `edusheet`,
`surveycam`, `notivault`, `sitesnap`, `brightquest` and `paperaid`. A product
without an assignment uses its logo card. `set baisalya` is rejected: the
portfolio accepts its owner's image through the separate `portrait` command.

To turn the ambassador off on every product, while keeping the owner on the
portfolio:

```powershell
npm run preview:ambassador -- off
```

To restore just one product's logo card:

```powershell
npm run preview:ambassador -- unset devdesk
```

To inspect all current choices:

```powershell
npm run preview:ambassador -- status
```

Rebuild, validate and publish after a change, because these settings update
static link metadata. WhatsApp, Facebook and other services may retain cached
previews for a while. The controls do not create a public admin page; you can
also ask Codex to change a picture or turn the option off.
