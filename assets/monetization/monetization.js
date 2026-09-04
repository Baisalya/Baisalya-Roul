(() => {
  const config = window.BAISALYA_MONETIZATION || {};
  const client = String(config.adsenseClient || '').trim();
  const slot = String(config.manualSlot || '').trim();
  const validClient = /^ca-pub-\d{10,20}$/.test(client);
  const validSlot = /^\d{6,20}$/.test(slot);
  const placements = [...document.querySelectorAll('[data-ad-unit="manual"]')];

  if (!config.enabled || !config.consentReady || !validClient || !validSlot || !placements.length) return;

  const ensureLibrary = () => {
    if (document.getElementById('baisalya-adsense')) return;
    const script = document.createElement('script');
    script.id = 'baisalya-adsense';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    document.head.appendChild(script);
  };

  const renderPlacement = (placement) => {
    if (placement.dataset.adInitialized === 'true') return;
    const label = document.createElement('span');
    label.className = 'monetization-ad__label';
    label.textContent = 'Advertisement';

    const unit = document.createElement('ins');
    unit.className = 'adsbygoogle';
    unit.style.display = 'block';
    unit.dataset.adClient = client;
    unit.dataset.adSlot = slot;
    unit.dataset.adFormat = 'auto';
    unit.dataset.fullWidthResponsive = 'true';

    placement.replaceChildren(label, unit);
    placement.hidden = false;
    placement.classList.add('is-active');
    placement.dataset.adInitialized = 'true';
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) { /* Library can retry after load. */ }
  };

  const activate = () => {
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
