let modulePromise = null;
let stylesheetPromise = null;

const SECRET_CLICK_COUNT = 3;
const SECRET_CLICK_WINDOW_MS = 900;

function ensureStylesheet() {
  if (stylesheetPromise) return stylesheetPromise;

  stylesheetPromise = new Promise((resolve, reject) => {
    const id = 'easter-egg-stylesheet';
    const existing = document.getElementById(id);
    if (existing) {
      if (existing.sheet) resolve();
      else {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
      }
      return;
    }

    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = new URL('../easter-egg/easter-egg.css', import.meta.url).href;
    link.addEventListener('load', resolve, { once: true });
    link.addEventListener(
      'error',
      () => reject(new Error('Developer mode stylesheet failed to load.')),
      { once: true },
    );
    document.head.appendChild(link);
  });

  return stylesheetPromise;
}

async function launchEasterEgg() {
  modulePromise ??= import('../easter-egg/runtime.js');
  const [, module] = await Promise.all([ensureStylesheet(), modulePromise]);
  module.openEasterEgg();
}

function closeContainingDialog(target) {
  const dialog = target.closest('dialog');
  if (!dialog) return;
  if (typeof dialog.close === 'function' && dialog.open) dialog.close();
  else dialog.removeAttribute('open');
}

function attachSecretGesture(target) {
  let clicks = 0;
  let resetTimer = null;
  let loading = false;

  target.addEventListener('click', () => {
    clicks += 1;
    window.clearTimeout(resetTimer);

    if (clicks < SECRET_CLICK_COUNT) {
      resetTimer = window.setTimeout(() => {
        clicks = 0;
      }, SECRET_CLICK_WINDOW_MS);
      return;
    }

    clicks = 0;
    resetTimer = null;
    if (loading) return;

    loading = true;
    closeContainingDialog(target);
    launchEasterEgg()
      .catch((error) => {
        console.error('Unable to load developer mode.', error);
      })
      .finally(() => {
        loading = false;
      });
  });
}

export function initEasterEggLoader() {
  const secrets = [...document.querySelectorAll('[data-easter-secret]')];
  secrets.forEach(attachSecretGesture);
}
