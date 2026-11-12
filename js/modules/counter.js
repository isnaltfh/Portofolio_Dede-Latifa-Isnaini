/* =========================================================
   COUNT-UP NUMBERS
   Any element with data-count="20573" counts up from 0 when visible.
   Optional data-suffix="+" is added after the number.
   ========================================================= */
(function () {
  'use strict';
  var Portfolio = window.Portfolio;

  const DURATION = 1600; // ms

  function countUp(el) {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      el.textContent = Math.round(target * eased).toLocaleString('en-US') + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  Portfolio.initCounters = function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length || Portfolio.prefersReducedMotion() || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          countUp(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((el) => observer.observe(el));
  };
})();