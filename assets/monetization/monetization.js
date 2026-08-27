(() => {
  const config = window.BAISALYA_MONETIZATION || {};
  const client = String(config.adsenseClient || '').trim();
  const slot = String(config.manualSlot || '').trim();
  const validClient = /^ca-pub-\d{10,20}$/.test(client);
  const validSlot = /^\d{6,20}$/.test(slot);
  const placements = [...document.querySelectorAll('[data-ad-unit="manual"]')];

  if (!config.enabled || !config.consentReady || !validClient || !validSlot || !placements.length) return;

  const ensureLibrary = () => {
    if (document.querySelector('script[data-baisalya-adsense]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.baisalyaAdsense = 'true';
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
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          renderPlacement(entry.target);
          obs.unobserve(entry.target);
        });
      }, { rootMargin: '500px 0px' });
      placements.forEach((placement) => observer.observe(placement));
    } else {
      placements.forEach(renderPlacement);
    }
  };

  if ('requestIdleCallback' in window) requestIdleCallback(activate, { timeout: 1800 });
  else window.addEventListener('load', activate, { once: true });
})();
