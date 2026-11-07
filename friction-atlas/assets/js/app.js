
(()=>{
const cfg=window.FA_CONFIG||{};
const menu=document.querySelector('.menu-btn'),links=document.querySelector('.nav-links');
if(menu&&links){menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('[data-download]').forEach(el=>{const k=el.dataset.download;const url=k==='android'?cfg.androidUrl:cfg.windowsUrl;const label=k==='android'?cfg.androidLabel:cfg.windowsLabel;if(url){el.classList.remove('btn-disabled');el.removeAttribute('aria-disabled');el.href=url;el.target='_blank';el.rel='noopener';}else{el.href='#';el.classList.add('btn-disabled');el.setAttribute('aria-disabled','true');if(label)el.querySelector('[data-label]')?.replaceChildren(label);el.addEventListener('click',e=>e.preventDefault());}});
const botLab = document.querySelector('[data-bot-lab]');
if (botLab) {
  const comparison = botLab.querySelector('.companion-comparison');
  const original = botLab.querySelector('[data-bot-original]');
  const image3d = botLab.querySelector('[data-bot-demo]');
  const name = botLab.querySelector('[data-bot-name]');
  const moodLabel = botLab.querySelector('[data-bot-mood]');
  const captions = botLab.querySelectorAll('[data-bot-caption]');
  const bots = [...botLab.querySelectorAll('[data-bot]')];
  const moods = [...botLab.querySelectorAll('[data-mood]')];
  const requestedBot = new URLSearchParams(window.location.search).get('bot');
  let bot = bots.find(button => button.dataset.bot === requestedBot) || bots[0];
  let mood = moods[0];

  const select = (buttons, active) => {
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button === active)));
  };
  const render = () => {
    const id = bot.dataset.bot;
    const expression = mood.dataset.mood;
    const character = bot.textContent.trim();
    const moodName = mood.textContent.trim();
    const modelPath = `assets/img/bots/3d/${id}/${expression}`;
    comparison.dataset.character = id;
    original.src = `assets/img/bots/original/${id}/${expression}.webp`;
    original.alt = `${character}, original look, ${expression} pose`;
    image3d.srcset = `${modelPath}-640.webp 640w, ${modelPath}-1280.webp 1280w`;
    image3d.src = `${modelPath}-1280.webp`;
    image3d.alt = `${character}, 3D look, ${expression} pose`;
    name.textContent = character;
    moodLabel.textContent = moodName;
    captions.forEach(caption => { caption.textContent = moodName; });
    select(bots, bot);
    select(moods, mood);
  };

  bots.forEach(button => button.addEventListener('click', () => { bot = button; render(); }));
  moods.forEach(button => button.addEventListener('click', () => { mood = button; render(); }));
  render();
}
const search=document.querySelector('[data-manual-search]');
if(search){search.addEventListener('input',()=>{
  const q=search.value.trim().toLowerCase();let matches=0;
  document.querySelectorAll('.prose section').forEach(section=>{
    const hit=!q||section.textContent.toLowerCase().includes(q);
    section.classList.toggle('hide',!hit);if(hit)matches++;
    const link=document.querySelector(`.toc a[href="#${section.id}"]`);
    if(link)link.hidden=!hit;
  });
  const status=document.querySelector('[data-manual-status]');
  if(status)status.textContent=q?(matches?`${matches} matching section${matches===1?'':'s'}`:'No match. Try focus, walk, backup or rating.'):'Find the feature you need.';
});}
const focusBot=document.querySelector('[data-focus-bot]');
if(focusBot){
  const states={
    focus:{mood:'focus',title:'One thing at a time.',copy:'Your focus time is running. Keep your next small step in view.',status:'25:00 · Focus',alt:'Atlas Mini concentrating'},
    guard:{mood:'concerned',title:'Let’s stay focused.',copy:'This app can wait a little. Return to your task, allow one minute or end focus.',status:'Your focus companion',alt:'Atlas Mini gently reminding you to return to your task'},
    pause:{mood:'sleep',title:'Take the pause you need.',copy:'The timer is paused and selected apps are available. Resume when you’re ready.',status:'Paused · Apps available',alt:'Atlas Mini resting while focus is paused'},
    walk:{mood:'happy',title:'A few steps for yourself.',copy:'Move toward your walking goal. Sensor steps belong to this session; manual entry is available too.',status:'Walk · Your step goal',alt:'Atlas Mini happily encouraging a walk'},
  };
  document.querySelectorAll('[data-focus-state]').forEach(button=>button.addEventListener('click',()=>{
    const state=states[button.dataset.focusState];if(!state)return;
    focusBot.src=`assets/img/bots/atlas_mini/${state.mood}.png`;focusBot.alt=state.alt;
    document.querySelector('[data-focus-title]').textContent=state.title;
    document.querySelector('[data-focus-copy]').textContent=state.copy;
    document.querySelector('[data-focus-status]').textContent=state.status;
    document.querySelectorAll('[data-focus-state]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  }));
}
const year=document.querySelector('[data-year]');if(year)year.textContent=new Date().getFullYear();
})();
