function createSectionObserver(links) {
  if (!('IntersectionObserver' in window)) return null;

  const byId = new Map(links.map((link) => [link.getAttribute('href')?.slice(1), link]));
  const sections = [...byId.keys()]
    .filter(Boolean)
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const visible = new Map();
  const updateActive = () => {
    const candidates = [...visible.entries()]
      .filter(([, state]) => state.isIntersecting)
      .sort((a, b) => b[1].ratio - a[1].ratio || a[1].top - b[1].top);
    const activeId = candidates[0]?.[0] ?? (window.scrollY < 120 ? 'home' : null);
    links.forEach((link) => {
      const active = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      visible.set(entry.target.id, {
        isIntersecting: entry.isIntersecting,
        ratio: entry.intersectionRatio,
        top: entry.boundingClientRect.top,
      });
    });
    updateActive();
  }, { rootMargin: '-28% 0px -55% 0px', threshold: [0, 0.05, 0.2, 0.5] });

  sections.forEach((section) => observer.observe(section));
  updateActive();
  return observer;
}

export function initNavigation() {
  const nav = document.querySelector('.professional-nav');
  const menu = document.getElementById('nav-menu');
  const toggle = document.getElementById('nav-toggle');
  const links = [...document.querySelectorAll('.professional-nav .nav-link')];

  const setOpen = (open) => {
    if (!menu || !toggle) return;
    menu.classList.toggle('active', open);
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => setOpen(!menu?.classList.contains('active')));
  }

  links.forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  const syncHeader = () => nav?.classList.toggle('is-scrolled', window.scrollY > 18);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  createSectionObserver(links);
}
