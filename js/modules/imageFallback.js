/* =========================================================
   IMAGE FALLBACK
   <span data-fallback-wrap><img data-fallback …></span>
   If the image file does not exist (yet), the wrapper gets .is-missing
   and CSS shows a styled placeholder instead of a broken image.
   Used by: certificates and the About photo.
   ========================================================= */
(function () {
  'use strict';
  var Portfolio = window.Portfolio;

  Portfolio.initImageFallback = function initImageFallback() {
    document.querySelectorAll('img[data-fallback]').forEach((img) => {
      const wrap = img.closest('[data-fallback-wrap]') || img.parentElement;
      const markMissing = () => wrap.classList.add('is-missing');
      const markLoaded = () => wrap.classList.remove('is-missing');

      // The image may have already failed/loaded before this script ran
      if (img.complete) {
        if (img.naturalWidth === 0) markMissing();
      }
      img.addEventListener('error', markMissing);
      img.addEventListener('load', markLoaded);
    });
  };
})();