/* =========================================================
   FILTER (reusable for any list)
   Buttons: <button class="filter" data-filter-group="projects" data-filter="ai">
   Items:   <article data-filter-item="projects" data-cat="ai">
   data-filter="all" shows every item in that group.
   Used by: Portfolio (group "projects") and Certificates (group "certs").
   ========================================================= */
(function () {
  'use strict';
  var Portfolio = window.Portfolio;

  Portfolio.initFilters = function initFilters() {
    const buttons = document.querySelectorAll('.filter[data-filter-group]');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const group = btn.dataset.filterGroup;
        const category = btn.dataset.filter;

        // Update buttons in the same group only
        document.querySelectorAll(`.filter[data-filter-group="${group}"]`).forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });

        // Show / hide items of that group
        let order = 0;
        document.querySelectorAll(`[data-filter-item="${group}"]`).forEach((item) => {
          const show = category === 'all' || item.dataset.cat === category;
          item.hidden = !show;

          if (show) {
            item.classList.add('is-visible'); // make sure scroll-reveal items are shown
            if (!Portfolio.prefersReducedMotion()) {
              item.animate(
                [{ opacity: 0, transform: 'translateY(18px) scale(.98)' }, { opacity: 1, transform: 'none' }],
                { duration: 450, delay: order * 60, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }
              );
            }
            order += 1;
          }
        });
      });
    });
  };
})();