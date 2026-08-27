function closeDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.close === 'function' && dialog.open) dialog.close();
  else dialog.removeAttribute('open');
}

function openDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
}

export function initIdentityCard() {
  const trigger = document.getElementById('identity-trigger');
  const dialog = document.getElementById('identity-card');
  if (!trigger || !dialog) return;

  const portrait = dialog.querySelector('[data-profile-portrait]');
  const photo = portrait?.querySelector(':scope > img');
  if (photo) {
    photo.addEventListener('error', () => portrait?.classList.add('is-fallback'), { once: true });
    photo.addEventListener('load', () => portrait?.classList.remove('is-fallback'), { once: true });
  }

  trigger.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    openDialog(dialog);
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog(dialog);
    if (event.target.closest('[data-identity-close]')) closeDialog(dialog);
  });
}
