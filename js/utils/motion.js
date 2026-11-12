/* =========================================================
   SHARED SETUP (loaded first, in <head>)
   - adds class "js" to <html> so CSS knows JavaScript is running
     (content is only hidden for scroll animations when JS works)
   - applies the light/dark theme BEFORE the page paints (no flash):
     the visitor's saved choice, otherwise their system setting
   - creates the shared namespace window.Portfolio
   ========================================================= */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  window.Portfolio = window.Portfolio || {};
  var THEME_KEY = 'portfolio-theme';

  /* Does the visitor prefer reduced motion? */
  window.Portfolio.prefersReducedMotion = function () {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  /* Saved theme ('light' | 'dark') or null. Storage can be blocked, so guard it. */
  window.Portfolio.getSavedTheme = function () {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  };
  window.Portfolio.saveTheme = function (theme) {
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
  };

  var saved = window.Portfolio.getSavedTheme();
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', saved === 'dark' || saved === 'light' ? saved : (prefersDark ? 'dark' : 'light'));
})();