# Store submission URLs and checks

After deployment, use these exact public HTTPS pages in the app release configuration and store consoles:

- Privacy policy: `YOUR_SITE_URL/privacy.html`
- Terms of service: `YOUR_SITE_URL/terms.html`
- Account deletion: `YOUR_SITE_URL/account-deletion.html`
- Support: `YOUR_SITE_URL/support.html`
- Data safety explanation: `YOUR_SITE_URL/data-safety.html`

App `config/release_defines.json` should contain the same values:

```json
{
  "APP_ENV": "production",
  "ENABLE_GOOGLE_SIGN_IN": "true",
  "PRIVACY_POLICY_URL": "YOUR_SITE_URL/privacy.html",
  "TERMS_OF_SERVICE_URL": "YOUR_SITE_URL/terms.html",
  "ACCOUNT_DELETION_URL": "YOUR_SITE_URL/account-deletion.html",
  "SUPPORT_URL": "YOUR_SITE_URL/support.html",
  "SUPPORT_EMAIL": "YOUR_SUPPORT_EMAIL"
}
```

Before submission:

- The publisher name and app name are visible in the Privacy Policy.
- Privacy, Support and Account Deletion pages load without login.
- Account deletion instructions match the current app behavior.
- Support email is monitored and matches the app/store listing.
- Data Safety answers match the final binary and Firebase production settings.
- Download buttons do not claim a platform is available before publication.
- A qualified lawyer reviews publisher-specific legal terms.
