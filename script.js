// ===== THEME TOGGLE =====
(function themeInit(){
  const saved = localStorage.getItem('theme');
  if(saved === 'light' || saved === 'dark') document.documentElement.setAttribute('data-theme', saved);
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  document.getElementById('iconSun').style.display = isLight ? 'none' : '';
  document.getElementById('iconMoon').style.display = isLight ? '' : 'none';
})();

document.getElementById('themeBtn').addEventListener('click', () => {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  const isLight = next === 'light';
  document.getElementById('iconSun').style.display = isLight ? 'none' : '';
  document.getElementById('iconMoon').style.display = isLight ? '' : 'none';
});

// ===== MOBILE MENU =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
}));

// ===== ACTIVE LINK ON SCROLL =====
const sections = [...document.querySelectorAll('section, header.hero')];
const links = [...document.querySelectorAll('.nav-links a')];
const map = new Map(sections.map(s => [s.id || 'home', s]));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const id = entry.target.id || 'home';
      links.forEach(l => l.removeAttribute('aria-current'));
      const link = links.find(l => l.getAttribute('href') === `#${id}`);
      if(link) link.setAttribute('aria-current','page');
    }
  });
}, { rootMargin: '-50% 0px -40% 0px', threshold: 0.01 });

sections.forEach(s => io.observe(s));

// Year
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});