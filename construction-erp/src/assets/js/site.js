(() => {
  document.documentElement.classList.add('js');
  const cfg = window.CONSTRUCTION_ERP_CONFIG || {};
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];
  qa('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const toggle = q('.nav-toggle');
  const nav = q('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', e => {
      if (e.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: .08 }) : null;
  qa('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('visible'));

  qa('.faq-item').forEach(item => {
    const button = q('button', item);
    button?.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      const icon = q('span', button); if (icon) icon.textContent = open ? '−' : '+';
    });
  });

  const platformConfig = cfg.platforms || {};
  qa('[data-platform]').forEach(card => {
    const key = card.dataset.platform;
    const p = platformConfig[key] || {};
    const status = q('[data-platform-status]', card);
    const label = q('[data-platform-label]', card);
    const note = q('[data-platform-note]', card);
    if (label && p.label) label.textContent = p.label;
    if (note && p.releaseNote) note.textContent = p.releaseNote;
    const store = q('[data-platform-store]', card);
    const direct = q('[data-platform-direct]', card);
    const enableLink = (el, url) => {
      if (!el || !url) return;
      el.href = url;
      el.classList.remove('button-disabled');
      el.removeAttribute('aria-disabled');
      el.removeAttribute('tabindex');
      if (/^https?:\/\//.test(url)) { el.target = '_blank'; el.rel = 'noopener noreferrer'; }
    };
    enableLink(store, p.storeUrl);
    enableLink(direct, p.directUrl);
    const live = Boolean(p.enabled && (p.storeUrl || p.directUrl));
    if (status) { status.textContent = live ? 'Available' : 'Coming soon'; status.classList.toggle('live', live); }
  });

  const form = q('#support-form');
  if (form) {
    const requestedTopic = new URLSearchParams(window.location.search).get('topic');
    const topicSelect = q('select[name="topic"]', form);
    if (requestedTopic && topicSelect && [...topicSelect.options].some(option => option.value === requestedTopic)) {
      topicSelect.value = requestedTopic;
    }
  }
})();
