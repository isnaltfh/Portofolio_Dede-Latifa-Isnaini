// Burger menu
const nav = document.querySelector('.nav');
const burger = document.querySelector('.burger');
if (burger) {
  burger.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });
}

// Active nav link (simple)
const links = [...document.querySelectorAll('nav a[href^="#"]')];
function setActive() {
  const pos = window.scrollY + 120;
  links.forEach(a => {
    const id = a.getAttribute('href');
    const sec = document.querySelector(id);
    if (!sec) return;
    const top = sec.offsetTop, bottom = top + sec.offsetHeight;
    a.classList.toggle('active', pos >= top && pos < bottom);
  });
}
window.addEventListener('scroll', setActive);
setActive();

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
},{ threshold: .12 });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// Portfolio filters
const pills = document.querySelectorAll('.portfolio-filters .pill');
const cards = document.querySelectorAll('.portfolio-card');
pills.forEach(p => p.addEventListener('click', () => {
  pills.forEach(x => x.classList.remove('active'));
  p.classList.add('active');
  const f = p.dataset.filter;
  cards.forEach(c => {
    const ok = f === 'all' || c.dataset.cat === f;
    c.style.display = ok ? '' : 'none';
  });
}));

// Close menu after clicking a link (mobile)
links.forEach(a => a.addEventListener('click', () => {
  if (nav.classList.contains('open')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
}));

// Atur ulang kiri/kanan hanya untuk kartu yang terlihat
function relayoutTimeline(){
  const tl = document.querySelector('.portfolio-timeline');
  if(!tl) return;
  const visible = [...tl.querySelectorAll('.portfolio-card')].filter(el => !el.classList.contains('is-hidden'));
  visible.forEach((el, i) => {
    el.classList.toggle('left',  i % 2 === 0);
    el.classList.toggle('right', i % 2 === 1);
  });
}

// Panggil saat load
window.addEventListener('load', relayoutTimeline);

// Contoh integrasi dengan pill filter Anda:
document.querySelectorAll('#portfolios .portfolio-filters .pill').forEach(btn=>{
  btn.addEventListener('click', () => {
    // ... logika filter milik Anda (tambah/hapus .is-hidden) ...
    relayoutTimeline();
  });
});

