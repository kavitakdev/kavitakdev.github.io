const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const nav = $('#nav');
const menuToggle = $('#menuToggle');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
}
$$('#nav a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));

const progress = $('#progressBar');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress && max > 0) progress.style.width = `${(scrollY / max) * 100}%`;
}, {passive:true});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

const glow = $('#cursorGlow');
window.addEventListener('pointermove', e => {
  if (glow) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }
});

const year = $('#year');
if (year) year.textContent = new Date().getFullYear();

// Reliable smooth scrolling for all internal links, including the hero button,
// navigation and the SCROLL cue.
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      history.pushState(null, '', href);
    }
  });
});
