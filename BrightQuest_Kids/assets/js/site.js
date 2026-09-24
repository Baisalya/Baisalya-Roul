(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const closeNav = () => { if (!toggle || !nav) return; toggle.setAttribute('aria-expanded','false'); nav.classList.remove('open'); };
  toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); nav?.classList.toggle('open', !open); });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 24), {passive:true});
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); } }), {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    reveals.forEach(el => io.observe(el));
  } else { reveals.forEach(el => el.classList.add('visible')); }
  document.querySelectorAll('details').forEach(d => d.addEventListener('toggle', () => { if (!d.open) return; document.querySelectorAll('details').forEach(other => { if (other !== d) other.removeAttribute('open'); }); }));
})();
