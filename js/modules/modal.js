/* =========================================================
   MODAL (native <dialog id="modal">)
   - Project: a button with [data-modal-case] opens the hidden
     .case block inside the same <article class="project">
   - Certificate: a .cert button with [data-modal-image] opens
     an enlarged view of its image
   Closes with the X button, Esc, or a click on the dark backdrop.
   ========================================================= */
(function () {
  'use strict';
  var Portfolio = window.Portfolio;

  Portfolio.initModal = function initModal() {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    const closeBtn = document.getElementById('modalClose');
    if (!modal || !body || typeof modal.showModal !== 'function') return;

    let lastTrigger = null;

    const open = (content, trigger) => {
      body.replaceChildren(content);
      lastTrigger = trigger;
      modal.showModal();
      document.documentElement.classList.add('has-modal');
      modal.querySelector('.modal__panel').scrollTop = 0;
    };

    const close = () => modal.close();

    modal.addEventListener('close', () => {
      document.documentElement.classList.remove('has-modal');
      body.replaceChildren();
      if (lastTrigger) lastTrigger.focus();
    });
    closeBtn.addEventListener('click', close);
    // Click on the backdrop (outside the panel) closes it
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    // ---- Project case studies ----
    document.querySelectorAll('[data-modal-case]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const project = btn.closest('.project');
        const source = project && project.querySelector('.case');
        if (!source) return;

        const content = source.cloneNode(true);
        content.hidden = false;

        // Add the project screenshot under the title
        const img = project.querySelector('.project__shot img');
        if (img) {
          const figure = document.createElement('figure');
          figure.className = 'case__shot';
          figure.appendChild(img.cloneNode());
          content.querySelector('.case__title').after(figure);
        }
        open(content, btn);
      });
    });

    // ---- Certificates ----
    document.querySelectorAll('[data-modal-image]').forEach((card) => {
      card.addEventListener('click', () => {
        const view = document.createElement('div');
        view.className = 'cert-view';

        const media = document.createElement('div');
        media.className = 'cert-view__media';
        const thumb = card.querySelector('.cert__thumb');
        const img = thumb && thumb.querySelector('img');

        if (img && !thumb.classList.contains('is-missing')) {
          const big = img.cloneNode();
          big.removeAttribute('loading');
          media.appendChild(big);
        } else if (thumb) {
          media.appendChild(thumb.cloneNode(true)); // styled placeholder
        }

        const title = document.createElement('h3');
        title.textContent = card.querySelector('.cert__name')?.textContent || '';
        const issuer = document.createElement('p');
        issuer.textContent = card.querySelector('.cert__issuer')?.textContent || '';

        view.append(media, title, issuer);
        open(view, card);
      });
    });
  };
})();