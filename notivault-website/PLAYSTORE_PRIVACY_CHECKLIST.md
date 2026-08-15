# NotiVault Play Store Privacy Checklist

The public privacy-policy page is available at `/privacy-policy` after hosting.
Paste that final public HTTPS URL into Play Console → Policy → App content →
Privacy policy. Also add a link to the same page inside the Android app.

This document is a launch checklist, not a substitute for legal advice.

## Required in-app prominent disclosure

The website privacy policy alone is not enough for background Notification
Access. Before opening Android's Notification Access settings for the first
time, show a dedicated in-app disclosure and require a clear affirmative tap.

Suggested disclosure:

> NotiVault accesses and stores notifications from apps you select, including
> app name, sender or title, message preview, timestamps, and notification-exposed
> media, to build your private notification history even when NotiVault is not
> open. This data stays in NotiVault's private storage on your device and is not
> sold or used for advertising. You can change selected apps, retention, media
> capture, or revoke access at any time.

Buttons:

- `Continue to Notification Access` — affirmative action, then open Android settings.
- `Not now` — close without granting or interpreting dismissal as consent.

The disclosure must appear in normal setup immediately before sending the user
to Android settings. Do not hide it only in Settings, a privacy policy, or the
Play Store description.

## Before Play submission

- [ ] Replace any draft/contact placeholder with a monitored support method.
- [ ] Host the website on a stable public HTTPS URL with no login or geo-block.
- [ ] Verify `/privacy-policy` loads without cookies or account creation.
- [ ] Add the public privacy URL to Play Console.
- [ ] Add the same privacy link inside NotiVault Settings/About.
- [ ] Implement and test the prominent disclosure shown above.
- [ ] Record the complete disclosure accept/decline flow for review evidence.
- [ ] Ensure Play Data Safety answers match the actual release AAB and SDKs.
- [ ] Re-audit policy if Firebase, analytics, crash reporting, a verification
      backend, accounts, cloud sync, or advertising is added.
- [ ] Update the public policy before any new sensitive-data use launches.

## Current policy assumptions to re-check

The policy currently describes the inspected app as:

- local-first with no NotiVault cloud sync or account;
- no advertising or behavioral analytics SDK;
- notification text/media stored in Android private app storage;
- Android backup and cleartext traffic disabled;
- internet access used for Google Play Billing;
- no Accessibility Service, location, contacts, SMS, call logs, camera,
  microphone, root, `QUERY_ALL_PACKAGES`, or broad external-storage permission.

If any of these change, revise the privacy policy and Data Safety form before
publishing the changed build.

Official references:

- Google Play User Data policy:
  https://support.google.com/googleplay/android-developer/answer/10144311
- Prominent disclosure guidance:
  https://support.google.com/googleplay/android-developer/answer/11150561
- Data Safety form guidance:
  https://support.google.com/googleplay/android-developer/answer/10787469
