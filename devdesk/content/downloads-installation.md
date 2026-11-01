# Downloads, installation, and updates

Use the official [DevDesk Downloads page](../downloads.html) for every
platform. It is the single source for current download status, release notes,
and the public update record.

## Windows — available now

1. Open the [official DevDesk Microsoft Store listing](https://apps.microsoft.com/detail/9N8NH1LMZX1S?hl=en-us&gl=IN&ocid=pdpshare).
2. Confirm the product is **DevDesk** and the publisher is expected.
3. Select **Get** or **Install**.
4. Start DevDesk from the Start menu.
5. Open **Settings → About → Check for Updates** whenever you want DevDesk to
   compare the installed Windows build with the official release record.

When a newer Windows build is available, DevDesk opens Microsoft Store. The
Store can update apps automatically; its **Library** also lets you search for
updates manually.

## Android — available now

1. Open the Google Play link from an Android device.
2. Sign in with your Google account.
3. Install the Play-delivered build.
4. Open DevDesk and complete the privacy acknowledgement and onboarding.
5. Use **Settings → About → Check for Updates** to compare the installed
   Android build with the official Android release record.

## Desktop CLI and routine support

The reviewed 1.2.5 packaging includes a standalone `devdesk` CLI: Windows
Store/MSIX uses an App execution alias; the Classic installer adds its CLI to
the current user's PATH. Open a fresh terminal and run `devdesk --version`,
`devdesk --help`, and `devdesk doctor` to confirm your installed build's surface.
See the [command-line guide](devdesk-cli.html) for installation, examples, and
the local broker used by supported commands while the GUI is open.

Linux source packaging produces a portable archive and, when supported, a
Debian package with `devdesk` and `devdesk-gui`. A public Linux package is not
linked by this website yet.

[Routine reminders](notifications-routines.html) use native Android/Windows
notifications. Opt-in closed-app AI execution is limited to Windows Classic
while signed in; it is not enabled for Store/MSIX, Android, or Linux. Store
buttons install the published build, which can differ from reviewed source.

## What DevDesk checks

DevDesk downloads only the small public
[`releases.json`](../releases.json) record from this website. It compares the
installed version and build number on your device with the record for the
current platform. Your files, notes, workspace data, API requests, and
credentials are not sent with that check.

The result can be:

- **Up to date** — the installed build is current or newer.
- **Update available** — you can choose **Later** and keep working.
- **Update required** — the installed build is below the supported-version
  floor. DevDesk opens the trusted store page; it never installs an update by
  itself.

A connection error on the first check does not lock the app. Try again later
from Settings or confirm that the Downloads page opens in your browser.

## Download safety

Use only the Microsoft Store, Google Play, or a package explicitly linked by
the official Downloads page. Avoid unrelated third-party download sites.

If a future Windows installer, portable ZIP, or Android APK is offered, the
page will state whether it is available and can publish a SHA-256 checksum.
For a portable Windows build, keep `devdesk.exe`, its DLL files, and the
`data` directory together.

## Before a major update

- Export a DevDesk backup if you want a copy of app-private records.
- Back up external project folders separately; they are not part of the
  app-private backup.
- Finish or resolve cloud-sync and Git conflicts before opening the same folder
  on another device.

## macOS and iOS

macOS and iOS remain **Not released** until signed, tested public packages are
available. A Flutter project scaffold is not a public release.
