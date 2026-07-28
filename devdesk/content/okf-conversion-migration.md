# Analyze, improve, and migrate project knowledge

DevDesk can inspect an existing Markdown project without silently rewriting it.

## Analyze first

1. Open the workspace.
2. Open **Developer tools → Structure and OKF**.
3. Review required errors, warnings, advice, and extensions separately.
4. Refresh the project if files changed externally.

## Choose how changes are handled

- **Safe automatic:** only deterministic reversible managed maintenance.
- **Review changes:** prepare a durable plan for accept or reject.
- **Manual:** start and confirm each generation action yourself.

A plan is tied to file fingerprints. If a file changes after planning, DevDesk stops rather than applying a stale replacement.

## Safe improvements

DevDesk may deterministically prepare:

- managed directory indexes;
- portable standard Markdown relationships selected by the user;
- bounded starter documents when the target path is absent;
- supported OKF v0.2 structure corrections.

It preserves unknown fields and prose. Producer metadata that cannot be moved safely stays for manual review.

## Migration boundaries

- Existing older wiki links can remain readable as a DevDesk extension.
- New managed relationships use standard Markdown links.
- Unknown future OKF versions are not rewritten.
- Sources, verification, lifecycle, trust, and attestation are not invented.

## Recovery

A durable journal is written before project mutation. Partial failure rolls back only verified unchanged DevDesk writes. External edits stay untouched. A successful managed plan can remain undoable across restart.

Keep the project under Git or another backup strategy before a large migration.
