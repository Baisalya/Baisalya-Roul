# Settings and appearance

Settings controls how DevDesk looks, where you find help, backups, privacy,
updates, and the local-data reset. Changing a setting does not upload your
workspace.

## Appearance

Choose the options that are easiest to read:

- **Brightness:** system, light, or dark.
- **Palette:** an available color theme.
- **Contrast:** standard or high contrast.
- **Density:** comfortable for touch or compact for more information.

Use system brightness if your device often changes environments. Try high
contrast or a wider window when text is hard to read.

## Learning and documentation

- **DevDesk User Manual** opens the complete offline guide.
- **View Onboarding Again** replays the introduction without deleting data.
- **DevDesk Agent Connector** opens the Windows-only connector controls for an
  MCP-compatible client such as Codex or Gemini CLI.

The agent connector is stopped by default. Read
[AI Agent Connector](agent-connector.html) before enabling either Markdown
sharing or review proposals.

## Backups and privacy

Settings can export a backup file or a redacted backup copy, and it previews an
import before applying it. Protected secrets are not included in portable
backups. External project folders are separate from the Settings backup and
need their own copy, sync, or Git workflow.

Use the **Privacy Policy**, **Privacy Question**, and **Security Report** items
to understand data handling or contact the developer. Do not include tokens,
passwords, private source code, or sensitive request bodies in a public report.

## Updates and downloads

The **About** section opens the DevDesk website, Downloads page, support, and
Microsoft Store listing.

On Android and Windows, select **Check for Updates** to compare the installed
build with the public release record hosted on the official DevDesk website.
The check is platform-specific:

- Android opens Google Play when an update is available.
- Windows opens Microsoft Store when an update is available.

DevDesk does not download or install updates itself. A connection failure on
the first check leaves the app available; reconnect and try again later.

## Clear All Data

**Clear All Data** removes known DevDesk-private records, settings, privacy
acknowledgement, onboarding completion, update reminder data, and protected
secret records. It does not delete external project folders, exported files, or
information you already sent to another service.

Export a backup first if you need the private records. Separately verify any
external workspace folder you want to keep.

## Responsive behavior

Settings stays in one readable column on Android and uses a constrained content
column on wide Windows screens. On a small display, scroll the focused setting,
close optional panels, or use a wider window rather than reducing text until it
is difficult to read.
