# Notifications and AI routines

Use DevDesk's local Notification Center for app activity, reminders, and AI
results. Open the bell from Home or a standard tool bar. Routines can remind
you to review a prompt or, with explicit opt-in, prepare a result automatically.

## Notification Center

- The badge shows unread DevDesk notifications.
- Open an item to mark it read and follow its in-app action.
- Swipe to delete, mark every item read, or clear read items.
- App notification records stay in DevDesk local storage and can be included in
  a DevDesk backup.

The current release does **not** request access to notifications from WhatsApp,
Facebook, or other apps. It does not silently reply or post.

## Create an AI routine

1. Open **Notifications & Routines**.
2. Select **AI Routines** and enter a routine name and prompt.
3. Start from Study plan, Deadline check, Daily summary, Message draft, or a
   custom prompt.
4. Choose Once, Daily, Weekdays, or Weekly and select the next time.
5. Choose an execution mode. For automatic modes, select the workspace whose
   configured AI provider and model should be used.
6. Keep the routine enabled and review its saved permissions.

Saved routines appear under **My routines**. Expand one to see its prompt,
next run, last result, and actions. **Recent execution history** shows bounded
evidence of automatic runs.

## Choose the execution mode

| Mode | What happens when due | Permissions |
| --- | --- | --- |
| **Review first** | Creates a reminder and opens the saved prompt in AI Harness for review. No automatic provider request. | Default for existing and new routines. |
| **AI Prepare** | Sends the saved prompt using the selected workspace's provider/model; keeps the response in AI Harness. | Explicit opt-in; no workspace context or tools. |
| **AI Auto-Run (read-only)** | Runs the prompt with only the permissions saved on that routine. | Explicit opt-in; optionally allow read-only workspace context and/or external research separately. |

Automatic modes require a configured provider and a live DevDesk-owned runtime.
Provider usage may incur charges under your provider account. The notification
reports that a result is ready; open AI Harness to inspect it.

Routine permissions are separate from interactive AI Harness permissions.
Automatic routines do not inherit your active agent, workspace instructions or
skills, identity, project memory, or interactive tool approvals. File changes,
terminal commands, publishing, browser/computer control, Android ADB, and nested
automation remain blocked. An action outside the saved permission scope
produces a manual-review notification.

## Background behavior by platform

An operating-system reminder and an automatic AI request are separate actions.
The notification itself never performs the provider request.

| Platform | Reminder while DevDesk is closed | Automatic AI while DevDesk is closed |
| --- | --- | --- |
| Android | Native scheduled notifications, subject to permission and battery restrictions. | Requires a live DevDesk runtime; missed automatic runs recover on startup/resume. |
| Windows Microsoft Store / MSIX | Scheduled toast reminders where OS/package support permits. | Closed-app AI registration is not enabled in this implementation. |
| Windows Classic | Scheduled toast reminders where supported. | Optional **Windows closed-app AI** worker for automatic modes while the user remains signed in. |
| Linux desktop | No native closed-app reminder guarantee in this implementation. | No closed-app AI worker; use a live DevDesk runtime. |

### Android reminders

Notification permission is requested in the routine workflow when required.
If denied, the routine remains saved and overdue recovery runs when DevDesk
opens. Alarm-backed reminders use inexact allow-while-idle scheduling, so
delivery may be later than the selected minute. DevDesk does not request
special exact-alarm permission. Supported reboot/package-replacement events
restore reminders; vendor battery restrictions can still delay delivery.

### Windows reminders

Windows uses a rolling set of up to 64 upcoming occurrences because the
cross-platform API does not repeat toasts. DevDesk refreshes it on startup or
resume. Open DevDesk periodically to keep recurring reminders scheduled.
Unpackaged builds can have stricter notification/cancellation limits than MSIX.

### Windows closed-app AI

On a Classic Windows build, enable **Windows closed-app AI** in the routine
screen only when you want automatic AI while the window is closed. It is off
by default. The **DevDesk Background AI** scheduled task checks about once a
minute as your signed-in user with limited privileges.

The task contains no API key; credentials remain in DevDesk's protected store.
The worker skips Review first routines and exits if interactive DevDesk is
running. It uses the same saved permissions and audit protection as the app,
persists completion/failure, and attempts a result notification. Disable the
setting to remove the task. It does not run while the computer is shut down or
the user is logged out. Store/MSIX, Android, and Linux closed-app AI are not
enabled by this implementation.

## Recovery, notification taps, and duplicate safety

DevDesk checks overdue routines on startup, resume, and while running. The
latest missed occurrence is recovered when the app next opens. Concurrent due
checks are serialized. Disabling/deleting a routine reconciles or cancels its
pending OS schedules.

Tap a native notification to open the matching workspace and AI Harness,
including on a supported cold launch. Review first opens the saved prompt;
automatic modes open the result/review surface without injecting a second prompt.

Before an automatic provider request, DevDesk saves an occurrence lease and
audit record. After interruption it does not automatically send that same
occurrence again; it asks for manual review. This prevents duplicate scheduled
submissions without claiming exactly-once remote-provider delivery.

## Execution history and privacy

Automatic-run audits record trigger, mode, outcome, provider-send status,
whether user action is needed, and the optional read-only permissions.
They exclude prompt text, response text, credentials, environment values, and
file/workspace paths. The response belongs to the AI Harness conversation,
separately from the audit. If the pre-flight audit cannot be saved, the
automatic provider request is not sent.

## Manage routines from a terminal

The [DevDesk CLI](devdesk-cli.html) can list, inspect, add, enable, disable,
delete, and request manual review of routines. Supported routine commands
can use the running GUI's local broker.

```text
devdesk routines list --json
devdesk routines get <routine-id> --json
devdesk routines history --limit 20 --json
devdesk routines run <routine-id> --yes --json
devdesk routines check --yes --json
```

CLI `run` creates a manual-review fallback. CLI `check` leaves due AI Prepare/
AI Auto-Run occurrences for the app instead of consuming their schedule.
Neither automatically sends to a provider. Routine history omits notification
action payloads containing the prompt.

## Useful ideas

- Daily study priorities and a short self-test.
- Deadline review with the next three actions.
- End-of-day summary and tomorrow's first task.
- A polite message draft that always waits for approval.
- Weekly personal plan, budget questions, or document checklist.
