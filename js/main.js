/* =========================================================
   MAIN SCRIPT (loaded last)
   Every feature lives in its own file in js/modules/ and registers
   itself on window.Portfolio. This file just starts them.
   To turn a feature off, remove its line below
   (and its <script> tag in index.html).
   ========================================================= */
(function () {
  'use strict';

  function start() {
    var P = window.Portfolio || {};
    [
      'initTheme',
      'initNavbar',
      'initCvDropdown',
      'initMarquee',        // before imageFallback & modal, so copied cards work too
      'initImageFallback',
      'initScrollReveal',
      'initCounters',
      'initFilters',
      'initModal',
      'initBackToTop'
    ].forEach(function (name) {
      if (typeof P[name] !== 'function') return;
      try {
        P[name]();
      } catch (err) {
        console.error('[portfolio] ' + name + ' failed:', err);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();