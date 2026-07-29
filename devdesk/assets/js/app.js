(() => {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('devdesk-theme');
  root.dataset.theme = storedTheme === 'light' ? 'light' : 'dark';

  const themeButtons = [...document.querySelectorAll('[data-theme-toggle]')];
  const updateThemeButtons = () => {
    const isDark = root.dataset.theme === 'dark';
    themeButtons.forEach((button) => {
      button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      button.setAttribute('aria-pressed', String(isDark));
      button.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    });
  };
  updateThemeButtons();
  themeButtons.forEach((button) => button.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    localStorage.setItem('devdesk-theme', nextTheme);
    updateThemeButtons();
  }));

  const menuButtons = [...document.querySelectorAll('[data-menu]')];
  const docsSidebar = document.querySelector('.docs-sidebar');
  const homeNavigation = document.querySelector('.top-nav');
  const drawer = docsSidebar || homeNavigation;
  const backdrop = document.querySelector('.mobile-drawer-backdrop');

  const setMenuExpanded = (expanded) => {
    menuButtons.forEach((button) => button.setAttribute('aria-expanded', String(expanded)));
  };
  const openMenu = () => {
    if (!drawer) return;
    drawer.classList.add('open');
    backdrop?.classList.add('open');
    document.body.classList.add('drawer-open');
    setMenuExpanded(true);
  };
  const closeMenu = () => {
    drawer?.classList.remove('open');
    backdrop?.classList.remove('open');
    document.body.classList.remove('drawer-open');
    setMenuExpanded(false);
  };

  setMenuExpanded(false);
  menuButtons.forEach((button) => button.addEventListener('click', () => {
    if (drawer?.classList.contains('open')) closeMenu();
    else openMenu();
  }));
  backdrop?.addEventListener('click', closeMenu);
  drawer?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
  });

  document.querySelectorAll('pre').forEach((pre) => {
    const button = document.createElement('button');
    button.className = 'copy-code';
    button.type = 'button';
    button.textContent = 'Copy';
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.innerText.replace(/^Copy\n/, ''));
        button.textContent = 'Copied';
        setTimeout(() => { button.textContent = 'Copy'; }, 1400);
      } catch (_) {
        button.textContent = 'Select text';
      }
    });
    pre.appendChild(button);
  });

  const overlay = document.querySelector('[data-search-overlay]');
  const input = document.querySelector('[data-search-input]');
  const results = document.querySelector('[data-search-results]');

  function openSearch() {
    if (!overlay) return;
    closeMenu();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    setTimeout(() => input?.focus(), 10);
  }

  function closeSearch() {
    overlay?.classList.remove('open');
    overlay?.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      closeSearch();
    }
    if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
      event.preventDefault();
      openSearch();
    }
  });

  document.querySelectorAll('[data-search]').forEach((button) => button.addEventListener('click', openSearch));
  overlay?.addEventListener('mousedown', (event) => {
    if (event.target === overlay) closeSearch();
  });

  const base = location.pathname.includes('/manual/') ? '../' : '';

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }[character]));
  }

  function renderSearch(value) {
    if (!results) return;
    const query = value.trim().toLowerCase();
    if (!query) {
      results.innerHTML = '<div class="empty-search">Start typing to search the complete manual.</div>';
      return;
    }

    const words = query.split(/\s+/);
    const items = (window.DEVDESK_SEARCH_INDEX || [])
      .map((item) => {
        const haystack = `${item.title} ${item.summary} ${item.group} ${item.text}`.toLowerCase();
        let score = 0;
        for (const word of words) {
          if (item.title.toLowerCase().includes(word)) score += 12;
          if (item.summary.toLowerCase().includes(word)) score += 5;
          if (item.group.toLowerCase().includes(word)) score += 3;
          if (haystack.includes(word)) score += 1;
        }
        return { ...item, score };
      })
      .filter((item) => item.score >= words.length)
      .sort((a, b) => b.score - a.score)
      .slice(0, 18);

    results.innerHTML = items.length
      ? items.map((item) => `<a class="search-result" href="${base}${item.url}"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.group)} · ${escapeHtml(item.summary)}</span></a>`).join('')
      : '<div class="empty-search">No matching manual topics.</div>';
  }

  input?.addEventListener('input', () => renderSearch(input.value));

  const headings = [...document.querySelectorAll('.article h2[id], .article h3[id]')];
  const tocLinks = [...document.querySelectorAll('.toc a')];
  if (headings.length && tocLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      tocLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-90px 0px -70% 0px' });
    headings.forEach((heading) => observer.observe(heading));
  }

  document.querySelectorAll('[data-download]').forEach((element) => {
    const key = element.dataset.download;
    const config = window.DEVDESK_SITE_CONFIG?.[key];
    if (!config) return;
    const label = element.querySelector('[data-download-label]');
    const note = element.querySelector('[data-download-note]');
    const link = element.querySelector('a[data-download-link]');
    const status = element.querySelector('[data-download-status]');
    if (label) label.textContent = config.label;
    if (note) note.textContent = config.note;
    if (status) {
      status.textContent = config.status === 'available' ? 'Available' : config.status === 'testing' ? 'Testing access' : 'Coming soon';
      status.classList.add(config.status);
    }
    if (link) {
      if (config.url) {
        link.href = config.url;
        link.removeAttribute('aria-disabled');
        link.setAttribute('aria-label', config.accessibleLabel || config.label);
        if (/^https?:\/\//.test(config.url)) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
      } else {
        link.removeAttribute('href');
        link.removeAttribute('target');
        link.removeAttribute('rel');
        link.setAttribute('aria-disabled', 'true');
        link.classList.add('disabled');
      }
    }
  });

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', async () => {
      const hadController = Boolean(navigator.serviceWorker.controller);
      let reloading = false;
      if (hadController) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (reloading) return;
          reloading = true;
          location.reload();
        });
      }

      try {
        const registration = await navigator.serviceWorker.register(`${base}sw.js`, { updateViaCache: 'none' });
        registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
        registration.addEventListener('updatefound', () => {
          const worker = registration.installing;
          worker?.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              worker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });
        await registration.update();
      } catch (error) {
        console.warn('DevDesk offline cache registration failed:', error);
      }
    });
  }
})();
