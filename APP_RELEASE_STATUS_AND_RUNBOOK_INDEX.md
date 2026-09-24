# Baisalya app release status and AI runbook index

Last verified: 24 September 2026

This file is the first document an AI should read before building or releasing
any Baisalya Android or Windows app. A generated AAB/MSIX is not proof that it
was uploaded. Confirm the matching release log and the live Store console.

## Current verified status

| App | Source folder | Android / Play status | Windows / Microsoft status | Monetization now |
| --- | --- | --- | --- | --- |
| SurveyCam | `C:\Users\baish\StudioProjects\siteSnap` | **Public Google Play listing is reachable.** Closed testing - Alpha is recorded with release `44 (2.0.16)`; production was previously recorded on `34 (2.0.12)`. The current local source/artifact is build `45`, so it is not the Alpha 44 promotion artifact. | No canonical Microsoft Store MSIX release package/runbook has been verified. | Paid Google Play subscription is prepared for secure closed testing; only promote the exact Play Console release that passed billing QA. |
| EduSheet | `C:\Users\baish\StudioProjects\EduSheet` | The direct public listing URL returns 404 without tester access, consistent with a non-public/closed track. Local free AAB `1.2.2+5` is verified, but its upload is not proven by the local release log. | **Public Microsoft Store listing verified:** `9N0ZK8C31X94`, “EduSheet: Teacher's Paper Studio”. The website previously linked to DevDesk's Store ID and was corrected on 19 September 2026. | Free. `in_app_purchase` code exists, but paid features remain disabled in the documented release. No mobile ad SDK was found. |
| DevDesk | `C:\Users\baish\StudioProjects\devdesk` | **Public Google Play listing is reachable.** The latest local audit still did not upload a new AAB. | **Public Microsoft Store listing verified:** `9N8NH1LMZX1S`. The latest local audit did not upload a new MSIX. | Free. Billing integration exists, but paid products remain inactive/unpublished. No mobile ad SDK was found. |
| BrightQuest Kids | `C:\Users\baish\Downloads\ERP\brightquest_kids` | No verified public listing. An older local AAB `0.6.0+26` exists, but the source is now modified and there is **no verified upload record**. Do not upload that old artifact. | Windows executable build support exists, but no canonical Store MSIX package or verified MSIX upload record was found. | Production billing is intentionally incomplete/fail-closed. No mobile ad SDK was found; the local child-facing website is intentionally ad-free. |

## Canonical files an AI must read

| App | Read first | Build/package helper | Release evidence log | Can an AI release now? |
| --- | --- | --- | --- | --- |
| SurveyCam | `C:\Users\baish\StudioProjects\siteSnap\docs\play_subscription_and_release_runbook.md`; `docs\play_console_subscription_runbook.md`; `docs\owner_play_console_guide.md` | `C:\Users\baish\StudioProjects\siteSnap\tool\build_play_subscription_release.ps1`; packaging-only by default, `-RunQualityChecks` is optional | Add the final Alpha billing QA and production promotion result to the subscription runbooks; a dedicated append-only release log is still recommended. | Select QA, AAB build, Closed upload, or Production promotion separately. Promotion uses the exact tested Play artifact. Windows has no verified MSIX path. |
| EduSheet | `C:\Users\baish\StudioProjects\EduSheet\release\STORE_RELEASE_RUNBOOK.md` | `release\google_play\BUILD_PLAY_AAB.ps1`; `release\microsoft_store\BUILD_STORE_MSIX.ps1`; both package without full QA by default and accept `-RunQualityChecks` | `C:\Users\baish\StudioProjects\EduSheet\release\RELEASE_LOG.md` | Select QA, AAB, MSIX, upload, promotion, or remote monetization separately. Reuse valid QA evidence when the owner says the exact source was tested. |
| DevDesk | `C:\Users\baish\StudioProjects\devdesk\WINDOWS_STORE_RELEASE.md`; `docs\SUBSCRIPTION_ACTIVATION_GUIDE.md`; then `docs\release\RELEASE_RUNBOOK.md` and `docs\release\ANDROID_SIGNING.md` | Android packaging command is in `docs\SUBSCRIPTION_ACTIVATION_GUIDE.md`; Windows packager is `tool\release\package_windows_store_msix.ps1` and keeps output in `release\microsoft-store` | `C:\Users\baish\StudioProjects\devdesk\docs\DEVDESK_RELEASE_LOG.md` | Select QA, AAB, MSIX, upload/promotion, or monetization separately. Do not rerun valid QA merely as a packaging side effect. |
| BrightQuest Kids | `C:\Users\baish\Downloads\ERP\brightquest_kids\docs\STORE_RELEASE_RUNBOOK.md`; then `docs\RELEASE_QA_CHECKLIST.md`, `docs\STORE_BILLING_INTEGRATION.md`, and `docs\PHASE_D_RELEASE_CANDIDATE_CHECKLIST.md` | `tool\qa\run_phase_d.ps1` is QA-only by default; optional `-BuildAndroidAab` / `-BuildWindows`; no canonical MSIX packager exists | No authoritative append-only Store release log exists yet. | Technical QA/AAB/Windows build actions are separate. Commercial release is blocked by identity, human/content/device/billing gates; MSIX is not implemented. |

## Artifact evidence currently on disk

| App | Artifact | Size | SHA-256 | Meaning |
| --- | --- | ---: | --- | --- |
| SurveyCam | `C:\Users\baish\StudioProjects\siteSnap\build\app\outputs\bundle\release\app-release.aab` (current local source `2.0.16+45`) | 121,678,220 bytes | `60C5DF929CA74D5DD63DF4EAAD86FC29E2AF799CDE1E0116E23FC85AD2B30AB0` | Local build 45; it does not match the recorded Alpha release 44 and must not be represented as that promotion artifact. |
| EduSheet | `C:\Users\baish\StudioProjects\EduSheet\build\app\outputs\bundle\release\app-release.aab` (`1.2.3+8` in packaged manifest) | 131,125,905 bytes | `CB214E4D4540C33A7995C7A8F7A1140E0B7F709048CE304BC5020E4E5497BB05` | Current local artifact; it is newer than the last fully recorded release entry and needs identity/signing/QA evidence before upload. |
| EduSheet | `C:\Users\baish\StudioProjects\EduSheet\release\microsoft_store\packages\EduSheet_1.2.8.0_x64_store.msix` | 34,147,922 bytes | `AA9DFF6AC2240FD35556206AAD6A74444371CEEE828551BC4CCA8E08987A3CD9` | Recorded remote-ready Partner Center package; confirm version `1.2.8.0` was never uploaded before using it. |
| DevDesk | `C:\Users\baish\StudioProjects\devdesk\build\app\outputs\flutter-apk\app-debug.apk` | 186,430,619 bytes | `B85FFDE588F42C9C06C50F7E00489006099A511EDF0ED99EE1F439E97307DE0F` | Debug validation only. Never upload this APK to a Store. |
| BrightQuest Kids | `C:\Users\baish\Downloads\ERP\brightquest_kids\build\app\outputs\bundle\release\app-release.aab` (`0.6.0+26`) | 60,128,663 bytes | `042C0431E6872B8092355E806EE1837A6B5DA82973A1CA1FAE751C2A49ECAE22` | Old local build from 23 August 2026. It does not contain current uncommitted changes and has no verified Store upload record. Do not upload it. |

## Required AI release workflow

1. Read this index and the app's canonical runbook files from the table.
2. Run `git status` and preserve unrelated or unfinished work.
3. Select exactly one action: QA only, Android AAB packaging, Windows/MSIX
   packaging, Store upload, Store promotion/submission, or monetization change.
4. For a packaging action, confirm the app package/identity and choose a Store
   version that has never been uploaded.
5. Confirm the intended monetization mode. Current policy is SurveyCam paid;
   EduSheet and DevDesk free; BrightQuest not commercially releasable yet.
6. QA and packaging are independent. If the owner says the exact source was
   already tested, reuse the recorded evidence and do not rerun the full suite.
   Run fresh QA only when requested or when source/dependency/build settings no
   longer match the evidence. Artifact identity/signature/hash checks still run.
7. Record absolute artifact paths, sizes, SHA-256 hashes, versions, build flags,
   and test results in the app's release log before upload.
8. Upload to internal/closed/private testing first when required by the app's
   runbook. Store upload/submission is an external action and must match the
   owner's current instruction.
9. Promote the exact tested artifact. Never rebuild or rerun local QA between
   closed testing and production promotion.
10. Append the live Store status, release/submission ID, date, and result to the
   app's release log.

## Files that are not release authority

Do not release an app by reading only `AI_*`, `PHASE_*`, `MODIFIED_FILES*`,
handoff, marketing-site, or old verification-report files. They are useful
implementation history. The canonical runbooks and current release logs in the
table control packaging and Store decisions.

The `C:\Users\baish\Baisalya-Roul` repository is the website/catalog project.
Its DevDesk/EduSheet pages are not substitutes for the Flutter app release
runbooks in the source projects above.
