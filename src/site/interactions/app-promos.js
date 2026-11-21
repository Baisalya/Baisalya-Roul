import { prefersReducedMotion } from '../utilities/motion.js';

const imageDuration = 7000;
const pausedPreviewDuration = 14000;
const upNextSeconds = 4;
const startingVolume = 0.35;
const visibleStageFraction = 0.25;

function mountAppPromos(player, promos) {
  const get = name => player.querySelector(`[data-promo-${name}]`);
  const video = get('video');
  const still = get('still');
  const cover = get('cover');
  const play = get('play');
  const next = get('next');
  const sound = get('sound');
  const enableSound = get('enable-sound');
  const playlist = get('playlist');
  const app = get('app');
  const title = get('title');
  const count = get('count');
  const status = get('status');
  const upNext = get('up-next');
  const nextArt = get('next-art');
  const nextTitle = get('next-title');
  const countdown = get('countdown');
  const reducedMotion = prefersReducedMotion();
  const canRotate = promos.length > 1;
  let running = !reducedMotion;
  let pausedByVisitor = false;
  let index = 0;
  let timer;
  let ticker;
  let playAttempt = 0;
  let stageVisible = !('IntersectionObserver' in window);
  let needsSoundGesture = false;
  video.volume = startingVolume;

  function current() {
    return promos[index];
  }

  function nextIndex() {
    return (index + 1) % promos.length;
  }

  function canPlayInView() {
    return stageVisible && !document.hidden;
  }

  function setControl(button, label, icon) {
    button.setAttribute('aria-label', label);
    button.title = label;
    button.querySelector('use').setAttribute('href', '#icon-promo-' + icon);
  }

  function updateSound() {
    setControl(sound, video.muted ? 'Unmute' : 'Mute', video.muted ? 'muted' : 'sound');
    enableSound.hidden = !needsSoundGesture || !running || current().type !== 'video';
  }

  function updatePlayback(message = '') {
    setControl(play, running ? 'Pause' : 'Play', running ? 'pause' : 'play');
    status.textContent = message;
    sound.disabled = current().type !== 'video';
    updateSound();
  }

  function clearSchedule() {
    clearTimeout(timer);
    clearInterval(ticker);
    if (upNext.contains(document.activeElement)) next.focus({ preventScroll: true });
    upNext.hidden = true;
  }

  function fillArt(container, promo) {
    if (promo.poster) {
      const image = new Image();
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.src = promo.poster;
      container.replaceChildren(image);
    } else {
      container.textContent = promo.app;
    }
  }

  function schedulePreview() {
    if (canRotate && pausedByVisitor && !reducedMotion && canPlayInView()) {
      timer = setTimeout(() => show(nextIndex()), pausedPreviewDuration);
    }
  }

  function queueNext() {
    clearSchedule();
    if (!running || !canPlayInView()) return;
    if (canRotate) {
      const upcoming = promos[nextIndex()];
      fillArt(nextArt, upcoming);
      nextTitle.textContent = upcoming.app + ' · ' + upcoming.title;
      let remaining = upNextSeconds;
      countdown.textContent = remaining;
      upNext.hidden = false;
      ticker = setInterval(() => { countdown.textContent = --remaining; }, 1000);
    }
    timer = setTimeout(() => show(nextIndex()), upNextSeconds * 1000);
  }

  function onVideoError() {
    if (canRotate && running) {
      updatePlayback('Video unavailable');
      queueNext();
    } else {
      running = false;
      updatePlayback('Video unavailable');
    }
  }

  function startCurrent() {
    clearSchedule();
    if (!canPlayInView()) return;
    if (!running) {
      schedulePreview();
      return;
    }
    const promo = current();
    if (promo.type === 'image') {
      if (canRotate) timer = setTimeout(() => show(nextIndex()), imageDuration);
      return;
    }
    if (video.error) {
      onVideoError();
      return;
    }
    const attempt = ++playAttempt;
    if (!video.hasAttribute('src')) video.src = promo.src;
    if (video.ended) video.currentTime = 0;
    video.hidden = false;
    video.play().catch(error => {
      if (attempt !== playAttempt || !running) return;
      if (error.name === 'NotAllowedError' && !video.muted) {
        needsSoundGesture = true;
        video.muted = true;
        updateSound();
        startCurrent();
      } else if (error.name === 'NotAllowedError') {
        running = false;
        updatePlayback('Press Play to start');
      } else if (error.name !== 'AbortError') {
        onVideoError();
      }
    });
  }

  function show(nextItem) {
    clearSchedule();
    ++playAttempt;
    video.pause();
    if (video.hasAttribute('src')) {
      video.removeAttribute('src');
      video.load();
    }
    index = nextItem;
    const promo = current();
    app.textContent = promo.app;
    if (promo.href) app.href = promo.href;
    else app.removeAttribute('href');
    title.textContent = promo.title;
    count.textContent = `${index + 1} of ${promos.length}`;
    video.setAttribute('aria-label', promo.app + ' · ' + promo.title);
    video.hidden = true;
    still.hidden = !promo.poster;
    cover.hidden = !!promo.poster;
    if (promo.poster) {
      still.alt = promo.type === 'image' ? promo.app + ' · ' + promo.title : '';
      if (still.getAttribute('src') !== promo.poster) still.src = promo.poster;
    } else {
      still.removeAttribute('src');
      cover.textContent = promo.app;
    }
    buttons.forEach((button, itemIndex) => {
      if (itemIndex === index) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    updatePlayback(pausedByVisitor && canRotate && !reducedMotion ? 'Paused · previews rotate' : '');
    startCurrent();
  }

  const buttons = promos.map((promo, itemIndex) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    const art = document.createElement('span');
    const label = document.createElement('span');
    const clipTitle = document.createElement('small');
    button.type = 'button';
    button.setAttribute('aria-label', promo.app + ' · ' + promo.title);
    art.className = 'app-promos__art';
    fillArt(art, promo);
    label.textContent = promo.app;
    clipTitle.textContent = promo.title;
    button.append(art, label, clipTitle);
    item.append(button);
    playlist.append(item);
    button.addEventListener('click', () => show(itemIndex));
    return button;
  });

  play.addEventListener('click', () => {
    running = !running;
    pausedByVisitor = !running;
    if (!running) {
      ++playAttempt;
      video.pause();
    }
    updatePlayback(pausedByVisitor && canRotate && !reducedMotion ? 'Paused · previews rotate' : '');
    startCurrent();
  });
  next.addEventListener('click', () => show(nextIndex()));
  get('skip').addEventListener('click', () => show(nextIndex()));
  function setMuted(muted) {
    ++playAttempt;
    needsSoundGesture = false;
    video.muted = muted;
    updateSound();
    if (running) {
      status.textContent = '';
      if (!video.ended) startCurrent();
    }
  }
  sound.addEventListener('click', () => setMuted(!video.muted));
  enableSound.addEventListener('click', () => {
    if (document.activeElement === enableSound) sound.focus({ preventScroll: true });
    setMuted(false);
  });
  video.addEventListener('playing', () => {
    if (!running || !canPlayInView()) return;
    video.hidden = false;
    still.hidden = true;
    cover.hidden = true;
  });
  video.addEventListener('ended', queueNext);
  video.addEventListener('error', () => {
    if (video.hasAttribute('src')) onVideoError();
  });
  function syncPlaybackToViewport() {
    if (!canPlayInView()) {
      clearSchedule();
      ++playAttempt;
      video.pause();
    } else if (video.ended && running) {
      queueNext();
    } else {
      startCurrent();
    }
  }

  document.addEventListener('visibilitychange', syncPlaybackToViewport);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= visibleStageFraction;
      if (visible === stageVisible) return;
      stageVisible = visible;
      syncPlaybackToViewport();
    }, { threshold: visibleStageFraction, rootMargin: '-76px 0px 0px' });
    observer.observe(video.parentElement);
  }

  next.hidden = !canRotate;
  playlist.hidden = !canRotate;
  get('controls').hidden = !canRotate && promos[0].type === 'image';
  show(0);
}

const player = document.querySelector('[data-app-promos]');
const data = document.getElementById('app-promo-playlist');
if (player && data) {
  const promos = JSON.parse(data.textContent);
  if (promos.length) mountAppPromos(player, promos);
}
