# Portfolio, Hosting and Monetization Audit — 19 September 2026

## Outcome

- `https://baisalya.com/` and every currently deployed product route returned HTTP 200.
- The apex domain uses Spaceship nameservers (`launch1.spaceship.net`, `launch2.spaceship.net`) and resolves to the four GitHub Pages IPv4 addresses.
- The GitHub Pages deployment workflow's latest public run completed successfully for commit `8d984e8` on 13 September 2026.
- Production `ads.txt` is reachable and contains publisher `pub-1529558529658186`.
- Production monetization config is enabled with AdSense client `ca-pub-1529558529658186`, responsive slot `9546051599`, and the consent-ready gate enabled.
- EduSheet's Windows CTA was incorrectly opening DevDesk. The verified EduSheet Microsoft Store ID is `9N0ZK8C31X94`; portfolio and product-site configuration now use that ID.

## Public product status

| Product | Website | Store / access status checked | Website monetization |
| --- | --- | --- | --- |
| EduSheet | HTTP 200 | Microsoft Store public: `9N0ZK8C31X94`; Google Play direct URL is not public without tester access | One controlled manual AdSense placement on content pages; privacy and 404 stay ad-free |
| DevDesk | HTTP 200 | Microsoft Store public: `9N8NH1LMZX1S`; Google Play public | One controlled manual AdSense placement on content/manual pages; privacy and 404 stay ad-free |
| SurveyCam | HTTP 200 | Google Play public; no verified Windows listing | One controlled manual AdSense placement on eligible pages; privacy stays ad-free |
| ShopPilot | HTTP 200 | Microsoft Store public: `9N9XDS5G5F77`; Google Play direct URL is not public without tester access | Production build injects the controlled manual placement into the eligible site surface |
| Construction ERP | HTTP 200 | Customer deployment by enquiry; no public installer claimed | One controlled manual placement on eligible content; legal/privacy pages stay ad-free |
| SiteSnap | HTTP 200 | Open-source project / website; no Store listing claimed | One controlled manual placement |
| NotiVault | HTTP 200 | Coming soon; no public installer claimed | Intentionally ad-free; direct-support surface used instead |
| BrightQuest Kids | Local website present, but not included in the current production build | Store links intentionally remain Coming soon | Intentionally ad-free because it is child-facing |

## Ad and SDK distinction

The portfolio websites use Google AdSense. The checked Flutter application sources do **not** include a production `google_mobile_ads` / AdMob SDK dependency:

- EduSheet: Store purchase integration exists; paid features are documented as disabled.
- DevDesk: billing integration exists; paid products are documented as inactive/unpublished.
- SurveyCam: Store subscription/billing integration exists and is under release QA.
- BrightQuest Kids: production billing is fail-closed; no mobile ad SDK found.

Therefore, “website ads connected” is true for eligible deployed web pages, while “mobile app ad SDK connected” is false for the checked apps. Billing SDKs should not be described as advertising SDKs.

## Deployment safety model

- Checked-in source monetization config stays OFF so local/source previews do not serve ads.
- The GitHub Pages release pipeline generates `dist/`, switches the production config ON, writes `ads.txt`, validates the output and deploys the artifact.
- Portfolio home, NotiVault, privacy/legal/deletion pages and 404 pages intentionally do not receive ad slots.
- A compliant consent/CMP setup still needs to remain active wherever required; repository code can verify the gate configuration, not the external AdSense/CMP account state.
