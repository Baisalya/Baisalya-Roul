BRIGHTQUEST KIDS WEBSITE — DEPLOY NOTES
=======================================

Recommended public path:
  https://baisalya.com/brightquest-kids/

Upload the CONTENTS of this folder into your website repository at:
  /brightquest-kids/

Important public URLs after deployment:
  Home:    https://baisalya.com/brightquest-kids/
  Privacy: https://baisalya.com/brightquest-kids/privacy.html
  Support: https://baisalya.com/brightquest-kids/support.html
  Terms:   https://baisalya.com/brightquest-kids/terms.html

Google Play privacy policy field:
  Use the public Privacy URL above only after the page is deployed and opens
  without login or download.

Store links:
  The site intentionally shows Google Play and Microsoft Store as Coming soon.
  Do not replace them until the actual BrightQuest Kids listings are verified.

App logo/icon assets:
  assets/icons/brightquest-icon-source.png
  assets/icons/app-icon-1024.png
  assets/icons/app-icon-512.png
  assets/icons/app-icon-192.png
  assets/icons/apple-touch-icon.png
  assets/images/brightquest-logo.png

Before each store release:
  1. Re-check the final app permissions and SDK list against privacy.html.
  2. Re-check Google Play Data Safety / Families declarations.
  3. Update store links only after verified publication.
  4. Update product copy if data handling or billing changes.


BRIGHTQUEST KIDS WEBSITE V2
===========================
New pages/features:
- downloads.html: Google Play + Microsoft Store status cards. Keep them in Coming soon state until the real store URLs are verified.
- Navbar on all main pages includes a direct Baisalya.com link.
- privacy.html and PRIVACY_POLICY.md rewritten as the public app-specific policy for the current local-first architecture.
- More playful child-friendly visual polish while keeping legal/support pages readable for parents.

When Google Play is live:
1. Replace the disabled Google Play control in downloads.html with the verified listing URL.
2. Update the same verified link wherever store CTAs are shown.
3. Re-check the shipping AndroidManifest.xml and dependency list.
4. Make Play Console Data safety + Target audience/Families answers match the shipping build and this policy exactly.

When Microsoft Store is live:
1. Replace the disabled Microsoft Store control with the verified listing URL.
2. Do not link to local MSIX/APK files from the public child-facing site.
