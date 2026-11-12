# Portfolio — Dede Latifa Isnaini

Static portfolio (HTML + CSS + JavaScript), hosted on GitHub Pages.
Theme: milk-chocolate (latte), light & professional, with an animated coding illustration.

## Folder structure

```
Portofolio_Dede-Latifa-Isnaini/
├── index.html                  # Page content only (no inline CSS/JS)
├── README.md
│
├── css/
│   ├── main.css                # Entry: imports every file below, in order
│   ├── base/
│   │   ├── variables.css       # Light + dark colors, fonts (Fraunces / Figtree) ← theme
│   │   ├── reset.css           # Global reset, container, icons
│   │   └── typography.css      # Headings, eyebrow labels
│   ├── components/
│   │   ├── buttons.css         # .btn variants
│   │   ├── cards.css           # .card, .lift, tags, pills, color helpers
│   │   ├── dropdown.css        # Download CV menu
│   │   └── modal.css           # Pop-up for case studies & certificates
│   ├── layout/
│   │   ├── navbar.css
│   │   └── footer.css          # Footer + back-to-top
│   ├── sections/               # One file per section of index.html
│   │   ├── hero.css
│   │   ├── marquee.css
│   │   ├── about.css
│   │   ├── expertise.css
│   │   ├── skills.css
│   │   ├── portfolio.css
│   │   ├── experience.css
│   │   ├── certificates.css
│   │   └── contact.css
│   └── utilities/
│       ├── animations.css      # Keyframes, .fu, .reveal, .float, .spin
│       └── responsive.css      # All breakpoints in one place
│
├── js/
│   ├── main.js                 # Loaded last: starts every feature
│   ├── utils/
│   │   └── motion.js           # Loaded first: html.js class, theme, window.Portfolio
│   └── modules/
│       ├── navbar.js           # Scroll shadow, mobile menu, active link
│       ├── cvDropdown.js       # Download CV menu
│       ├── scrollReveal.js     # Fade-in on scroll
│       ├── counter.js          # Count-up stats
│       ├── marquee.js          # Sideways-moving rows (tech strip, certificates)
│       ├── filter.js           # Project filter tabs
│       ├── modal.js            # Case-study & certificate pop-up
│       ├── imageFallback.js    # Placeholder when an image is missing
│       ├── backToTop.js        # Back-to-top button
│       └── theme.js            # Light / dark mode button
│
├── images/
│   ├── illustrations/
│   │   └── coding-girl.svg     # Animated illustration (its CSS is inside the SVG)
│   ├── certificates/           # Certificate images (see README.txt inside)
│   ├── profile.png             # Your photo (portrait)
│   └── chatbot.png, projek2.png, projek4.png, projek5.png, projek6.png, projek_simpel.png
│
└── resume/                     # CV PDFs (downloaded by the setup script)
```

## Rules that keep things from clashing

- **HTML** holds content only — no `style=""` blocks or inline `<script>`.
  (Exception: the timeline dot color `style="--dot:…"` is a CSS variable, not a style rule.)
- **CSS**: one file per section; class names are prefixed by their block
  (`.hero__title`, `.project__body`, `.nav__links`). Breakpoints live only in `responsive.css`.
- **JS**: one feature per module. Each module looks up its own elements by `id`
  and quietly does nothing if they are missing.
- State classes are shared vocabulary: `.is-open`, `.is-active`, `.is-visible`, `.is-scrolled`, `.is-missing`; filters use the `hidden` attribute.

## Running locally

Just double-click `index.html` — it works straight from the folder (no server needed).
VS Code **Live Server** also works and reloads automatically when you save.

How the JavaScript is organized:
- `js/utils/motion.js` loads first (in `<head>`): adds `class="js"` to `<html>` and creates `window.Portfolio`.
- Each file in `js/modules/` adds one `Portfolio.initSomething()` function.
- `js/main.js` loads last and starts them all. A failing feature never blocks the others.

## Adding content later

- **Project**: copy one `<article class="project">` block in the `#work` section.
  The hidden `<div class="case">` inside it is what the *Case study* pop-up shows.
- **Certificate**: put the image in `images/certificates/`, then copy one
  `<button class="cert">` block into either row of the `#certificates` section.
- **Filter category**: add a `<button class="filter" data-filter-group="…" data-filter="new">`
  and use `data-cat="new"` on the items.