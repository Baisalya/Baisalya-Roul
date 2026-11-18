(() => {
    const button = document.getElementById('theme-toggle');
    if (!button || document.documentElement.dataset.themeToggleBound === 'true') return;

    const setTheme = (theme, persist = false) => {
        const normalized = theme === 'light' ? 'light' : 'dark';
        document.documentElement.dataset.theme = normalized;
        button.setAttribute('aria-label', `Switch to ${normalized === 'light' ? 'dark' : 'light'} theme`);
        button.setAttribute('aria-pressed', String(normalized === 'light'));
        if (persist) {
            try {
                localStorage.setItem('theme', normalized);
            } catch (_) {
                // The current page can still change themes without storage.
            }
        }
    };

    let initial = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    try {
        const saved = localStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark') initial = saved;
    } catch (_) {
        // Keep the theme selected in the HTML when storage is unavailable.
    }

    setTheme(initial);
    button.dataset.themeBound = 'true';
    document.documentElement.dataset.themeToggleBound = 'true';

    // Delegate from the document so the control keeps working if the header is
    // re-rendered or the click lands on one of the icon spans inside the button.
    document.addEventListener('click', (event) => {
        if (!(event.target instanceof Element) || !event.target.closest('#theme-toggle')) return;
        const current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
        setTheme(current === 'light' ? 'dark' : 'light', true);
    }, true);
})();
