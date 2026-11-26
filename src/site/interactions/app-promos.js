import { prefersReducedMotion } from '../utilities/motion.js';

const imageDuration = 7000;
const pausedPreviewDuration = 14000;
const upNextSeconds = 4;
const startingVolume = 0.35;
const visibleStageFraction = 0.25;

/* Fisher-Yates shuffle avoiding back-to-back items from the same app. */
function shufflePlaylist(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].app === arr[i - 1].app) {
      for (let k = i + 1; k < arr.length; k++) {
        if (arr[k].app !== arr[i - 1].app) {
          [arr[i], arr[k]] = [arr[k], arr[i]];
          break;
        }
      }
    }
  }
  return arr;
}

function mountAppPromos(player, allPromos) {
  const get = name => player.querySelector(`[data-promo-${name}]`);
  const stage = get('stage') || player.querySelector('.app-promos__stage');
  const video = get('video');
  const still = get('still');
  const cover = get('cover');
  const play = get('play');
  const next = get('next');
  const sound = get('sound');
  const fullscreen = get('fullscreen');
  const enableSound = get('enable-sound');
  const enableSoundLabel = enableSound.querySelector('span');
  const playlist = get('playlist');
  const app = get('app');
  const title = get('title');
  const count = get('count');
  const status = get('status');
  const upNext = get('up-next');
  const nextArt = get('next-art');
  const nextTitle = get('next-title');
  const countdown = get('countdown');
  const filtersContainer = get('filters');
  const reducedMotion = prefersReducedMotion();

  let promos = shufflePlaylist(allPromos);
  let running = !reducedMotion;
  let pausedByVisitor = false;
  let index = 0;
  let timer;
  let ticker;
  let playAttempt = 0;
  let stageVisible = !('IntersectionObserver' in window);
  let playbackBlocked = false;
  let buttons = [];
  video.volume = startingVolume;
  video.muted = false;

  function current() {
    return promos[index];
  }

  function nextIndex() {
    return (index + 1) % promos.length;
  }

  function canRotate() {
    return promos.length > 1;
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
    enableSound.hidden = !playbackBlocked || current().type !== 'video';
    enableSoundLabel.textContent = video.muted ? 'Play video' : 'Play with sound';
  }

  function updatePlayback(message = '') {
    setControl(play, running ? 'Pause' : 'Play', running ? 'pause' : 'play');
    status.textContent = message;
    sound.disabled = current().type !== 'video';
    if (fullscreen) fullscreen.disabled = current().type !== 'video';
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
    if (canRotate() && pausedByVisitor && !reducedMotion && canPlayInView()) {
      timer = setTimeout(() => show(nextIndex()), pausedPreviewDuration);
    }
  }

  function queueNext() {
    clearSchedule();
    if (!running || !canPlayInView()) return;
    if (canRotate()) {
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
    if (canRotate() && running) {
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
      if (canRotate()) timer = setTimeout(() => show(nextIndex()), imageDuration);
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
      if (error.name === 'NotAllowedError') {
        running = false;
        playbackBlocked = true;
        updatePlayback();
      } else if (error.name !== 'AbortError') {
        onVideoError();
      }
    });
  }

  function show(nextItem, fromPlaybackGesture = false) {
    clearSchedule();
    ++playAttempt;
    video.pause();
    if (video.hasAttribute('src')) {
      video.removeAttribute('src');
      video.load();
    }
    index = nextItem;
    const promo = current();
    if (fromPlaybackGesture) {
      playbackBlocked = false;
      running = true;
      pausedByVisitor = false;
    }
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
    updatePlayback(pausedByVisitor && canRotate() && !reducedMotion ? 'Paused · previews rotate' : '');
    startCurrent();
  }

  function buildPlaylist() {
    playlist.replaceChildren();
    buttons = promos.map((promo, itemIndex) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      const art = document.createElement('span');
      const label = document.createElement('span');
      const clipTitle = document.createElement('small');
      const langBadge = document.createElement('span');
      button.type = 'button';
      button.setAttribute('aria-label', promo.app + ' · ' + promo.title);
      art.className = 'app-promos__art';
      fillArt(art, promo);
      label.textContent = promo.app;
      clipTitle.textContent = promo.title;
      langBadge.className = 'app-promos__lang-badge';
      langBadge.textContent = promo.lang === 'hi' ? 'हिंदी' : 'EN';
      button.append(art, label, clipTitle, langBadge);
      item.append(button);
      playlist.append(item);
      button.addEventListener('click', () => show(itemIndex, true));
      return button;
    });
  }

  function applyFilter(lang) {
    const filtered = lang === 'all'
      ? allPromos
      : allPromos.filter(p => p.lang === lang);

    if (!filtered.length) return;

    promos = shufflePlaylist(filtered);
    index = 0;
    buildPlaylist();

    next.hidden = !canRotate();
    playlist.hidden = !canRotate();
    get('controls').hidden = !canRotate() && promos[0].type === 'image';

    if (filtersContainer) {
      filtersContainer.querySelectorAll('.app-promos__filter').forEach(btn => {
        const isActive = btn.dataset.filter === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });
    }

    show(0, true);
  }

  if (filtersContainer) {
    filtersContainer.querySelectorAll('.app-promos__filter').forEach(btn => {
      btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });
  }

  play.addEventListener('click', () => {
    running = !running;
    playbackBlocked = false;
    pausedByVisitor = !running;
    if (!running) {
      ++playAttempt;
      video.pause();
    }
    updatePlayback(pausedByVisitor && canRotate() && !reducedMotion ? 'Paused · previews rotate' : '');
    startCurrent();
  });
  next.addEventListener('click', () => show(nextIndex(), true));
  get('skip').addEventListener('click', () => show(nextIndex(), true));
  function setMuted(muted) {
    ++playAttempt;
    video.muted = muted;
    updateSound();
    if (running) {
      status.textContent = '';
      if (!video.ended) startCurrent();
    }
  }
  sound.addEventListener('click', () => setMuted(!video.muted));
  if (fullscreen) {
    fullscreen.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
        return;
      }
      if (video.requestFullscreen) {
        video.requestFullscreen().catch(() => {
          if (stage?.requestFullscreen) stage.requestFullscreen().catch(() => {});
        });
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      } else if (stage?.requestFullscreen) {
        stage.requestFullscreen().catch(() => {});
      }
    });
  }
  enableSound.addEventListener('click', () => {
    if (document.activeElement === enableSound) play.focus({ preventScroll: true });
    playbackBlocked = false;
    running = true;
    pausedByVisitor = false;
    updatePlayback();
    startCurrent();
  });
  video.addEventListener('playing', () => {
    if (!running || !canPlayInView()) return;
    video.hidden = false;
    still.hidden = true;
    cover.hidden = true;
  });
  /* Keep custom toolbar buttons synced if visitor uses native video controls */
  video.addEventListener('pause', () => {
    if (video.ended || !canPlayInView() || !video.hasAttribute('src')) return;
    if (running) {
      running = false;
      pausedByVisitor = true;
      updatePlayback(canRotate() && !reducedMotion ? 'Paused · previews rotate' : '');
      schedulePreview();
    }
  });
  video.addEventListener('play', () => {
    if (!running) {
      running = true;
      pausedByVisitor = false;
      playbackBlocked = false;
      clearSchedule();
      updatePlayback();
    }
  });
  video.addEventListener('volumechange', updateSound);
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

  player.hidden = false;
  buildPlaylist();
  next.hidden = !canRotate();
  playlist.hidden = !canRotate();
  get('controls').hidden = !canRotate() && promos[0].type === 'image';
  show(0);
}

const player = document.querySelector('[data-app-promos]');
const data = document.getElementById('app-promo-playlist');
if (player && data) {
  const promos = JSON.parse(data.textContent);
  if (promos.length) mountAppPromos(player, promos);
}
