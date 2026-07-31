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

## Android — closed testing

1. Open the Google Play link from an Android device.
2. Sign in with the Google account the developer added to the closed test.
3. Install the Play-delivered build.
4. Open DevDesk and complete the privacy acknowledgement and onboarding.
5. Use **Settings → About → Check for Updates** to compare the installed
   Android build with the official Android release record.

If you need test access, contact the developer through the public support page.
Do not post a tester email address, password, or access token publicly.

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
