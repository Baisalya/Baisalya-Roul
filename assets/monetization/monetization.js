(() => {
  const config = window.BAISALYA_MONETIZATION || {};
  const client = String(config.adsenseClient || '').trim();
  const slot = String(config.manualSlot || '').trim();
  const autoAds = config.autoAds === true;
  const validClient = /^ca-pub-\d{10,20}$/.test(client);
  const validSlot = /^\d{6,20}$/.test(slot);
  const placements = [...document.querySelectorAll('[data-ad-unit="manual"]')];

  if (!config.enabled || !config.consentReady || !validClient || !validSlot || (!autoAds && !placements.length)) return;

  const protectSideRailZones = () => {
    document
      .querySelectorAll('header, .campaign-banner, .mobile-cta')
      .forEach((zone) => zone.setAttribute('google-side-rail-overlap', 'false'));
  };

  const ensureLibrary = () => {
    if (document.getElementById('baisalya-adsense')) return;
    const script = document.createElement('script');
    script.id = 'baisalya-adsense';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    script.addEventListener('error', () => {
      placements.forEach((placement) => {
        placement.hidden = true;
        placement.classList.remove('is-pending', 'is-active');
      });
    }, { once: true });
    document.head.appendChild(script);
  };

  const renderPlacement = (placement) => {
    if (placement.dataset.adInitialized === 'true') return;
    const unit = document.createElement('ins');
    unit.className = 'adsbygoogle';
    unit.style.display = 'block';
    unit.dataset.adClient = client;
    unit.dataset.adSlot = slot;
    unit.dataset.adFormat = 'auto';
    unit.dataset.fullWidthResponsive = 'true';

    let settleTimer;
    const updateVisibility = () => {
      const status = unit.dataset.adStatus;
      if (status === 'filled') {
        clearTimeout(settleTimer);
        if (!placement.querySelector('.monetization-ad__label')) {
          const label = document.createElement('span');
          label.className = 'monetization-ad__label';
          label.textContent = 'Advertisement';
          placement.prepend(label);
        }
        placement.classList.remove('is-pending');
        placement.classList.add('is-active');
        return;
      }
      if (status === 'unfilled' || status === 'unfill-optimized') {
        clearTimeout(settleTimer);
        placement.hidden = true;
        placement.classList.remove('is-pending', 'is-active');
      }
    };

    new MutationObserver(updateVisibility).observe(unit, {
      attributes: true,
      attributeFilter: ['data-ad-status'],
    });

    placement.replaceChildren(unit);
    placement.hidden = false;
    placement.classList.add('is-pending');
    placement.dataset.adInitialized = 'true';
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) { /* Library can retry after load. */ }
    settleTimer = window.setTimeout(() => {
      if (unit.dataset.adStatus !== 'filled') {
        placement.hidden = true;
        placement.classList.remove('is-pending', 'is-active');
      }
    }, 4000);
  };

  const activate = () => {
    protectSideRailZones();
    ensureLibrary();
    // Placements start with the native `hidden` attribute so disabled ads never
    // reserve empty space. A hidden element cannot intersect the viewport, so
    // observing it before rendering creates a deadlock. Each eligible page has
    // one restrained slot; initialize it once the consent/config gate passes.
    placements.forEach(renderPlacement);
  };

  if ('requestIdleCallback' in window) requestIdleCallback(activate, { timeout: 1800 });
  else window.addEventListener('load', activate, { once: true });
})();
