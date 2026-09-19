const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const nav = $('#nav');
$('#menuToggle').addEventListener('click', () => nav.classList.toggle('open'));
$$('#nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const progress = $('#progressBar');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${(scrollY / max) * 100}%`;
}, {passive:true});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

const glow = $('#cursorGlow');
window.addEventListener('pointermove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

$('#year').textContent = new Date().getFullYear();

$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if(target) {
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});
