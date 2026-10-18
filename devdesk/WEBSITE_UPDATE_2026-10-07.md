# CLI and AI routine website update — 7 October 2026

Updated the local static website at `C:\Users\baish\Baisalya-Roul\devdesk`
using the current working source at `C:\Users\baish\StudioProjects\devdesk`
(base commit `828f27a`, including its uncommitted CLI/notification work).

## Documentation basis

- `docs/DEVDESK_CLI_GUIDE.md`, `docs/CLI_DISTRIBUTION.md`,
  `docs/CLI_EXIT_CODES.md`, and `tool/devdesk_cli_contract.dart`.
- `assets/manual/notifications-routines.md`, `docs/ROUTINE_AI_AUTOMATION.md`,
  and `docs/BACKGROUND_AI_WORKER.md`.
- Routine CLI handlers and the Windows background-task manager were checked
  where older phase descriptions differed from the current implementation.
- Existing H1/H2a and H4a certification evidence was inspected. The current
  H4a report records Windows/Linux PASS and explicitly excludes Store,
  Android, Linux closed-app AI and CLI automatic AI authority. App certification
  was not rerun as part of this static website update.

## Changes

- Added a standalone CLI guide covering all 26 top-level commands, installation,
  examples, canonical/legacy manifest naming, local data/backup, consent,
  prompt-only AI, supported GUI broker operations, completion, diagnostics,
  timeouts, and stable exit codes.
- Replaced obsolete notification roadmap text with native Android/Windows
  reminders, Review first / AI Prepare / read-only AI Auto-Run, saved permissions,
  platform limits, notification activation, occurrence protection, and audit.
- Documented the opt-in Windows Classic worker as signed-in-user execution;
  Store/MSIX, Android and Linux closed-app AI are not advertised.
- Updated landing/downloads copy and related manuals, inventory, positioning,
  coverage matrix and privacy-policy worker disclosure from the app source.
- Added CLI navigation across manuals, search/support routes, sitemap entry,
  and offline cache coverage. Cache build is `20261007.1`.
- Fixed manual regeneration to accept existing reordered HTML attributes and
  preserve the new page's active sidebar and advertising-context identity.

## Verification

- `dart analyze refresh_manual.dart validate_site.dart`: no issues.
- `dart run validate_site.dart`: 52 search entries, 57 HTML files; local links,
  assets, fragments, duplicate IDs, and encoding checks passed.
- `node --check` passed for the modified JavaScript files.
- `git diff --check` passed.
- Local browser checks covered desktop and phone layouts, routine comparison
  tables, CLI sidebar state, downloads copy, and landing links. No page-level
  horizontal overflow; comparison tables scroll on phones.
- Searching “DevDesk CLI” returned the command-line guide first.

`releases.json` and store-version configuration remain unchanged: reviewed
source features are not proof of a newly published store release. Changes are
local and uncommitted; no push or deployment was performed.
