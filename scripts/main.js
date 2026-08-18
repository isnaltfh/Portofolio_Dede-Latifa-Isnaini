/* =========================
   BURGER MENU
========================= */

const nav = document.querySelector(".nav");
const burger = document.querySelector(".burger");

if (nav && burger) {
  burger.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");

    burger.setAttribute(
      "aria-expanded",
      opened ? "true" : "false"
    );
  });
}


/* =========================
   ACTIVE NAV LINK
========================= */

const navLinks = [
  ...document.querySelectorAll('nav a[href^="#"]')
];

function setActiveNav() {
  const position = window.scrollY + 120;

  navLinks.forEach((link) => {
    const id = link.getAttribute("href");

    if (!id || id === "#") return;

    const section = document.querySelector(id);

    if (!section) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    link.classList.toggle(
      "active",
      position >= top && position < bottom
    );
  });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);


/* =========================
   CLOSE MOBILE MENU
========================= */

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!nav || !burger) return;

    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });
});


/* =========================
   REVEAL ON SCROLL
========================= */

const revealElements =
  document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("in");
  });
}


/* =========================
   PORTFOLIO FILTERS
========================= */

const portfolioPills =
  document.querySelectorAll(
    "#portfolios .portfolio-filters .pill"
  );

const portfolioCards =
  document.querySelectorAll(
    "#portfolios .portfolio-card"
  );

portfolioPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    portfolioPills.forEach((item) => {
      item.classList.remove("active");
    });

    pill.classList.add("active");

    const filter = pill.dataset.filter;

    portfolioCards.forEach((card) => {
      const category = card.dataset.cat;

      const shouldShow =
        filter === "all" ||
        category === filter;

      card.classList.toggle(
        "is-hidden",
        !shouldShow
      );
    });

    relayoutTimeline();
  });
});


/* =========================
   PORTFOLIO LAYOUT
========================= */

function relayoutTimeline() {
  const timeline =
    document.querySelector(".portfolio-timeline");

  if (!timeline) return;

  const visibleCards = [
    ...timeline.querySelectorAll(".portfolio-card")
  ].filter(
    (card) =>
      !card.classList.contains("is-hidden")
  );

  visibleCards.forEach((card, index) => {
    card.classList.toggle(
      "left",
      index % 2 === 0
    );

    card.classList.toggle(
      "right",
      index % 2 === 1
    );
  });
}

window.addEventListener(
  "load",
  relayoutTimeline
);


/* =========================
   CV DOWNLOAD DROPDOWN
========================= */

const cvDownload =
  document.querySelector(".cv-download");

const cvDownloadBtn =
  document.getElementById("cvDownloadBtn");

const cvMenu =
  document.getElementById("cvMenu");

if (cvDownload && cvDownloadBtn && cvMenu) {

  cvDownloadBtn.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen =
        cvDownload.classList.toggle("active");

      cvDownloadBtn.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );
    }
  );


  /* Jangan tutup saat klik di dalam dropdown */
  cvMenu.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();
    }
  );


  /* Tutup setelah memilih CV */
  document
    .querySelectorAll(".cv-option")
    .forEach((option) => {
      option.addEventListener(
        "click",
        () => {
          cvDownload.classList.remove("active");

          cvDownloadBtn.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      );
    });


  /* Klik area luar = tutup */
  document.addEventListener(
    "click",
    (event) => {
      if (!cvDownload.contains(event.target)) {
        cvDownload.classList.remove("active");

        cvDownloadBtn.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    }
  );


  /* Tombol Escape = tutup */
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        cvDownload.classList.remove("active");

        cvDownloadBtn.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    }
  );
}


/* =========================
   DEBUG
========================= */

console.log("Portfolio JavaScript loaded successfully.");