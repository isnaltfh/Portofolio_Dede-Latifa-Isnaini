/* =========================================================
   THEME TOGGLE (light / dark)
   The button #themeToggle switches data-theme on <html> and remembers
   the choice. Colors for both themes: css/base/variables.css
   ========================================================= */
(function () {
  'use strict';
  var Portfolio = window.Portfolio;

  Portfolio.initTheme = function initTheme() {
    var root = document.documentElement;
    var button = document.getElementById('themeToggle');
    if (!button) return;

    function label() {
      var dark = root.getAttribute('data-theme') === 'dark';
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('aria-pressed', String(dark));
    }

    button.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      Portfolio.saveTheme(next);
      label();
    });

    // Follow the system setting while the visitor hasn't picked one
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function (e) {
        if (Portfolio.getSavedTheme()) return;
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        label();
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
    }

    label();
  };
})();