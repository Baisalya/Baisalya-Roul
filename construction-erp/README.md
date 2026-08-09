# Construction ERP Website — product marketing and user guide

Static website aligned to **Construction ERP 1.22.0+107 / database schema 30**.

## What this version improves

- Home page is organized around buyer problems, budget protection and a clear product walkthrough CTA.
- Normal-user messaging follows **Tender → Project → Daily Work → Stock → Labour → Machinery → Report**.
- The user guide separates normal-user work from owner/administrator controls.
- **Contract Value** and **Project Cost Budget** are explained as different commercial and cost-control amounts.
- Normal purchase and rare emergency purchase/stock receipt are documented as separate, realistic flows.
- Budget overruns are described accurately: warn, block, request approval, then retry after owner/admin approval.
- Every common abbreviation (DPR, BOQ, PR, PO, GRN, MB, RA, GST, TDS, RFI, NCR, AP/AR) has a plain-language definition.
- Sync help matches the current recovery model: offline work, failed items, one logical open conflict review, retry and diagnostics.
- Machinery overlap guidance explains that one machine cannot be allocated to two overlapping places/times.
- DPR site-photo upload is still marked **Coming soon**.
- Android + Windows remain the supported targets. Windows authentication is email/password; Android may use Google or email/password when enabled.
- Existing privacy, terms, account-deletion, data-safety and support pages are preserved.
- Old illustrative screenshots that no longer matched the app were removed from the user journey.
- Marketing copy avoids invented customer counts, savings claims and testimonials.

## Source and build output

- `src/` — source website.
- `dist/` — generated deployable website.
- `site.config.json` — publisher/support/site/download configuration.
- `scripts/build_site.py` — builds `dist/`.
- `scripts/validate_site.py` — checks HTML, links/assets and JavaScript syntax.

## Before public deployment

Edit `site.config.json`:

1. `publisherName` — legal publisher/developer name.
2. `supportEmail` — monitored public support/privacy email.
3. `siteUrl` — final public HTTPS site URL with no trailing slash.
4. Add verified Google Play, Microsoft Store, GitHub Release or signed installer URLs when ready.
5. Set a platform `enabled` only after its link and release have been tested.

### Windows helper

```powershell
.\configure_and_build.ps1
```

### Manual build

```powershell
py -3 .\scripts\build_site.py
py -3 .\scripts\validate_site.py
py -3 -m http.server 8080 --directory .\dist
```

For a local preview while legal/contact placeholders are still present:

```powershell
py -3 .\scripts\build_site.py --allow-placeholders
py -3 .\scripts\validate_site.py
```

Open `http://localhost:8080` after starting the local server.

Do not submit placeholder legal/contact pages to Google Play or Microsoft Store.
