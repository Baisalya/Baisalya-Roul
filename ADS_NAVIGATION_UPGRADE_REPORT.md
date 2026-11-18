# Baisalya Ads + Cross-Site Navigation Audit

## Current ad policy — 18 November 2026

The current release rule allows one responsive manual slot on nine reviewed, long-form user manuals. The release builder removes legacy ad slots and loaders from every page outside that explicit list.

The portfolio homepage, product promotion pages, downloads, support and legal pages, brief references, NotiVault and BrightQuest Kids remain ad-free. The site config is disabled by default and sets autoAds to false. The production workflow writes the configured publisher and slot only when the GitHub Actions variable ADSENSE_CONSENT_READY equals true.

That variable is a release gate, not a visitor-consent solution. The repository cannot show whether account-level Auto Ads or the AdSense Privacy & messaging/CMP setup is currently enabled; those settings need a separate account-side check.

### Pages eligible for the manual slot

- devdesk/manual/user-manual.html
- devdesk/manual/getting-started.html
- devdesk/manual/developer-workspaces.html
- devdesk/manual/api-workspaces.html
- devdesk/manual/backup-restore.html
- devdesk/manual/container-operations.html
- construction-erp/manual.html
- shoppilot-erp/user-manual.html
- EduSheet/manual.html

## Historical navigation audit — 28 August 2026

The earlier cross-site audit recorded 84 of 84 product HTML pages with a visible navigation path to Baisalya.com (79 appended navigation links and five fallback bars). Those figures describe that dated audit and were not recounted in the current ad-policy update.
