(() => {
  const body = document.body;
  const cfg = window.PAPERAID_SITE_CONFIG || {};

  const savedTheme = (() => { try { return localStorage.getItem('paperaid-site-theme'); } catch (_) { return null; } })();
  if (savedTheme === 'dark' || savedTheme === 'light') body.dataset.theme = savedTheme;
  else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) body.dataset.theme = 'dark';

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const next = body.dataset.theme === 'dark' ? 'light' : 'dark';
      body.dataset.theme = next;
      try { localStorage.setItem('paperaid-site-theme', next); } catch (_) {}
    });
  });

  const menu = document.querySelector('[data-mobile-nav]');
  document.querySelectorAll('[data-menu-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const open = menu?.classList.toggle('is-open') ?? false;
      button.setAttribute('aria-expanded', String(open));
    });
  });
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => menu.classList.remove('is-open')));

  const stores = {
    android: {
      url: String(cfg.androidStoreUrl || '').trim(),
      ready: String(cfg.androidStatus || '').trim() || 'Preparing first public release',
      liveLabel: 'Open Google Play ↗',
      waitLabel: 'Google Play · coming soon',
    },
    windows: {
      url: String(cfg.windowsStoreUrl || '').trim(),
      ready: String(cfg.windowsStatus || '').trim() || 'Preparing first public release',
      liveLabel: 'Open Microsoft Store ↗',
      waitLabel: 'Microsoft Store · coming soon',
    },
  };
  Object.entries(stores).forEach(([key, store]) => {
    document.querySelectorAll(`[data-store-link="${key}"]`).forEach((el) => {
      if (store.url) {
        el.href = store.url;
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
        el.removeAttribute('aria-disabled');
        if (el.dataset.dynamicLabel === 'true') el.textContent = store.liveLabel;
      } else {
        el.href = '#release-status';
        el.setAttribute('aria-disabled', 'true');
        if (el.dataset.dynamicLabel === 'true') el.textContent = store.waitLabel;
      }
    });
    document.querySelectorAll(`[data-store-status="${key}"]`).forEach((el) => { el.textContent = store.ready; });
  });
  document.querySelectorAll('[data-current-version]').forEach((el) => { el.textContent = cfg.currentVersion || '2.5.1'; });

  const manualSearch = document.querySelector('[data-manual-search]');
  const searchable = [...document.querySelectorAll('[data-search-section]')];
  manualSearch?.addEventListener('input', () => {
    const q = manualSearch.value.trim().toLowerCase();
    searchable.forEach((section) => {
      const text = `${section.dataset.searchSection || ''} ${section.textContent || ''}`.toLowerCase();
      section.hidden = q && !text.includes(q);
    });
  });

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
})();
