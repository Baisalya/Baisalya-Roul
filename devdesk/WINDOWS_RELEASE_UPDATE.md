# Easy Windows release update

Use this checklist the next time a new DevDesk MSIX version is ready.

## Before Partner Center

1. Finish and test the app changes.
2. Increase the app version in the real Windows application source.
3. Keep the existing package name, Store identity, publisher identity, and
   signing configuration unchanged.
4. Build the release MSIX or MSIX upload package with the app project’s verified
   release command.
5. Install the release locally on a clean test account when possible.
6. Open the app and test launch, navigation, files, Settings, About, Help,
   onboarding, and external links.
7. Confirm the new package version is higher than the version already in the
   Store.
8. Prepare short release notes and current screenshots.

> Important: the Flutter/Windows app source is not present in this repository,
> so this document cannot name a verified package command or output path. Run
> only the command maintained by the actual app project.

## Upload the new package

1. Sign in to Microsoft Partner Center.
2. Open **Apps and games**.
3. Open **DevDesk**.
4. Select **Start submission** or open the draft submission.
5. Open **Packages**.
6. Remove only an incorrect package from the current draft when necessary.
7. Upload the new MSIX or upload package.
8. Wait for Partner Center validation to finish.
9. Confirm the detected version, architectures, device family, and identity.
10. Fix every package error before continuing.

## Update the Store listing

1. Open **Store listings** in the same submission.
2. Update **What’s new in this version**.
3. Update the description only when the product behavior actually changed.
4. Replace screenshots when the visible interface changed.
5. Keep the support, privacy, and website links current.
6. Check that the Windows Store wording is accurate.
7. Do not describe Android production as a public Android release.

## Finish the submission

1. Review **Age ratings** and other required sections.
2. Open **Submission options**.
3. Choose the intended publishing timing.
4. Review the complete submission summary.
5. Select **Submit to the Store**.
6. Save the submission ID and date in the release notes.

## If certification fails

1. Open the failed submission.
2. Read the certification report and every failure detail.
3. Identify whether the failure is package, crash, policy, listing, capability,
   privacy, or account-related.
4. Reproduce the issue locally when the report provides steps.
5. Fix the actual cause in the app or listing.
6. Increase the package version again when a replacement package is required.
7. Build and test a fresh release package.
8. Replace the failed draft package.
9. Add clear certification notes when special test steps are needed.
10. Resubmit.

Adding only a description does not fix a package or runtime certification
failure. The exact certification report is required to know the cause.

## After publication

1. Open the public
   [DevDesk Microsoft Store page](https://apps.microsoft.com/detail/9N8NH1LMZX1S?hl=en-us&gl=IN&ocid=pdpshare).
2. Confirm the listing, screenshots, and version are current.
3. Install or update from Microsoft Store.
4. Run one final smoke test.
5. Archive the release notes, package checksum, Partner Center result, and
   screenshots without storing signing secrets in the repository.
