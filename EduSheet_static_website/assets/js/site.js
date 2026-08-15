/* EduSheet static site configuration. Replace store URLs before publishing. */
const EDUSHEET_CONFIG = {
  googlePlayUrl: "",
  microsoftStoreUrl: "",
  supportEmail: "support@edusheet.com"
};

(function(){
  const body = document.body;
  const saved = localStorage.getItem('edusheet-language');
  const initial = saved === 'hi' ? 'hi' : 'en';
  setLanguage(initial);

  function setLanguage(lang){
    body.classList.toggle('lang-en', lang === 'en');
    body.classList.toggle('lang-hi', lang === 'hi');
    body.dataset.language = lang;
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
    localStorage.setItem('edusheet-language', lang);
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.setLang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.setLang === lang ? 'true' : 'false');
    });
    const titleEn = document.body.dataset.titleEn;
    const titleHi = document.body.dataset.titleHi;
    if(titleEn && titleHi) document.title = lang === 'hi' ? titleHi : titleEn;
  }
  window.setEduSheetLanguage = setLanguage;
  document.querySelectorAll('[data-set-lang]').forEach(btn => btn.addEventListener('click',()=>setLanguage(btn.dataset.setLang)));

  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if(menuBtn && navLinks){
    menuBtn.addEventListener('click',()=>{
      const open = navLinks.classList.toggle('mobile-open');
      body.classList.toggle('menu-open',open);
      menuBtn.setAttribute('aria-expanded',open?'true':'false');
    });
    navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      navLinks.classList.remove('mobile-open');body.classList.remove('menu-open');menuBtn.setAttribute('aria-expanded','false');
    }));
  }

  document.querySelectorAll('[data-store]').forEach(link=>{
    const type = link.dataset.store;
    const url = type === 'android' ? EDUSHEET_CONFIG.googlePlayUrl : EDUSHEET_CONFIG.microsoftStoreUrl;
    if(url){link.href=url;link.target='_blank';link.rel='noopener';link.classList.remove('disabled')}
    else{
      link.classList.add('disabled');
      link.addEventListener('click',(e)=>{
        e.preventDefault();
        const lang = body.dataset.language;
        alert(lang==='hi' ? 'Publish karne se pehle is button me official store link add karein.' : 'Add the official store URL to assets/js/site.js before publishing.');
      });
    }
  });

  document.querySelectorAll('.faq-q').forEach(btn=>btn.addEventListener('click',()=>{
    btn.closest('.faq-item').classList.toggle('open');
  }));

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
  const ua=navigator.userAgent.toLowerCase();
  const rec=document.querySelector('[data-platform-recommendation]');
  if(rec){
    let text='';
    if(ua.includes('android')) text=body.dataset.language==='hi'?'Aapke device ke liye Android version recommended hai.':'Android version is recommended for this device.';
    else if(ua.includes('windows')) text=body.dataset.language==='hi'?'Aapke device ke liye Windows version recommended hai.':'Windows version is recommended for this device.';
    if(text){rec.textContent=text;rec.hidden=false;}
  }
})();
