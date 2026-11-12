/* =========================================================
   BACK TO TOP BUTTON
   Shows #toTop after scrolling 600px; click scrolls to the top.
   ========================================================= */
(function () {
  'use strict';
  var Portfolio = window.Portfolio;

  Portfolio.initBackToTop = function initBackToTop() {
    const button = document.getElementById('toTop');
    if (!button) return;

    const onScroll = () => button.classList.toggle('is-visible', window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };
})();