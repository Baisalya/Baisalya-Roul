# Baisalya app release status and AI runbook index

Last verified: 13 September 2026

This file is the first document an AI should read before building or releasing
any Baisalya Android or Windows app. A generated AAB/MSIX is not proof that it
was uploaded. Confirm the matching release log and the live Store console.

## Current verified status

| App | Source folder | Android / Play status | Windows / Microsoft status | Monetization now |
| --- | --- | --- | --- | --- |
| SurveyCam | `C:\Users\baish\Downloads\siteSnap` | **Uploaded.** Closed testing - Alpha is active with release `44 (2.0.16)`, released to selected testers on 13 September 2026. Production is active on older release `34 (2.0.12)`. | No canonical Microsoft Store MSIX release package/runbook has been verified. | Paid Google Play subscription is prepared for secure closed testing; only promote release 44 after billing QA. |
| EduSheet | `C:\Users\baish\StudioProjects\EduSheet` | Free AAB `1.2.2+5` generated and verified. **Not uploaded or submitted** in the recorded preparation. | Free MSIX `1.2.5.0` generated and verified. **Not uploaded or submitted** in the recorded preparation. | Free. Planned subscription/add-on remains inactive. |
| DevDesk | `C:\Users\baish\StudioProjects\devdesk` | Secure verification code prepared. Only a debug APK was generated in the latest audit. **No AAB upload** was performed in that work. | **No new MSIX upload** was performed in the latest audit. Existing add-ons remain inactive/unpublished. | Free. Backend registration is disabled. |
| BrightQuest Kids | `C:\Users\baish\Downloads\ERP\brightquest_kids` | An older local AAB `0.6.0+26` exists, but the source is now modified and there is **no verified upload record**. Do not upload that old artifact. | Windows executable build support exists, but no canonical Store MSIX package or verified MSIX upload record was found. | Production billing is intentionally incomplete/fail-closed. Do not sell class packs yet. |

## Canonical files an AI must read

| App | Read first | Build/package helper | Release evidence log | Can an AI release now? |
| --- | --- | --- | --- | --- |
| SurveyCam | `C:\Users\baish\Downloads\siteSnap\AGENTS.md`; `C:\Users\baish\Downloads\siteSnap\docs\play_subscription_and_release_runbook.md`; `C:\Users\baish\Downloads\siteSnap\docs\play_console_subscription_runbook.md`; `C:\Users\baish\Downloads\siteSnap\docs\owner_play_console_guide.md` | `C:\Users\baish\Downloads\siteSnap\tool\build_play_subscription_release.ps1` | Add the final Alpha billing QA and production promotion result to the subscription runbooks; a dedicated append-only release log is still recommended. | Android: build 44 already exists in Alpha. Promote the exact tested release only after real purchase/restore/pending/refund tests pass. Windows: no verified MSIX path yet. |
| EduSheet | `C:\Users\baish\StudioProjects\EduSheet\release\STORE_RELEASE_RUNBOOK.md` | `release\google_play\BUILD_PLAY_AAB.ps1`; `release\microsoft_store\BUILD_STORE_MSIX.ps1`; use the adjacent `RELEASE_HELPER.md` files | `C:\Users\baish\StudioProjects\EduSheet\release\RELEASE_LOG.md` | Yes, for a **free** release after confirming version codes are unused and rerunning the documented checks. Paid release remains disabled. |
| DevDesk | `C:\Users\baish\StudioProjects\devdesk\WINDOWS_STORE_RELEASE.md`; `docs\SUBSCRIPTION_ACTIVATION_GUIDE.md`; then `docs\release\RELEASE_RUNBOOK.md` and `docs\release\ANDROID_SIGNING.md` | Android command is in `docs\SUBSCRIPTION_ACTIVATION_GUIDE.md`; Windows packager is `tool\release\package_windows_store_msix.ps1` and keeps output in `release\microsoft-store` | `C:\Users\baish\StudioProjects\devdesk\docs\DEVDESK_RELEASE_LOG.md` | Not from the current dirty worktree. Finish/commit the other feature work, rerun all checks, increment versions, then build a **free** AAB/MSIX. Paid products stay inactive. |
| BrightQuest Kids | `C:\Users\baish\Downloads\ERP\brightquest_kids\docs\RELEASE_QA_CHECKLIST.md`; `docs\STORE_BILLING_INTEGRATION.md`; `docs\PHASE_D_RELEASE_CANDIDATE_CHECKLIST.md`; `README.md`; `PRODUCT_ROADMAP.md` | `tool\qa\run_phase_d.ps1` builds a technical Android/Windows candidate, but there is no canonical Store AAB/MSIX packaging runbook | No authoritative append-only Store release log exists yet. | No. The current source is dirty, product package ID is still `com.example.brightquest_kids`, human/content/device gates are pending, billing is not production-ready, and no MSIX Store packaging workflow is documented. |

## Artifact evidence currently on disk

| App | Artifact | Size | SHA-256 | Meaning |
| --- | --- | ---: | --- | --- |
| SurveyCam | `C:\Users\baish\Downloads\siteSnap\build\app\outputs\bundle\release\app-release.aab` (`2.0.16+44`) | 121,680,798 bytes | `4FCB933C08A5550762845D6D6097BFCC12EA885BC2D504AD59DAA15BC7D669FA` | Matches the version shown in Closed testing - Alpha. Do not rebuild before promotion. |
| EduSheet | `C:\Users\baish\StudioProjects\EduSheet\build\app\outputs\bundle\release\app-release.aab` (`1.2.2+5`) | 111,300,918 bytes | `CB7179AA860E9812AE6B78F6EEDA30CD8940789874E6765A568B11CF981BEA05` | Verified free AAB; not uploaded. Confirm version code 5 is unused before upload. |
| EduSheet | `C:\Users\baish\StudioProjects\EduSheet\release\microsoft_store\packages\EduSheet_1.2.5.0_x64_store.msix` | 30,940,845 bytes | `42081252E718108A6E438E55337E4A3734C992B2162BDF1E87F5A07F14B187FE` | Verified free Partner Center package; not uploaded. Confirm version 1.2.5.0 is unused. |
| DevDesk | `C:\Users\baish\StudioProjects\devdesk\build\app\outputs\flutter-apk\app-debug.apk` | 186,430,619 bytes | `B85FFDE588F42C9C06C50F7E00489006099A511EDF0ED99EE1F439E97307DE0F` | Debug validation only. Never upload this APK to a Store. |
| BrightQuest Kids | `C:\Users\baish\Downloads\ERP\brightquest_kids\build\app\outputs\bundle\release\app-release.aab` (`0.6.0+26`) | 60,128,663 bytes | `042C0431E6872B8092355E806EE1837A6B5DA82973A1CA1FAE751C2A49ECAE22` | Old local build from 23 August 2026. It does not contain current uncommitted changes and has no verified Store upload record. Do not upload it. |

## Required AI release workflow

1. Read this index and the app's canonical runbook files from the table.
2. Run `git status` and preserve unrelated or unfinished work.
3. Confirm the app package/identity and choose a new Store version that has
   never been uploaded.
4. Confirm the intended monetization mode. Current policy is SurveyCam paid;
   EduSheet and DevDesk free; BrightQuest not commercially releasable yet.
5. Run the app's complete analysis, tests, platform build, signing/manifest,
   and Store-package verification steps.
6. Record absolute artifact paths, sizes, SHA-256 hashes, versions, build flags,
   and test results in the app's release log before upload.
7. Upload to internal/closed/private testing first when required by the app's
   runbook. Store upload/submission is an external action and must match the
   owner's current instruction.
8. Promote the exact tested artifact. Never rebuild between closed testing and
   production promotion.
9. Append the live Store status, release/submission ID, date, and result to the
   app's release log.

## Files that are not release authority

Do not release an app by reading only `AI_*`, `PHASE_*`, `MODIFIED_FILES*`,
handoff, marketing-site, or old verification-report files. They are useful
implementation history. The canonical runbooks and current release logs in the
table control packaging and Store decisions.

The `C:\Users\baish\Baisalya-Roul` repository is the website/catalog project.
Its DevDesk/EduSheet pages are not substitutes for the Flutter app release
runbooks in the source projects above.
