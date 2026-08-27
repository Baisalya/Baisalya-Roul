(() => {
  const config = window.BAISALYA_MONETIZATION || {};
  const client = String(config.adsenseClient || '').trim();
  const slot = String(config.manualSlot || '').trim();
  const validClient = /^ca-pub-\d{10,20}$/.test(client);
  const validSlot = /^\d{6,20}$/.test(slot);
  const placements = [...document.querySelectorAll('[data-ad-unit="manual"]')];

  if (!config.enabled || !config.consentReady || !validClient || !validSlot || !placements.length) {
    return;
  }

  const loadAds = () => {
    if (!document.querySelector('script[data-baisalya-adsense]')) {
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.dataset.baisalyaAdsense = 'true';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
      document.head.appendChild(script);
    }

    placements.forEach((placement) => {
      if (placement.dataset.adInitialized === 'true') return;
      const unit = document.createElement('ins');
      unit.className = 'adsbygoogle';
      unit.style.display = 'block';
      unit.dataset.adClient = client;
      unit.dataset.adSlot = slot;
      unit.dataset.adFormat = 'auto';
      unit.dataset.fullWidthResponsive = 'true';
      placement.replaceChildren(unit);
      placement.hidden = false;
      placement.classList.add('is-active');
      placement.dataset.adInitialized = 'true';
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) { /* AdSense retries after load. */ }
    });
  };

  if ('requestIdleCallback' in window) requestIdleCallback(loadAds, { timeout: 1800 });
  else window.addEventListener('load', loadAds, { once: true });
})();
