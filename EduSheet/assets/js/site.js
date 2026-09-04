/* EduSheet static site configuration. */
const EDUSHEET_CONFIG = {
  googlePlayUrl: "https://play.google.com/store/apps/details?id=com.baishalya.edusheet",
  microsoftStoreUrl: "https://apps.microsoft.com/store/detail/9N8NH1LMZX1S?cid=DevShareMCLPCB",
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
      'Question Bank': ['author','reuse'],
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
  updatePlatformRecommendation();
})();
