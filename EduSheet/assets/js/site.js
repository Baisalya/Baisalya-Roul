/* EduSheet static site configuration. */
const EDUSHEET_CONFIG = {
  googlePlayUrl: "https://play.google.com/store/apps/details?id=com.baishalya.edusheet",
  microsoftStoreUrl: "https://apps.microsoft.com/detail/9N0ZK8C31X94?cid=DevShareMCLPCB",
  supportEmail: "support@edusheet.com"
};

(function(){
  const body = document.body;
  // Device recommendation is local-only and can be refreshed when language changes.
  const ua = navigator.userAgent.toLowerCase();
  const rec = document.querySelector('[data-platform-recommendation]');
  const saved = (() => {
    try { return localStorage.getItem('edusheet-language'); } catch (_) { return null; }
  })();
  const initial = saved === 'hi' ? 'hi' : 'en';
  setLanguage(initial);

  function setLanguage(lang){
    body.classList.toggle('lang-en', lang === 'en');
    body.classList.toggle('lang-hi', lang === 'hi');
    body.dataset.language = lang;
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
    try { localStorage.setItem('edusheet-language', lang); } catch (_) { /* Storage can be blocked. */ }
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.setLang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.setLang === lang ? 'true' : 'false');
    });
    const titleEn = document.body.dataset.titleEn;
    const titleHi = document.body.dataset.titleHi;
    if(titleEn && titleHi) document.title = lang === 'hi' ? titleHi : titleEn;
    updatePlatformRecommendation();
  }
  window.setEduSheetLanguage = setLanguage;
  document.querySelectorAll('[data-set-lang]').forEach(btn => btn.addEventListener('click',()=>setLanguage(btn.dataset.setLang)));

  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if(menuBtn && navLinks){
    const closeMenu = () => {
      navLinks.classList.remove('mobile-open');
      body.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded','false');
    };
    menuBtn.addEventListener('click',()=>{
      const open = navLinks.classList.toggle('mobile-open');
      body.classList.toggle('menu-open',open);
      menuBtn.setAttribute('aria-expanded',open?'true':'false');
    });
    navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown', event => { if(event.key === 'Escape') closeMenu(); });
  }

  document.querySelectorAll('[data-store]').forEach(link=>{
    const type = link.dataset.store;
    const url = type === 'android' ? EDUSHEET_CONFIG.googlePlayUrl : EDUSHEET_CONFIG.microsoftStoreUrl;
    if(url){link.href=url;link.target='_blank';link.rel='noopener';link.classList.remove('disabled');link.removeAttribute('aria-disabled')}
    else{
      link.classList.add('disabled');
      link.setAttribute('aria-disabled','true');
      link.addEventListener('click',(e)=>{
        e.preventDefault();
        const lang = body.dataset.language;
        alert(lang==='hi' ? 'Publish karne se pehle is button me official store link add karein.' : 'Add the official store URL to assets/js/site.js before publishing.');
      });
    }
  });

  document.querySelectorAll('.faq-q').forEach(btn=>btn.addEventListener('click',()=>{
    const item = btn.closest('.faq-item');
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }));

  // Let visitors scan the feature library by the job they need to finish.
  const featureFilters = [...document.querySelectorAll('[data-feature-filter]')];
  const featureCards = [...document.querySelectorAll('.feature-wide')];
  const featureCount = document.querySelector('[data-feature-count]');
  if(featureFilters.length && featureCards.length){
    const categoriesByTitle = {
      'Math Keyboard + Inline Formula Editing': ['author','math'],
      'Paper Composer + Structured Questions': ['author','assess'],
      'Saved Papers + Editable Reopen': ['author','reuse'],
      'Question Bank': ['author','reuse'],
      'Teacher Planner': ['plan','reuse'],
      'Lesson Planner + Weekly Calendar': ['plan'],
      'Progress & Teaching Insights': ['plan','assess'],
      'Teaching Workspace + Shareable Teaching Packs': ['plan','reuse'],
      'Guided Workflows + Adaptive Android/Windows UI': ['author','plan'],
      'Geometry Studio': ['author','math'],
      'OCR Question Capture': ['author'],
      'Professional Paper Styles + PDF/Word': ['author','export'],
      'OMR Generator': ['assess','export'],
      'Document Reader & Converter': ['export'],
      'Scientific Calculator': ['author','math'],
    };
    const applyFeatureFilter = (filter) => {
      let visible = 0;
      featureCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.trim() || '';
        const categories = categoriesByTitle[title] || [];
        const show = filter === 'all' || categories.includes(filter);
        card.hidden = !show;
        if(show) visible++;
      });
      featureFilters.forEach(btn => {
        const active = btn.dataset.featureFilter === filter;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      if(featureCount){
        const suffix = body.dataset.language === 'hi'
          ? featureCount.dataset.countSuffixHi || 'features dikh rahe hain'
          : featureCount.dataset.countSuffixEn || 'features shown';
        featureCount.textContent = `${visible} ${suffix}`;
      }
    };
    featureFilters.forEach(btn => btn.addEventListener('click', () => applyFeatureFilter(btn.dataset.featureFilter || 'all')));
    applyFeatureFilter('all');
  }

  // Small, static audience switcher for the marketing page; no tracking or account is required.
  const audienceButtons = [...document.querySelectorAll('[data-audience-tab]')];
  const audiencePanels = [...document.querySelectorAll('[data-audience-panel]')];
  if(audienceButtons.length && audiencePanels.length){
    const showAudience = (audience) => {
      audienceButtons.forEach(btn => {
        const active = btn.dataset.audienceTab === audience;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      audiencePanels.forEach(panel => { panel.hidden = panel.dataset.audiencePanel !== audience; });
    };
    audienceButtons.forEach(btn => btn.addEventListener('click', () => showAudience(btn.dataset.audienceTab || 'teacher')));
    showAudience(audienceButtons[0].dataset.audienceTab || 'teacher');
  }

  // Homepage hero remains natively scrollable/swipeable; controls mirror the scroll-snap position.
  const heroCarousel = document.querySelector('[data-hero-carousel]');
  if(heroCarousel){
    const track = heroCarousel.querySelector('[data-hero-track]');
    const slides = [...heroCarousel.querySelectorAll('[data-hero-slide]')];
    const dots = [...heroCarousel.querySelectorAll('[data-hero-dot]')];
    const prev = heroCarousel.querySelector('[data-hero-prev]');
    const next = heroCarousel.querySelector('[data-hero-next]');
    let activeIndex = 0;
    let scrollRaf = 0;

    const setActive = (index, focusSlide = false) => {
      if(!track || !slides.length) return;
      activeIndex = Math.max(0, Math.min(index, slides.length - 1));
      dots.forEach((dot, i) => {
        const active = i === activeIndex;
        dot.classList.toggle('active', active);
        dot.setAttribute('aria-current', active ? 'true' : 'false');
      });
      if(prev) prev.disabled = activeIndex === 0;
      if(next) next.disabled = activeIndex === slides.length - 1;
      if(focusSlide){
        track.scrollTo({left:activeIndex * track.clientWidth,behavior:'smooth'});
      }
    };

    const indexFromScroll = () => {
      if(!track || !slides.length) return 0;
      const width = track.clientWidth || 1;
      return Math.round(track.scrollLeft / width);
    };

    if(track){
      track.addEventListener('scroll', () => {
        cancelAnimationFrame(scrollRaf);
        scrollRaf = requestAnimationFrame(() => setActive(indexFromScroll()));
      }, {passive:true});
    }
    dots.forEach((dot, index) => dot.addEventListener('click', () => setActive(index, true)));
    if(prev) prev.addEventListener('click', () => setActive(activeIndex - 1, true));
    if(next) next.addEventListener('click', () => setActive(activeIndex + 1, true));
    heroCarousel.addEventListener('keydown', event => {
      if(event.key === 'ArrowLeft'){ event.preventDefault(); setActive(activeIndex - 1, true); }
      if(event.key === 'ArrowRight'){ event.preventDefault(); setActive(activeIndex + 1, true); }
    });
    setActive(0);
  }

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}});
  },{threshold:.12}) : null;
  document.querySelectorAll('.reveal').forEach(el=>observer?observer.observe(el):el.classList.add('visible'));

  const back = document.querySelector('.back-top');
  if(back){
    window.addEventListener('scroll',()=>back.classList.toggle('show',window.scrollY>650),{passive:true});
    back.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  }

  const manualSearch = document.querySelector('[data-manual-search]');
  if(manualSearch){
    const sections = [...document.querySelectorAll('.doc section[data-searchable]')];
    const noResults = document.querySelector('.no-results');
    manualSearch.addEventListener('input',()=>{
      const q = manualSearch.value.trim().toLowerCase();let visible=0;
      sections.forEach(s=>{const show=!q || s.innerText.toLowerCase().includes(q);s.style.display=show?'':'none';if(show)visible++});
      if(noResults) noResults.style.display=visible?'none':'block';
    });
  }

  // Highlight current manual section in sticky TOC.
  const anchors=[...document.querySelectorAll('.side-links a[href^="#"]')];
  const targets=anchors.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if(targets.length && 'IntersectionObserver' in window){
    const tocObs=new IntersectionObserver(entries=>{
      const active=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
      if(active){anchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+active.target.id))}
    },{rootMargin:'-100px 0px -70% 0px',threshold:0});
    targets.forEach(t=>tocObs.observe(t));
  }

  // Mark best matching platform without transmitting any device data.
  function updatePlatformRecommendation(){
    if(!rec) return;
    let text='';
    if(ua.includes('android')) text=body.dataset.language==='hi'?'Aapke device ke liye Android version recommended hai.':'Android version is recommended for this device.';
    else if(ua.includes('windows')) text=body.dataset.language==='hi'?'Aapke device ke liye Windows version recommended hai.':'Windows version is recommended for this device.';
    if(text){rec.textContent=text;rec.hidden=false;}
  }

  const animateIfVisible = (el, callback) => {
    if(!el) return;
    const run = () => {
      if(el.dataset.animated === 'true') return;
      el.dataset.animated = 'true';
      callback(el);
    };
    if('IntersectionObserver' in window){
      const localObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            run();
            localObs.unobserve(entry.target);
          }
        });
      }, {threshold:.32});
      localObs.observe(el);
    } else {
      run();
    }
  };

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-countup]').forEach(el => animateIfVisible(el, target => {
    const end = Number(target.dataset.countup || 0);
    const start = Number(target.dataset.countfrom || 0);
    const suffix = target.dataset.suffix || '';
    if(prefersReducedMotion){
      target.textContent = `${Math.round(end)}${suffix}`;
      return;
    }
    const duration = 1100;
    const startTime = performance.now();
    const step = now => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = start + (end - start) * eased;
      target.textContent = `${Math.round(value)}${suffix}`;
      if(progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }));

  document.querySelectorAll('[data-fill]').forEach(el => animateIfVisible(el, target => {
    const end = Number(target.dataset.fill || 0);
    const prop = target.dataset.progressVar;
    const cssProp = target.dataset.progressCssprop;
    const write = (value) => {
      if(prop) target.style.setProperty(prop, `${value}%`);
      if(cssProp) target.style.setProperty(cssProp, `${value}%`);
    };
    if(prefersReducedMotion){
      write(end);
      return;
    }
    let startValue = 0;
    const duration = 1350;
    const startTime = performance.now();
    const step = now => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = startValue + (end - startValue) * eased;
      write(value);
      if(progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }));

  updatePlatformRecommendation();
})();
