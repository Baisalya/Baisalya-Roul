PaperAid website package
=========================

Target URL
  https://baisalya.com/paperaid/

What is included
  index.html
  download.html
  quick-start.html
  manual.html
  privacy-policy.html
  terms-of-service.html
  support.html
  404.html
  assets/
  config.json
  update.json
  site-config.js
  site.webmanifest
  robots.txt
  sitemap.xml

Important integration notes
---------------------------
1) Copy this entire folder into the repository root as:
     Baisalya-Roul/paperaid/

2) This site intentionally reuses the existing shared Baisalya website assets:
     ../assets/site-network.css
     ../assets/monetization/monetization.css
     ../assets/monetization/config.js
     ../assets/monetization/monetization.js

   The PaperAid home page has exactly one manual ad slot. It stays hidden while
   the shared monetization config is disabled/consent-not-ready. The other
   PaperAid pages have no ad slot.

3) Before store launch, edit site-config.js and add official store URLs.
   Until then the Download page honestly shows 'coming soon'.

4) PaperAid app release services already expect:
     https://baisalya.com/paperaid/config.json
     https://baisalya.com/paperaid/update.json

   config.json in this package is the FREE / NO-ADS launch configuration.
   Do not enable future rewarded ads until Play Console / AdMob disclosures,
   privacy policy, and production AdMob setup are ready.

5) The current Baisalya-Roul release builder explicitly enumerates product
   folders. See REPO_INTEGRATION.md before running the repository release build.
