# Notifications and AI routines

DevDesk includes a local Notification Center and review-first AI routines for
students, professionals, and everyday users. Open the bell from Home or a
standard tool bar.

## Notification Center

- The badge shows unread DevDesk notifications.
- Open an item to mark it read and follow its in-app action.
- Swipe to delete, mark every item read, or clear read items.
- App notification records stay in DevDesk local storage and can be included in
  a DevDesk backup.

The current release does **not** request access to notifications from WhatsApp,
Facebook, or other apps. It does not silently reply or post.

## Create a review-first AI routine

1. Open **Notifications & Routines**.
2. Select **AI Routines**, then **New routine**.
3. Start from Study plan, Deadline check, Daily summary, Message draft, or a
   custom prompt.
4. Choose Once, Daily, Weekdays, or Weekly and select the next time.
5. Keep the routine enabled.
6. When it is due, open the notification and review the prepared prompt in AI
   Harness.

A routine never sends a provider request, contact reply, or social post on its
own. It prepares a prompt and waits for the user's decision.

## Current background boundary

Phase 1 routines are checked while DevDesk is running. If the app was closed at
the scheduled time, the latest missed occurrence is recovered when DevDesk next
opens. This is not yet an Android or Windows operating-system background alarm.

## Native quick-access roadmap

The next platform-specific phases are deliberately separate because they need
sensitive operating-system permissions and Store review:

- Android home-screen widget and app-owned scheduled notifications;
- optional Android notification listener with prominent disclosure, per-app
  allowlist, local-only default, revoke/delete controls, and inline reply only
  when the source notification exposes a supported reply action;
- Windows app-owned scheduled notifications and consent-based notification
  listener with AI draft, copy, share, and open-source-app actions;
- a separate Windows 11 Widget Board provider built with the Windows App SDK.

Windows does not provide a generic reply API for arbitrary third-party
notifications. Silent WhatsApp/Facebook personal-account automation is not a
DevDesk feature. Future supported publishing must use a user-confirmed system
share surface or an official, separately connected Business/Page integration.

## Useful ideas

- Daily study priorities and a short self-test.
- Deadline review with the next three actions.
- End-of-day summary and tomorrow's first task.
- A polite message draft that always waits for approval.
- Weekly personal plan, budget questions, or document checklist.
