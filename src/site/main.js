import { initTheme } from './core/theme.js';
import { initNavigation } from './core/navigation.js';
import { initReveal } from './interactions/reveal.js';
import { initEasterEggLoader } from './interactions/easter-egg-loader.js';
import { initIdentityCard } from './interactions/identity-card.js';

function bootstrap() {
  initTheme();
  initNavigation();
  initReveal();
  initIdentityCard();
  initEasterEggLoader();
  document.documentElement.classList.add('site-ready');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
