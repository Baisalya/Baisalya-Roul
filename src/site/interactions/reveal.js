import { prefersReducedMotion } from '../utilities/motion.js';

export function initReveal() {
  const items = [...document.querySelectorAll('[data-reveal]')];
  if (!items.length) return;

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-revealed'));
    return;
  }

  items.forEach((item) => item.classList.add('reveal-pending'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

  items.forEach((item) => observer.observe(item));
}
