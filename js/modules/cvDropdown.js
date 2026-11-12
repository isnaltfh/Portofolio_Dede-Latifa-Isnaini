/* =========================================================
   DOWNLOAD CV DROPDOWN
   Toggles .is-open on #cvDropdown; closes on outside click or Esc.
   Needs in HTML: #cvDropdown, #cvBtn
   ========================================================= */
(function () {
  'use strict';
  var Portfolio = window.Portfolio;

  Portfolio.initCvDropdown = function initCvDropdown() {
    const dropdown = document.getElementById('cvDropdown');
    const button = document.getElementById('cvBtn');
    if (!dropdown || !button) return;

    const setOpen = (open) => {
      dropdown.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    };

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!dropdown.classList.contains('is-open'));
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  };
})();