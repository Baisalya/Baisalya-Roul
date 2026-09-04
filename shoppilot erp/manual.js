(() => {
  const search = document.getElementById('manual-search');
  const status = document.getElementById('search-status');
  const noResults = document.getElementById('no-results');
  const sections = [...document.querySelectorAll('.searchable-section')];
  const sidebarLinks = [...document.querySelectorAll('.sidebar-card a')];

  const normalise = (value) => (value || '').toLowerCase().replace(/\s+/g, ' ').trim();

  const filterManual = () => {
    const query = normalise(search?.value);

    if (!query) {
      sections.forEach((section) => section.hidden = false);
      document.querySelectorAll('.searchable-card').forEach((card) => card.hidden = false);
      noResults.hidden = true;
      status.textContent = 'Showing the complete guide';
      return;
    }

    let matchingSections = 0;
    let matchingCards = 0;
    sections.forEach((section) => {
      const sectionText = normalise(`${section.dataset.search || ''} ${section.querySelector(':scope > .manual-section-heading')?.textContent || ''}`);
      const nestedCards = [...section.querySelectorAll('.searchable-card')];
      let nestedMatch = false;

      nestedCards.forEach((card) => {
        const cardText = normalise(`${card.dataset.search || ''} ${card.textContent}`);
        const match = cardText.includes(query);
        card.hidden = !match;
        nestedMatch ||= match;
        if (match) {
          matchingCards += 1;
          if (card.tagName === 'DETAILS') card.open = true;
        }
      });

      const sectionMatch = sectionText.includes(query) || nestedMatch;
      // A section-level match should keep its content readable. If a nested
      // card matches, narrow the section to those cards instead of showing an
      // empty heading or unrelated cards.
      if (sectionText.includes(query) && !nestedMatch) {
        nestedCards.forEach((card) => card.hidden = false);
      }
      section.hidden = !sectionMatch;
      if (sectionMatch) matchingSections += 1;
    });

    noResults.hidden = matchingSections !== 0;
    status.textContent = matchingSections
      ? `${matchingSections} section${matchingSections === 1 ? '' : 's'} found${matchingCards ? ` · ${matchingCards} result${matchingCards === 1 ? '' : 's'}` : ''}`
      : 'No result found';
  };

  search?.addEventListener('input', filterManual);
  search?.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !search.value) return;
    search.value = '';
    filterManual();
  });

  const initialQuery = new URLSearchParams(window.location.search).get('q');
  if (initialQuery && search) {
    search.value = initialQuery;
    filterManual();
  }

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    sidebarLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
    });
  }, { rootMargin: '-25% 0px -65% 0px', threshold: [0.05, 0.2, 0.5] });

  sections.forEach((section) => observer.observe(section));
})();
