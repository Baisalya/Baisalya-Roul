import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How NotiVault accesses, stores, uses and protects notification data on Android.",
  alternates: { canonical: "/privacy-policy" },
};

const toc = [
  ["overview", "Overview"],
  ["data", "Data we handle"],
  ["use", "How data is used"],
  ["storage", "Storage & retention"],
  ["sharing", "Sharing & third parties"],
  ["permissions", "Permissions"],
  ["security", "Security"],
  ["choices", "Your choices"],
  ["children", "Children"],
  ["changes", "Policy changes"],
  ["contact", "Contact"],
];

export default function PrivacyPolicy() {
  return (
    <main className="policy-page">
      <header className="site-header policy-header">
        <Link className="brand" href="/" aria-label="NotiVault home">
          <span className="brand-mark" aria-hidden="true">
            <span className="ear ear-left" />
            <span className="ear ear-right" />
            <span className="brand-face" />
          </span>
          <span>NotiVault</span>
        </Link>
        <nav className="desktop-nav" aria-label="Privacy policy navigation">
          <Link href="/#features">Features</Link>
          <Link href="/#privacy">Privacy</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
        <Link className="nav-cta" href="/">Back to website</Link>
      </header>

      <section className="policy-hero">
        <span className="section-tag">Plain-language data practices</span>
        <h1>Privacy Policy</h1>
        <p>
          NotiVault handles sensitive notification content. This policy explains
          exactly what the Android app can access, why it is needed, where it is
          kept, and the controls available to you.
        </p>
        <div className="policy-meta">
          <span>Effective: 13 August 2026</span>
          <span>Last updated: 13 August 2026</span>
          <span>App: NotiVault</span>
          <span>Developer: Baisalya</span>
        </div>
      </section>

      <div className="policy-layout">
        <aside className="policy-toc" aria-label="Privacy policy contents">
          <strong>On this page</strong>
          {toc.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </aside>

        <article className="policy-content">
          <div className="policy-callout">
            <strong>The short version</strong>
            <p>
              NotiVault uses Android Notification Access only after you enable it.
              Notifications from apps you select are organized in private storage
              on your device. NotiVault does not sell notification data, use it for
              advertising, or upload notification content to a NotiVault cloud.
            </p>
          </div>

          <section id="overview">
            <h2>1. Overview and scope</h2>
            <p>
              This Privacy Policy applies to the NotiVault Android application
              (package name <code>com.notivault.app</code>) developed by Baisalya,
              and to this informational website. NotiVault is a local-first utility
              that preserves and organizes notifications from apps selected by the
              user.
            </p>
            <p>
              Notification content may contain personal and sensitive information,
              including private conversations, transaction updates, one-time codes,
              images, voice messages, and other details chosen by the sending app.
              Please use NotiVault only on a device you own or are authorized to
              manage.
            </p>
          </section>

          <section id="data">
            <h2>2. Data the app accesses or creates</h2>
            <p>
              The exact data available to NotiVault depends on Android, the sending
              app, the notification itself, and the settings you choose.
            </p>
            <table className="policy-table">
              <thead><tr><th>Data category</th><th>Examples</th><th>Where it goes</th></tr></thead>
              <tbody>
                <tr><td>Notification content</td><td>App/package identity, title, sender, message preview, timestamps, grouping, progress, update and removal state.</td><td>Stored locally in NotiVault private app storage.</td></tr>
                <tr><td>Notification-exposed media</td><td>Photos, video files, thumbnails or voice messages when Android provides an accessible URI.</td><td>Copied locally only for media types you enable.</td></tr>
                <tr><td>Installed/launchable app identity</td><td>App name, package name and icon used to show the app-selection list.</td><td>Read on-device so you can select which apps to watch; not uploaded by NotiVault.</td></tr>
                <tr><td>Your settings</td><td>Selected apps, capture choices, retention period, theme, brightness, PIN state and screenshot-protection preference.</td><td>Stored locally on the device.</td></tr>
                <tr><td>Purchase information</td><td>Product identifier, purchase status and purchase token for optional themes or premium products.</td><td>Processed through Google Play Billing; notification content is not included.</td></tr>
              </tbody>
            </table>
            <h3>Data NotiVault does not intentionally access</h3>
            <ul>
              <li>NotiVault does not sign in to, scrape, or read the private databases of other apps.</li>
              <li>It does not recover notifications that occurred before it was installed and enabled.</li>
              <li>It does not request contacts, SMS, call logs, precise location, camera, microphone, Accessibility Service, root, or broad external-storage access.</li>
              <li>It does not create a NotiVault cloud account or advertising profile.</li>
            </ul>
          </section>

          <section id="use">
            <h2>3. How the data is used</h2>
            <p>The accessed data is used only to provide user-facing NotiVault functions:</p>
            <ul>
              <li>build a searchable notification history;</li>
              <li>group chat-style notifications into conversations;</li>
              <li>separate status, backup, download, and other activity notifications;</li>
              <li>display locally preserved media when the source notification exposes it;</li>
              <li>apply search, date, media, app, and removed-notification filters;</li>
              <li>enforce the retention and capture settings you choose; and</li>
              <li>verify and restore optional purchases through Google Play.</li>
            </ul>
            <p>
              NotiVault does not use notification content for targeted advertising,
              behavioral profiling, credit decisions, or sale to data brokers.
            </p>
          </section>

          <section id="storage">
            <h2>4. Local storage, retention and deletion</h2>
            <p>
              Notification records and preserved media are stored in NotiVault’s
              private application storage on your Android device. The app does not
              provide cloud synchronization. Android backup is disabled for the app.
            </p>
            <p>
              You control the local retention period. Records older than the selected
              period may be automatically removed. You can also use <strong>Clear all
              saved history</strong> to delete captured notification records and media.
              Turning off a media type stops future capture but does not automatically
              delete items already saved.
            </p>
            <p>
              Uninstalling NotiVault normally removes its private local app data as
              managed by Android. Revoking Notification Access stops future notification
              access but does not by itself erase previously saved local data; use the
              in-app clear function when you want to erase it first.
            </p>
          </section>

          <section id="sharing">
            <h2>5. Data sharing, sale and third parties</h2>
            <h3>No sale or advertising use</h3>
            <p>
              NotiVault does not sell notification content or preserved media. The
              current app does not contain an advertising or behavioral-analytics SDK.
            </p>
            <h3>Google Play Billing</h3>
            <p>
              If you view, buy, or restore a paid digital product, the app communicates
              with Google Play to retrieve product information and process the purchase.
              Google may process account, device, payment, fraud-prevention, and purchase
              information under the applicable <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a>.
              NotiVault does not send your captured notification text or media as part of
              the billing request.
            </p>
            <h3>App updates and voluntary reviews</h3>
            <p>
              The app may ask Google Play whether a newer NotiVault release is available
              and show an update prompt. If you choose to rate NotiVault, the app opens
              its Google Play listing, where Google controls the final rating and review
              submission. Captured notification content is not included in update or
              review requests.
            </p>
            <h3>External links</h3>
            <p>
              Links to the developer portfolio, Google services, or other websites open
              outside NotiVault and are governed by those services’ own privacy practices.
            </p>
            <h3>Legal requirements</h3>
            <p>
              Because notification content is not held on a NotiVault server, the
              developer ordinarily cannot access or produce it. Information actually held
              by the developer may be disclosed if required by applicable law or a valid
              legal process.
            </p>
          </section>

          <section id="permissions">
            <h2>6. Permissions and sensitive access</h2>
            <h3>Notification Access</h3>
            <p>
              Android Notification Access is essential to NotiVault’s core function. You
              must enable it manually in Android settings. When enabled, NotiVault’s
              notification-listener service can run in the background and receive new,
              updated, and removed notifications even when the NotiVault screen is not
              open. The app then applies your selected-app and media preferences.
            </p>
            <h3>App visibility</h3>
            <p>
              NotiVault queries launchable apps so it can display the app picker. It does
              not request Android’s broad <code>QUERY_ALL_PACKAGES</code> permission.
            </p>
            <h3>Internet and billing</h3>
            <p>
              Internet access is included for Google Play Billing product and purchase
              operations. Notification history and media remain local and are not uploaded
              merely because internet access exists.
            </p>
          </section>

          <section id="security">
            <h2>7. Security measures</h2>
            <p>NotiVault uses measures designed to reduce unauthorized access, including:</p>
            <ul>
              <li>Android private application storage;</li>
              <li>Android backup disabled for the application;</li>
              <li>cleartext network traffic disabled;</li>
              <li>optional local PIN protection; and</li>
              <li>screenshot and screen-recording protection enabled by default for sensitive app windows.</li>
            </ul>
            <p>
              No security measure is perfect. Anyone with sufficient control of an unlocked,
              compromised, rooted, or otherwise insecure device may be able to access local
              information. Keep Android updated and use device-level screen security.
            </p>
          </section>

          <section id="choices">
            <h2>8. Your controls and choices</h2>
            <ul>
              <li>Decline or revoke Notification Access in Android settings.</li>
              <li>Select or deselect the apps whose notifications are stored.</li>
              <li>Enable or disable future photo, video, and voice-message capture.</li>
              <li>Choose a retention period for local cleanup.</li>
              <li>Clear all saved history and captured media inside the app.</li>
              <li>Uninstall NotiVault to remove its application storage through Android.</li>
              <li>Manage or cancel subscriptions through Google Play, where applicable.</li>
            </ul>
            <p>
              NotiVault currently has no cloud account and no server-side notification
              database, so there is no separate remote account or notification archive to
              delete. Purchase records held by Google are controlled through Google Play.
            </p>
          </section>

          <section id="children">
            <h2>9. Children’s privacy</h2>
            <p>
              NotiVault is a general utility and is not directed to children. It should not
              be used to monitor another person’s notifications without authorization. A
              parent or guardian who allows a minor to use the app should review the
              notification-access implications and device settings with them.
            </p>
          </section>

          <section id="changes">
            <h2>10. Changes to this policy</h2>
            <p>
              This policy may be updated when NotiVault’s features, SDKs, data practices, or
              legal requirements change. The effective date at the top will be revised. A
              material change affecting sensitive data access or use will also require the
              appropriate in-app disclosure and user choice before the new use begins.
            </p>
          </section>

          <section id="contact">
            <h2>11. Contact</h2>
            <p>
              NotiVault is developed by <strong>Baisalya</strong>. For privacy questions,
              support, or concerns, email:
            </p>
            <p><a href="mailto:baishalya1999@gmail.com">baishalya1999@gmail.com</a></p>
            <p>
              <a href="https://baisalya.github.io/Baisalya-Roul/" target="_blank" rel="noreferrer">
                baisalya.github.io/Baisalya-Roul/ ↗
              </a>
            </p>
            <p>
              When contacting the developer, please do not send private notification
              screenshots, one-time codes, financial information, or other sensitive
              content unless it is strictly necessary and you understand the risk.
            </p>
          </section>

          <Link className="policy-back" href="/">← Return to NotiVault</Link>
        </article>
      </div>

      <footer className="site-footer">
        <div><span className="brand footer-brand">NotiVault</span><p>Private notification history with a softer little personality.</p></div>
        <div className="footer-links"><div><strong>Product</strong><Link href="/">Home</Link><Link href="/#features">Features</Link></div><div><strong>Legal</strong><Link href="/privacy-policy">Privacy policy</Link></div><div><strong>Developer</strong><a href="https://baisalya.github.io/Baisalya-Roul/" target="_blank" rel="noreferrer">Baisalya ↗</a></div></div>
        <div className="footer-bottom"><span>© 2026 Baisalya. All rights reserved.</span><span>Last updated 13 August 2026.</span></div>
      </footer>
    </main>
  );
}
