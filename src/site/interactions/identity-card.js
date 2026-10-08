function syncTriggers(triggers, expanded) {
  triggers.forEach((trigger) => trigger.setAttribute('aria-expanded', String(expanded)));
}

function closeDialog(dialog, triggers) {
  if (!dialog) return;
  if (typeof dialog.close === 'function' && dialog.open) dialog.close();
  else dialog.removeAttribute('open');
  dialog.hidden = true;
  document.documentElement.classList.remove('identity-open');
  syncTriggers(triggers, false);
}

function openDialog(dialog, triggers) {
  if (!dialog) return;
  dialog.hidden = false;
  try {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  } catch (_) {
    dialog.setAttribute('open', '');
  }
  syncTriggers(triggers, true);
  document.documentElement.classList.add('identity-open');
}

export function initIdentityCard() {
  const triggers = [...document.querySelectorAll('[data-open-identity], #identity-trigger')];
  const dialog = document.getElementById('identity-card');
  if (!triggers.length || !dialog) return;

  syncTriggers(triggers, false);
  dialog.hidden = true;

  const portrait = dialog.querySelector('[data-profile-portrait]');
  const photo = portrait?.querySelector(':scope > img');
  if (photo) {
    photo.addEventListener('error', () => portrait?.classList.add('is-fallback'), { once: true });
    photo.addEventListener('load', () => portrait?.classList.remove('is-fallback'), { once: true });
  }

  const openIdentityCard = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    dialog.scrollTop = 0;
    if (!dialog.open || dialog.hidden) openDialog(dialog, triggers);
  };

  triggers.forEach((trigger) => {
    // Native click handles touch, mouse and keyboard without opening before
    // the release click, which can otherwise land on the newly shown backdrop.
    trigger.addEventListener('click', openIdentityCard);
  });

  const isBackdrop = (event) => {
    if (event.target !== dialog) return false;
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right
      || event.clientY < rect.top || event.clientY > rect.bottom;
  };
  let startedOnBackdrop = false;
  dialog.addEventListener('pointerdown', (event) => {
    startedOnBackdrop = isBackdrop(event);
  });
  dialog.addEventListener('pointercancel', () => { startedOnBackdrop = false; });
  dialog.addEventListener('click', (event) => {
    if (startedOnBackdrop && isBackdrop(event)) closeDialog(dialog, triggers);
    startedOnBackdrop = false;
    if (event.target.closest('[data-identity-close]')) closeDialog(dialog, triggers);
  });

  dialog.addEventListener('cancel', () => closeDialog(dialog, triggers));
  dialog.addEventListener('close', () => {
    dialog.hidden = true;
    document.documentElement.classList.remove('identity-open');
    syncTriggers(triggers, false);
  });
}
