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

  // enable scoped transitions just for this change
  html.classList.add('theme-anim');

  // flip theme on next frame so the transition applies smoothly
  requestAnimationFrame(() => {
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);

    const isLight = next === 'light';
    document.getElementById('iconSun').style.display = isLight ? 'none' : '';
    document.getElementById('iconMoon').style.display = isLight ? '' : 'none';

    // remove the animation class after it finishes
    setTimeout(() => html.classList.remove('theme-anim'), 350);
  });
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

// ===== SIMPLE GALLERY CAROUSEL =====
(function galleryInit(){
  const frame = document.querySelector('.g-frame');
  if(!frame) return; // no gallery on page
  const items = Array.from(frame.querySelectorAll('.g-item'));
  let idx = 0;
  items.forEach((it, i) => it.classList.toggle('active', i === idx));

  function show(next){
    items[idx].classList.remove('active');
    idx = (next + items.length) % items.length;
    items[idx].classList.add('active');
  }

  document.querySelectorAll('.g-prev').forEach(b => b.addEventListener('click', ()=> show(idx-1)));
  document.querySelectorAll('.g-next').forEach(b => b.addEventListener('click', ()=> show(idx+1)));

  // build dots
  const dotsWrap = document.querySelector('.g-dots');
  if(dotsWrap){
    items.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'g-dot';
      d.setAttribute('aria-label', `Show image ${i+1}`);
      d.addEventListener('click', ()=> show(i));
      dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.children);
    function updateDots(){ dots.forEach((dd, i) => dd.classList.toggle('active', i === idx)); }
    updateDots();
    // ensure dots update on show
    const origShow = show;
    show = (next) => { origShow(next); updateDots(); };
  }

  // keyboard support
  document.addEventListener('keydown', (e)=>{
    if(!frame.closest('section')) return;
    if(e.key === 'ArrowLeft') show(idx-1);
    if(e.key === 'ArrowRight') show(idx+1);
  });

  // optional autoplay (commented out)
  // let timer = setInterval(()=> show(idx+1), 5000);
  // frame.addEventListener('mouseover', ()=> clearInterval(timer));
})();