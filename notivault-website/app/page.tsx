import Link from "next/link";

const featureCards = [
  {
    number: "01",
    label: "Conversation Vault",
    title: "A deleted chat can leave a saved preview.",
    copy: "NotiVault keeps chat-style notifications by person or group and can mark a captured preview when the source app later reports it deleted.",
    visual: "chat",
  },
  {
    number: "02",
    label: "Smart Activity",
    title: "Status noise becomes a clear timeline.",
    copy: "Backups, downloads and changing progress updates live in Activity, away from your conversations.",
    visual: "activity",
  },
  {
    number: "03",
    label: "Media Vault",
    title: "Voice notes and media—when exposed.",
    copy: "Save notification-exposed photos, videos and voice notes into private app storage when Android and the source app permit access.",
    visual: "media",
  },
];

const moments = [
  "A WhatsApp message was deleted after its notification arrived",
  "A voice note vanished—but its accessible notification copy was saved",
  "A delivery address was buried under newer alerts",
  "A photo preview disappeared before you could open the chat",
];

const themes = [
  ["Bunny Blossom", "#ff75ad", "Signature"],
  ["Teddy Café", "#b77b54", "Cozy"],
  ["Sakura Dream", "#e5709b", "Soft"],
  ["Butterfly Garden", "#9372d5", "Airy"],
  ["Ocean Blue", "#1689a8", "Fresh"],
  ["Clean Neutral", "#5a7890", "Free"],
  ["Midnight", "#4767db", "Dark"],
  ["Midnight Neon", "#786cff", "Electric"],
  ["Cyber Gamer", "#00aaa4", "Tactical"],
  ["Carbon Pro", "#6b7b84", "Industrial"],
  ["Minimal Pure", "#68737c", "Quiet"],
  ["AMOLED Ultra", "#7f62ff", "True black"],
];

const faqs = [
  {
    q: "Can NotiVault show a WhatsApp message after it is deleted?",
    a: "It can preserve the notification preview if the message arrived after NotiVault was set up, WhatsApp was selected, Notification Access was enabled, and the notification was captured before deletion. It cannot recover messages directly from WhatsApp or retrieve content that never appeared in a notification.",
  },
  {
    q: "Does NotiVault open or read my other apps?",
    a: "No. After you explicitly enable Android Notification Access, NotiVault can receive notifications posted by apps you select. It does not sign in to those apps or read their internal databases.",
  },
  {
    q: "Can it recover messages from before installation?",
    a: "No. NotiVault can only preserve notifications received after setup. It cannot recover content that never appeared in a notification.",
  },
  {
    q: "Is my notification history uploaded?",
    a: "The current app is local-first: captured notification text and media stay in NotiVault’s private storage on your device. There is no cloud sync or advertising SDK.",
  },
  {
    q: "Will every photo, video or voice note be saved?",
    a: "No. Android and the source app decide what a notification exposes. NotiVault can preserve a full media copy only when an accessible notification URI is provided and that media type is enabled. Sometimes only a preview or text label is available.",
  },
  {
    q: "Can I control what is captured?",
    a: "Yes. Choose the apps NotiVault watches, switch media types on or off, select a retention period, revoke notification access, or clear the vault at any time.",
  },
  {
    q: "How will paid themes work?",
    a: "Clean Neutral is the free production theme. Optional theme purchases use Google Play Billing, show the final localized price before checkout, and can be restored for the purchasing Play account.",
  },
];

export default function Home() {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "NotiVault",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Android 8.0 and later",
    description:
      "A local-first Android vault that preserves selected chat notification previews before they are deleted.",
    author: {
      "@type": "Person",
      name: "Baisalya",
      url: "https://baisalya.com/",
      email: "mailto:baishalya1999@gmail.com",
      jobTitle: "Flutter & Android App Developer",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="NotiVault home">
          <span className="brand-mark" aria-hidden="true">
            <span className="ear ear-left" />
            <span className="ear ear-right" />
            <span className="brand-face" />
          </span>
          <span>NotiVault</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#deleted-messages">Deleted messages</a>
          <a href="#features">Features</a>
          <a href="#privacy">Privacy</a>
          <a href="#faq">FAQ</a>
          <a href="#developer">Developer</a>
        </nav>
        <Link className="nav-cta" href="/privacy-policy">
          Privacy policy
        </Link>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Deleted-message notification history for Android
          </div>
          <h1>
            Deleted from the chat.<br /><em>Still safe in your vault.</em>
          </h1>
          <p className="hero-lede">
            NotiVault can preserve messages from WhatsApp and other selected apps
            when they arrive as notifications—before they are deleted. Voice notes,
            photos and videos are saved when the notification exposes them.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#deleted-messages">
              How deleted capture works <span aria-hidden="true">→</span>
            </a>
            <a className="button button-secondary" href="#privacy">
              Explore privacy
            </a>
          </div>
          <div className="hero-proof" aria-label="NotiVault benefits">
            <span><i>✓</i> Works after setup</span>
            <span><i>✓</i> Selected apps only</span>
            <span><i>✓</i> Stored locally</span>
          </div>
        </div>

        <div className="hero-product" aria-label="NotiVault app preview">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="floating-chip chip-private">
            <span className="mini-lock" /> Private storage
          </div>
          <div className="floating-chip chip-search">Deleted? Search the saved preview</div>
          <div className="phone-wrap">
            <div className="phone">
              <div className="phone-speaker" />
              <div className="phone-screen">
                <div className="app-topbar">
                  <div>
                    <span className="app-kicker">YOUR PRIVATE SPACE</span>
                    <strong>Chats</strong>
                  </div>
                  <span className="app-avatar">N</span>
                </div>
                <div className="app-summary">
                  <div className="summary-copy">
                    <span>Today</span>
                    <strong>Deleted moments kept safe</strong>
                  </div>
                  <div className="bunny-mini" aria-hidden="true">
                    <i /><i /><b />
                  </div>
                </div>
                <div className="search-field">⌕&nbsp;&nbsp;Search messages</div>
                <div className="chat-card featured-chat">
                  <span className="chat-icon pink">S</span>
                  <div><strong>Study group</strong><p>Meet at 6 near the old gate</p><small className="later-deleted">Later deleted</small></div>
                  <time>10:42</time>
                </div>
                <div className="chat-card">
                  <span className="chat-icon violet">V</span>
                  <div><strong>Voice note</strong><p>0:24 · Saved when exposed</p></div>
                  <time>09:18</time>
                </div>
                <div className="chat-card">
                  <span className="chat-icon blue">D</span>
                  <div><strong>Delivery</strong><p>Your package is arriving today</p></div>
                  <time>08:05</time>
                </div>
                <div className="app-tabs">
                  <span className="active">●<small>Chats</small></span>
                  <span>◷<small>Activity</small></span>
                  <span>▣<small>Media</small></span>
                  <span>⚙<small>Settings</small></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-bar" aria-label="Core controls">
        <div><span>01</span><strong>You choose the apps</strong></div>
        <div><span>02</span><strong>Everything stays organized</strong></div>
        <div><span>03</span><strong>You control retention</strong></div>
        <div><span>04</span><strong>Clear the vault anytime</strong></div>
      </section>

      <section className="deleted-section section-shell" id="deleted-messages">
        <div className="deleted-copy">
          <span className="section-tag">The attention-grabbing reason</span>
          <h2>Someone deleted it.<br /><em>Your notification may remember it.</em></h2>
          <p>
            NotiVault watches only the apps you choose. When a chat notification
            arrives after setup, its preview is stored locally. If the source app
            later posts a deletion notice, the earlier captured preview can remain
            available and be marked as later deleted.
          </p>
          <div className="capture-rule">
            <strong>Important condition</strong>
            <span>The notification must arrive and be captured before the message is deleted.</span>
          </div>
          <p className="brand-disclaimer">
            WhatsApp is a trademark of its owner. NotiVault is independent and is
            not affiliated with or endorsed by WhatsApp or Meta.
          </p>
        </div>
        <div className="deleted-demo" aria-label="Example of a chat notification captured before deletion">
          <div className="deleted-demo-top"><span>CAPTURED NOTIFICATION</span><time>10:24</time></div>
          <div className="saved-message">
            <span className="saved-avatar">S</span>
            <div><strong>Study group</strong><p>Meet at 6 near the old gate</p></div>
          </div>
          <div className="deletion-state"><span>✓</span><p><strong>Preview kept locally</strong><small>Later marked deleted by the source notification</small></p></div>
          <div className="saved-voice"><span>●</span><p><strong>Voice note · 0:24</strong><small>Saved only when an accessible audio URI is exposed</small></p><i>▶</i></div>
          <div className="deleted-demo-foot">After setup · selected apps · notification content only</div>
        </div>
      </section>

      <section className="problem-section section-shell">
        <div className="section-heading split-heading">
          <div>
            <span className="section-tag">The problem</span>
            <h2>Chats can disappear.<br />Captured context doesn’t have to.</h2>
          </div>
          <p>
            A deletion or swipe should not decide whether a useful notification
            preview survives. NotiVault gives selected alerts a searchable second home.
          </p>
        </div>
        <div className="moment-grid">
          {moments.map((moment, index) => (
            <article className="moment-card" key={moment}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{moment}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-shell">
          <div className="section-heading centered-heading">
            <span className="section-tag light-tag">Made for finding, not hoarding</span>
            <h2>A vault with a place for everything.</h2>
            <p>Three focused views turn notification clutter into useful memory.</p>
          </div>
          <div className="feature-grid">
            {featureCards.map((feature) => (
              <article className="feature-card" key={feature.number}>
                <div className={`feature-visual visual-${feature.visual}`}>
                  {feature.visual === "chat" && (
                    <>
                      <div className="visual-bubble left">Did you save the address?<small>10:41</small></div>
                      <div className="visual-bubble right">Yes — it’s safe here.<small>10:42</small></div>
                    </>
                  )}
                  {feature.visual === "activity" && (
                    <>
                      <div className="progress-line"><i style={{ width: "78%" }} /></div>
                      <strong>Backup in progress</strong><span>78% complete</span>
                      <div className="status-pill">Live update grouped</div>
                    </>
                  )}
                  {feature.visual === "media" && (
                    <div className="media-tiles">
                      <i className="media-a" /><i className="media-b">▶</i><i className="media-c">◖◗</i>
                    </div>
                  )}
                </div>
                <div className="feature-body">
                  <span>{feature.number} / {feature.label}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="steps-section section-shell" id="how-it-works">
        <div className="steps-copy">
          <span className="section-tag">Simple by design</span>
          <h2>Set it once.<br />Find it when it matters.</h2>
          <p>
            NotiVault stays out of your way until you need it. You remain in
            control of access, capture and deletion.
          </p>
          <div className="steps-list">
            <div><span>1</span><p><strong>Enable notification access</strong><small>Only after a clear explanation and your choice.</small></p></div>
            <div><span>2</span><p><strong>Choose which apps to watch</strong><small>Keep the scope focused on what matters to you.</small></p></div>
            <div><span>3</span><p><strong>Search, filter and revisit</strong><small>Chats, activity and available media stay separated.</small></p></div>
          </div>
        </div>
        <div className="search-demo">
          <div className="demo-top"><span>⌕</span><strong>Search “invoice”</strong><kbd>3 results</kbd></div>
          <div className="result-card"><i className="result-icon blush">P</i><div><strong>Payment received</strong><p>Your invoice #NV-204 is ready…</p></div><time>Today</time></div>
          <div className="result-card"><i className="result-icon purple">W</i><div><strong>Work group</strong><p>I shared the revised invoice.</p></div><time>Tue</time></div>
          <div className="result-card"><i className="result-icon teal">D</i><div><strong>Downloads</strong><p>invoice-august.pdf • Complete</p></div><time>Mon</time></div>
          <div className="demo-note"><span>✓</span><p><strong>Found locally</strong>No cloud search required.</p></div>
        </div>
      </section>

      <section className="privacy-section" id="privacy">
        <div className="section-shell privacy-layout">
          <div className="privacy-visual">
            <div className="vault-rings ring-one" />
            <div className="vault-rings ring-two" />
            <div className="vault-core">
              <div className="lock-body"><i /></div>
              <span>ON DEVICE</span>
            </div>
            <div className="privacy-float float-one">No cloud sync</div>
            <div className="privacy-float float-two">No ad tracking</div>
            <div className="privacy-float float-three">Private storage</div>
          </div>
          <div className="privacy-copy">
            <span className="section-tag light-tag">Privacy is the product</span>
            <h2>Your history is personal.<br />It should feel that way.</h2>
            <p>
              Notification content can contain conversations, one-time codes,
              images and personal details. NotiVault is built to keep that
              history useful without turning it into an advertising profile.
            </p>
            <div className="privacy-points">
              <div><span>⌂</span><p><strong>Local-first storage</strong><small>Captured text and media stay inside private app storage.</small></p></div>
              <div><span>⊘</span><p><strong>No ads or data sale</strong><small>No advertising SDK and no sale of notification content.</small></p></div>
              <div><span>◎</span><p><strong>Control stays visible</strong><small>PIN, screenshot protection, retention and clear-vault tools.</small></p></div>
            </div>
            <Link className="text-link" href="/privacy-policy">
              Read the full privacy policy <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="themes-section section-shell" id="themes">
        <div className="section-heading split-heading theme-heading">
          <div>
            <span className="section-tag">A vault that feels like yours</span>
            <h2>Serious utility.<br />Twelve distinct moods.</h2>
          </div>
          <p>
            From quiet minimal surfaces to NotiVault’s Bunny Blossom signature,
            every theme is drawn in-app and stays crisp, responsive and offline.
          </p>
        </div>
        <div className="theme-stage">
          <div className="signature-card">
            <div className="signature-art">
              <span className="petal p1">♥</span><span className="petal p2">✦</span><span className="petal p3">❀</span>
              <div className="signature-bunny"><i /><i /><b /></div>
            </div>
            <div className="signature-copy">
              <span>NOTIVAULT SIGNATURE</span>
              <h3>Bunny Blossom</h3>
              <p>Rose, lavender, floating hearts, petals and a little personality.</p>
              <div><strong>₹99</strong><small>planned India price • one-time unlock</small></div>
            </div>
          </div>
          <div className="theme-list" aria-label="NotiVault theme collection">
            {themes.slice(1).map(([name, color, mood]) => (
              <div className="theme-row" key={name}>
                <i style={{ background: color }} />
                <strong>{name}</strong>
                <span>{mood}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="price-note">Final prices and availability are displayed by Google Play before purchase and may vary by country.</p>
      </section>

      <section className="faq-section section-shell" id="faq">
        <div className="faq-intro">
          <span className="section-tag">Clear answers</span>
          <h2>Know what the vault can — and cannot — do.</h2>
          <p>Good privacy starts with accurate expectations.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.q}>
              <summary>{faq.q}<span>+</span></summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="developer-section section-shell" id="developer">
        <div className="developer-card">
          <div className="developer-emblem" aria-hidden="true">
            <span>BR</span>
            <i>✦</i>
          </div>
          <div className="developer-copy">
            <span className="section-tag">Developer & support</span>
            <h2>Built independently by Baisalya.</h2>
            <p>
              NotiVault is designed and developed by Baisalya, a Flutter and
              Android app developer focused on useful, privacy-aware software.
              Visit the portfolio for more apps and development work, or use the
              support email for NotiVault questions.
            </p>
            <div className="developer-facts" aria-label="Developer details">
              <span><small>Developer</small><strong>Baisalya</strong></span>
              <span><small>Speciality</small><strong>Flutter & Android</strong></span>
              <span><small>Support</small><strong>baishalya1999@gmail.com</strong></span>
            </div>
            <div className="developer-actions">
              <a
                className="button button-primary"
                href="https://baisalya.com/"
                target="_blank"
                rel="noreferrer"
              >
                Visit developer website <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href="mailto:baishalya1999@gmail.com">
                Email support
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta section-shell">
        <div className="cta-card">
          <div className="cta-glow" />
          <span className="section-tag light-tag">Coming to Google Play</span>
          <h2>Catch the notification<br />before the chat deletes it.</h2>
          <p>Works after setup. Selected apps only. Media depends on what the notification exposes.</p>
          <div className="cta-actions">
            <a className="button button-light" href="#top">Meet NotiVault ↑</a>
            <Link className="button button-ghost" href="/privacy-policy">Review privacy</Link>
          </div>
        </div>
      </section>

      <aside className="creator-support" aria-label="Support NotiVault development">
        <div className="creator-support__copy">
          <span className="creator-support__eyebrow">Independent software</span>
          <strong>Support thoughtful NotiVault development</strong>
          <p>Support privacy-focused Android development directly. The NotiVault website intentionally has no advertising slot.</p>
        </div>
        <div className="creator-support__actions">
          <a href="https://www.buymeacoffee.com/baisalya" target="_blank" rel="noreferrer">Buy me a coffee ↗</a>
          <a href="mailto:baishalya1999@gmail.com?subject=NotiVault%20business%20inquiry">Business inquiry</a>
        </div>
      </aside>

      <footer className="site-footer">
        <div>
          <a className="brand footer-brand" href="#top"><span className="brand-mark small-mark" aria-hidden="true"><span className="ear ear-left" /><span className="ear ear-right" /><span className="brand-face" /></span><span>NotiVault</span></a>
          <p>Keep notification previews that chats may later delete.</p>
        </div>
        <div className="footer-links">
          <div><strong>Product</strong><a href="#deleted-messages">Deleted messages</a><a href="#features">Features</a><a href="#privacy">Privacy</a></div>
          <div><strong>Legal</strong><Link href="/privacy-policy">Privacy policy</Link><a href="#faq">FAQ</a></div>
          <div><strong>Developer</strong><a href="#developer">Developer details</a><a href="https://baisalya.com/" target="_blank" rel="noreferrer">Baisalya ↗</a><a href="mailto:baishalya1999@gmail.com">Email support</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Baisalya. All rights reserved.</span><span>Made with care for Android.</span></div>
      </footer>
    </main>
  );
}
