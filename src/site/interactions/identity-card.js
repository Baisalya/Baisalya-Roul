function syncTriggers(triggers, expanded) {
  triggers.forEach((trigger) => trigger.setAttribute('aria-expanded', String(expanded)));
}

function closeDialog(dialog, triggers) {
  if (!dialog) return;
  if (typeof dialog.close === 'function' && dialog.open) dialog.close();
  else dialog.removeAttribute('open');
  dialog.hidden = true;
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!dialog.open || dialog.hidden) openDialog(dialog, triggers);
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', openIdentityCard);
    trigger.addEventListener('pointerup', () => {
      if (!dialog.open || dialog.hidden) openIdentityCard();
    }, { passive: true });
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog(dialog, triggers);
    if (event.target.closest('[data-identity-close]')) closeDialog(dialog, triggers);
  });

  dialog.addEventListener('cancel', () => closeDialog(dialog, triggers));
  dialog.addEventListener('close', () => {
    dialog.hidden = true;
    syncTriggers(triggers, false);
  });
}
