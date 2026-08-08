(() => {
  const BUILD_ID = '20260801.6';
  const root = document.documentElement;
  let storedTheme = null;
  try {
    storedTheme = localStorage.getItem('devdesk-theme');
  } catch (_) {
    // Storage can be unavailable in a private Android WebView.
  }
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
    try {
      localStorage.setItem('devdesk-theme', nextTheme);
    } catch (_) {
      // The theme still works for the current page when storage is unavailable.
    }
    updateThemeButtons();
  }));

  const menuButtons = [...document.querySelectorAll('[data-menu]')];
  const docsSidebar = document.querySelector('.docs-sidebar');
  const homeNavigation = document.querySelector('.top-nav');
  const drawer = docsSidebar || homeNavigation;
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  let drawerClose = null;

  if (drawer) {
    drawerClose = document.createElement('button');
    drawerClose.className = 'drawer-close';
    drawerClose.type = 'button';
    drawerClose.setAttribute('aria-label', 'Close navigation');
    drawerClose.textContent = '×';
    drawer.prepend(drawerClose);
  }

  const setMenuExpanded = (expanded) => {
    menuButtons.forEach((button) => {
      button.setAttribute('aria-expanded', String(expanded));
      button.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
    });
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
  drawerClose?.addEventListener('click', closeMenu);
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

  const demoVideo = document.querySelector('[data-demo-video]');
  const demoLanguagePanel = document.querySelector('[data-demo-language-panel]');
  if (demoVideo && demoLanguagePanel) {
    const trackButtons = [...demoLanguagePanel.querySelectorAll('[data-demo-track]')];
    const trackLabel = demoLanguagePanel.querySelector('[data-demo-track-label]');
    const trackStatus = demoLanguagePanel.querySelector('[data-demo-track-status]');
    const audioStatus = demoLanguagePanel.querySelector('[data-demo-audio-status]');
    const volumeControl = demoLanguagePanel.querySelector('[data-demo-volume]');
    const narration = new Audio();
    narration.preload = 'metadata';
    let selectedButton = trackButtons.find((button) => !button.dataset.demoTrack) || trackButtons[0];
    let availableNarrations = 0;

    const setTrackStatus = (message) => {
      if (trackStatus) trackStatus.textContent = message;
    };

    const updateTrackButtons = () => {
      trackButtons.forEach((button) => {
        const selected = button === selectedButton;
        button.setAttribute('aria-pressed', String(selected));
      });
      if (trackLabel) trackLabel.textContent = selectedButton?.dataset.trackName || 'Silent demo';
    };

    const syncNarrationTime = (force = false) => {
      if (!narration.src || !Number.isFinite(demoVideo.currentTime)) return;
      if (force || Math.abs(narration.currentTime - demoVideo.currentTime) > 0.28) {
        try {
          narration.currentTime = demoVideo.currentTime;
        } catch (_) {
          // Metadata may still be loading; the next media event retries the sync.
        }
      }
    };

    const playNarration = async () => {
      if (!narration.src || demoVideo.paused || demoVideo.ended) return;
      syncNarrationTime();
      try {
        await narration.play();
      } catch (_) {
        setTrackStatus('Select the narration language again to allow audio playback on this device.');
      }
    };

    const selectTrack = async (button, remember = true) => {
      if (!button || button.disabled) return;
      selectedButton = button;
      updateTrackButtons();
      narration.pause();
      narration.removeAttribute('src');
      narration.load();

      const source = button.dataset.demoTrack;
      if (!source) {
        if (volumeControl) volumeControl.disabled = true;
        setTrackStatus('Silent playback selected. Choose a narration language whenever a voice-over is available.');
      } else {
        narration.src = source;
        narration.volume = Number(volumeControl?.value ?? 1);
        narration.playbackRate = demoVideo.playbackRate;
        narration.load();
        if (volumeControl) volumeControl.disabled = false;
        syncNarrationTime(true);
        setTrackStatus(`${button.dataset.trackName} narration selected. Playback stays synchronized with the video.`);
        await playNarration();
      }

      if (remember) {
        try {
          localStorage.setItem('devdesk-demo-narration', source || 'silent');
        } catch (_) {
          // The selected track still works for this visit when storage is unavailable.
        }
      }
    };

    trackButtons.forEach((button) => button.addEventListener('click', () => selectTrack(button)));
    volumeControl?.addEventListener('input', () => {
      narration.volume = Number(volumeControl.value);
    });

    demoVideo.addEventListener('play', playNarration);
    demoVideo.addEventListener('playing', playNarration);
    demoVideo.addEventListener('pause', () => narration.pause());
    demoVideo.addEventListener('waiting', () => narration.pause());
    demoVideo.addEventListener('seeking', () => syncNarrationTime(true));
    demoVideo.addEventListener('seeked', () => {
      syncNarrationTime(true);
      playNarration();
    });
    demoVideo.addEventListener('timeupdate', () => syncNarrationTime());
    demoVideo.addEventListener('ratechange', () => {
      narration.playbackRate = demoVideo.playbackRate;
      syncNarrationTime(true);
    });
    demoVideo.addEventListener('ended', () => {
      narration.pause();
      narration.currentTime = 0;
    });
    window.addEventListener('pagehide', () => narration.pause());

    narration.addEventListener('error', () => {
      if (selectedButton?.dataset.demoTrack) {
        selectedButton.disabled = true;
        selectTrack(trackButtons.find((button) => !button.dataset.demoTrack), false);
        setTrackStatus('That narration file is unavailable. Silent playback has been restored.');
      }
    });

    const probeNarration = async (button) => {
      const source = button.dataset.demoTrack;
      if (!source || location.protocol === 'file:') return false;
      try {
        const response = await fetch(new URL(source, location.href), {
          method: 'HEAD',
          cache: 'no-store',
        });
        if (!response.ok) return false;
        button.disabled = false;
        button.querySelector('small')?.remove();
        availableNarrations += 1;
        return true;
      } catch (_) {
        return false;
      }
    };

    Promise.all(trackButtons.map(probeNarration)).then(() => {
      if (audioStatus) {
        audioStatus.textContent = availableNarrations
          ? `${availableNarrations} voice-over${availableNarrations === 1 ? '' : 's'} ready`
          : 'Voice-overs coming soon';
        audioStatus.classList.toggle('available', availableNarrations > 0);
      }

      let storedTrack = null;
      try {
        storedTrack = localStorage.getItem('devdesk-demo-narration');
      } catch (_) {
        // Silent remains the default when storage is unavailable.
      }
      const storedButton = storedTrack && storedTrack !== 'silent'
        ? trackButtons.find((button) => button.dataset.demoTrack === storedTrack && !button.disabled)
        : null;
      if (storedButton) selectTrack(storedButton, false);
      else updateTrackButtons();
    });
  }

  const supportAssistantScript = document.createElement('script');
  supportAssistantScript.src = `${base}assets/js/support-assistant.js?v=${BUILD_ID}`;
  supportAssistantScript.defer = true;
  document.head.appendChild(supportAssistantScript);

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', async () => {
      const hadController = Boolean(navigator.serviceWorker.controller);
      let reloading = false;

      const showUpdateStatus = (message) => {
        let status = document.querySelector('[data-update-status]');
        if (!status) {
          status = document.createElement('div');
          status.className = 'update-status';
          status.dataset.updateStatus = '';
          status.setAttribute('role', 'status');
          status.setAttribute('aria-live', 'polite');
          document.body.appendChild(status);
        }
        status.textContent = message;
        requestAnimationFrame(() => status.classList.add('visible'));
      };

      if (hadController) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (reloading) return;
          reloading = true;
          showUpdateStatus('DevDesk updated. Loading the newest design…');
          window.setTimeout(() => location.reload(), 180);
        });
      }

      try {
        const workerUrl = new URL(`${base}sw.js`, location.href);
        workerUrl.searchParams.set('v', BUILD_ID);
        const registration = await navigator.serviceWorker.register(workerUrl, {
          scope: base || './',
          updateViaCache: 'none',
        });
        registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
        registration.addEventListener('updatefound', () => {
          const worker = registration.installing;
          worker?.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateStatus('A fresh DevDesk design is ready. Updating…');
              worker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });
        await registration.update();

        const checkForUpdates = () => registration.update().catch(() => {});
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') checkForUpdates();
        });
        window.addEventListener('online', checkForUpdates);
        window.addEventListener('pageshow', (event) => {
          if (event.persisted) checkForUpdates();
        });
      } catch (error) {
        console.warn('DevDesk offline cache registration failed:', error);
      }
    });
  }
})();
