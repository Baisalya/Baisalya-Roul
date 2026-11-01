
(()=>{
const cfg=window.FA_CONFIG||{};
const menu=document.querySelector('.menu-btn'),links=document.querySelector('.nav-links');
if(menu&&links){menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('[data-download]').forEach(el=>{const k=el.dataset.download;const url=k==='android'?cfg.androidUrl:cfg.windowsUrl;const label=k==='android'?cfg.androidLabel:cfg.windowsLabel;if(url){el.classList.remove('btn-disabled');el.removeAttribute('aria-disabled');el.href=url;el.target='_blank';el.rel='noopener';}else{el.href='#';el.classList.add('btn-disabled');el.setAttribute('aria-disabled','true');if(label)el.querySelector('[data-label]')?.replaceChildren(label);el.addEventListener('click',e=>e.preventDefault());}});
const botImg=document.querySelector('[data-bot-demo]');
if(botImg){let bot='atlas_mini',mood='idle';const render=()=>{botImg.src=`assets/img/bots/${bot}/${mood}.png`;botImg.alt=`${bot.replaceAll('_',' ')} — ${mood} mood`;};document.querySelectorAll('[data-bot]').forEach(b=>b.addEventListener('click',()=>{bot=b.dataset.bot;document.querySelectorAll('[data-bot]').forEach(x=>x.classList.toggle('active',x===b));render();}));document.querySelectorAll('[data-mood]').forEach(b=>b.addEventListener('click',()=>{mood=b.dataset.mood;document.querySelectorAll('[data-mood]').forEach(x=>x.classList.toggle('active',x===b));render();}));render();}
const search=document.querySelector('[data-manual-search]');if(search){search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();document.querySelectorAll('.prose section').forEach(s=>{const hit=!q||s.textContent.toLowerCase().includes(q);s.classList.toggle('hide',!hit);});});}
const year=document.querySelector('[data-year]');if(year)year.textContent=new Date().getFullYear();
})();
