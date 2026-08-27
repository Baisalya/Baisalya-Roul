# NotiVault website

Marketing website and Play Store privacy policy for the NotiVault Android app.

Public website:
https://baisalya.com/notivault-website/

This project is exported as static HTML for GitHub Pages. The canonical public
link is the custom-domain folder URL above.

## Local development

```bash
npm ci
npm run dev
```

## Validation

```bash
npm test
npm run lint
```

The privacy policy is available at `/privacy-policy/`. Before a Play Store
submission, follow `PLAYSTORE_PRIVACY_CHECKLIST.md` and confirm that the policy
still matches the exact release AAB and every included SDK.
