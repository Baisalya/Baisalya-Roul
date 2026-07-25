# Frequently asked questions

## Does DevDesk upload my project folder?

No DevDesk-operated project upload or cloud-sync service is included. User-initiated network tools can still send data to destinations you choose.

## Is Structured Knowledge an AI feature?

The current structured-knowledge workflow uses deterministic local analysis and preview-first file changes. It does not require a bundled online AI provider.

## Does removing a workspace delete the folder?

No. It removes the registration, not the source folder.

## Can the graph change Markdown?

The connection editor can add or remove links inside a clearly marked DevDesk-managed Markdown block. Manually authored links outside that block are preserved.

## Are API requests offline?

No. Building and storing requests is local, but sending a request requires network access and transmits data to the selected server.

## Are backups encrypted?

DevDesk-generated backup JSON is portable and should be treated as sensitive. Protected secret values are excluded, but other content can remain confidential.

## Can I reopen onboarding?

Yes. Open Settings or the User Manual and select **View onboarding again**.

## Where is help for a specific tool?

Use the help icon in that tool's app bar. It opens the relevant offline manual topic.

## Is OKF owned by DevDesk?

No. DevDesk implements workflows around the open specification. The official OKF v0.2 specification is published in the GoogleCloudPlatform knowledge-catalog repository.

## Does every Markdown file need full trust metadata?

No. `type` is the only always-required OKF concept key. Sources, verification, lifecycle, indexes, and logs are optional signals and navigation aids.

## Can I use wiki links in an OKF bundle?

DevDesk can use wiki-style links for its knowledge workflow, but standard Markdown links are the portable relationship form defined by OKF. Prefer standard links when interoperability is the priority.

## Why is macOS shown without a download?

A platform card communicates current availability. It must not imply that a signed, notarized, tested package exists when one has not been released.
