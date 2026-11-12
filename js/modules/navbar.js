/* =========================================================
   NAVBAR
   - adds .is-scrolled to the navbar after scrolling
   - opens/closes the mobile menu (hamburger)
   - highlights the link of the section currently on screen
   Needs in HTML: #nav, #navToggle, #navLinks, <section id="…">
   ========================================================= */
(function () {
  'use strict';
  var Portfolio = window.Portfolio;

  Portfolio.initNavbar = function initNavbar() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!nav || !toggle || !links) return;

    // 1. Shadow on scroll
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 2. Mobile menu
    const closeMenu = () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

    // 3. Active link while scrolling (scroll-spy)
    if (!('IntersectionObserver' in window)) return;
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const link = links.querySelector(`a[href="#${entry.target.id}"]`);
          if (!link) return;
          links.querySelectorAll('a.is-active').forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));
  };
})();