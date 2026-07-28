# Structure checks (OKF)

Structured Knowledge checks portable project Markdown against the official Open Knowledge Format (OKF) v0.2 contract. DevDesk recommendations and extensions are shown separately from conformance.

## Open a project check

1. Open the workspace.
2. Open **Developer tools → Structure and OKF**.
3. Review the project summary.
4. Fix required errors first.
5. Review optional improvements.
6. Choose whether DevDesk may apply a managed plan automatically, queue it for review, or wait for a manual action.

## Four kinds of findings

| Finding | Meaning |
|---|---|
| Required | An official supported OKF v0.2 rule is not met |
| Warning | The bundle can be valid but has a quality or relationship problem |
| Advice | Optional DevDesk guidance |
| Extension | Supported DevDesk behavior outside the portable OKF core |

For a normal concept Markdown file, valid frontmatter and a non-empty `type` are required. Reserved files follow their own structure when present.

Optional indexes, known type names, extra metadata, working links, sources, verification, and lifecycle fields are useful but are not falsely promoted to universal requirements. Unknown producer fields and ordinary prose are preserved.

## Automation modes

### Safe automatic

Maintains only deterministic reversible DevDesk-managed indexes. It does not make semantic claims.

### Review changes

Creates a file-by-file plan that survives restart. You can inspect, accept, or reject it.

### Manual

Waits for an explicit user action before every project write.

## Recovery and undo

Before a managed batch, DevDesk stores a durable journal with paths, fingerprints, and before/after content.

- A partial failure rolls back verified unchanged DevDesk writes in reverse order.
- External edits are preserved.
- Successful plans can remain undoable after restart.
- Automatic file creation is used only where safe delete/rollback support is available.

## No invented trust

DevDesk never automatically invents:

- sources or provenance;
- human verification;
- lifecycle decisions;
- trust conclusions;
- computation output, receipts, or attestation verdicts.

Opening or analyzing a bundle does not run commands, scripts, terminals, Git, AI/MCP tools, network requests, computations, or attesters.

Future unsupported OKF versions open for diagnostic read-only analysis.
