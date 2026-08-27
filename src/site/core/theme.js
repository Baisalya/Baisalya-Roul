const STORAGE_KEY = 'theme';

function readStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
  } catch (_) {
    return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  }
}

function applyTheme(theme, button) {
  const normalized = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = normalized;
  if (button) {
    const next = normalized === 'light' ? 'dark' : 'light';
    button.setAttribute('aria-label', `Switch to ${next} theme`);
    button.setAttribute('aria-pressed', String(normalized === 'light'));
  }
}

export function initTheme() {
  const button = document.getElementById('theme-toggle');
  const initial = readStoredTheme();
  applyTheme(initial, button);
  if (!button) return;

  button.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next, button);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (_) {
      // Theme still works for this page even when storage is unavailable.
    }
  });
}
