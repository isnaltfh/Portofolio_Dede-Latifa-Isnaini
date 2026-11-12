/* =========================================================
   MARQUEE (sideways-moving rows)
   Any element with [data-marquee] scrolls its children sideways forever.
   Used by: the tech strip under the hero and the certificate rows.

   How it works: one "set" of items is measured, then copied enough
   times to fill the screen. CSS moves the row by exactly one set
   (--shift) and loops, so there is never a gap.
   Speed is constant: about 40px per second.
   ========================================================= */
(function () {
  'use strict';
  var Portfolio = window.Portfolio;
  var SPEED = 40; // px per second

  function setup(track) {
    if (track.dataset.marqueeReady) return;
    var originals = Array.prototype.slice.call(track.children);
    if (!originals.length) return;

    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    var setWidth = originals.reduce(function (w, el) { return w + el.getBoundingClientRect().width + gap; }, 0);
    if (!setWidth) return;

    // Enough copies to cover the screen while the first set slides out
    var copies = Math.max(1, Math.ceil(window.innerWidth / setWidth));
    for (var i = 0; i < copies; i++) {
      originals.forEach(function (item) {
        var clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('tabindex', '-1'); // keyboard users only tab through the originals
        track.appendChild(clone);
      });
    }

    track.style.setProperty('--shift', setWidth + 'px');
    track.style.setProperty('--duration', Math.round(setWidth / SPEED) + 's');
    track.dataset.marqueeReady = 'true';
  }

  Portfolio.initMarquee = function initMarquee() {
    document.querySelectorAll('[data-marquee]').forEach(setup);
  };
})();