/* =========================================================
   SCROLL REVEAL
   Adds .is-visible to every .reveal element when it enters the screen.
   Items in the same row appear one after another (small stagger).
   Styles: css/utilities/animations.css
   ========================================================= */
(function () {
  'use strict';
  var Portfolio = window.Portfolio;

  Portfolio.initScrollReveal = function initScrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    // No animation → just show everything
    if (Portfolio.prefersReducedMotion() || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
          const index = Math.max(0, siblings.indexOf(el));
          el.style.transitionDelay = `${Math.min(index, 5) * 80}ms`;
          el.classList.add('is-visible');
          obs.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((el) => observer.observe(el));
  };
})();