# Construction ERP website research and refactor

## What was already right

- Strong static build with no analytics or advertising trackers.
- Offline-first, role access, sync recovery and encrypted backup were explained honestly.
- Privacy, terms, data safety, account deletion and support pages were already present.
- The build validator checked page titles, descriptions, links, anchors, images and JavaScript syntax.

## What was wrong

- The public homepage taught the app before explaining why a contractor should choose it.
- It advertised 15 modules to everyone, while the current normal-user navigation is a seven-step operational path.
- Tender value used older terms such as quoted value; project value used agreement value.
- Contract Value and Project Cost Budget were not clearly separated.
- The manual did not explain the new budget block/approval/retry behavior.
- Planned purchasing and rare emergency purchase + stock receipt were not explained as distinct flows.
- Old illustrative screenshots showed navigation and features that no longer matched the product.
- App version and schema references were one release behind.
- There was no clear product-walkthrough conversion path.

## Research direction used

Current construction-software sites lead with cost visibility, budget control, daily field records, material/labour accountability, reports and field-to-office coordination. The refactor applies those patterns without copying unsupported claims or inventing proof.

## What changed

- Buyer-focused homepage with real pains, outcomes and one primary walkthrough CTA.
- Seven-stage product story: Tender, Project, Daily Work, Stock, Labour, Machinery, Report.
- Contract Value and Project Cost Budget shown side by side with plain meanings.
- Project Cost Budget overrun gate explained from user attempt through owner/admin approval and retry.
- Planned procurement and rare emergency procurement presented honestly.
- Scannable role-based user guide with separate owner/admin controls.
- Accurate Open Graph marketing card and consistent product navigation across the site.
- Release alignment updated to `1.22.0+107` / schema `30` on 9 August 2026.
