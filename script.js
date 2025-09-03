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

// ===== SPLASH / FAKE LOADING (first visit only) =====
(function splashInit(){
  try{
    if(localStorage.getItem('seenSplash') === '1'){
      const s = document.getElementById('splashOverlay'); if(s) s.remove();
      return;
    }
  }catch(e){ /* ignore localStorage errors */ }

  const splash = document.getElementById('splashOverlay');
  if(!splash) return;
  const ring = splash.querySelector('.splash-ring');

  // random duration between 1000ms and 2000ms
  const dur = 1000 + Math.floor(Math.random() * 1001);
  if(ring) ring.style.animationDuration = (dur/1000) + 's';

  // show for dur then fade
  setTimeout(()=>{
    splash.classList.add('hidden');
    // remove after fade
    setTimeout(()=>{ try{ splash.remove(); }catch(e){} }, 500);
  }, dur);

  try{ localStorage.setItem('seenSplash','1'); }catch(e){}
})();

// ===== REVEAL ON SCROLL (first visit only) =====
(function revealOnScroll(){
  // enable the CSS hooks on every visit
  document.documentElement.classList.add('do-animate');

  const items = Array.from(document.querySelectorAll('.reveal'));
  if(!items.length) return;

  // use a small negative bottom rootMargin so elements near viewport bottom trigger
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        el.classList.add('in-view');
        io.unobserve(el);
      }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px 12% 0px' });

  // stagger small delays for visible ones; if an element is already visible on load,
  // mark it as in-view immediately so users don't need to overscroll.
  items.forEach((el, i) => {
    el.style.transitionDelay = (i * 40) + 'ms';
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight && rect.bottom > 0){
      el.classList.add('in-view');
    } else {
      io.observe(el);
    }
  });
})();

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
  let timer = setInterval(()=> show(idx+1), 4000);
  frame.addEventListener('mouseover', ()=> clearInterval(timer));

  // --- LIGHTBOX / VIEW MODE for mobile/touch users ---
  function createLightbox(){
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.tabIndex = -1;
    lb.innerHTML = `
      <div class="lb-inner">
        <button class="lb-close" aria-label="Close image">✕</button>
        <img src="" alt="" />
      </div>
    `;
    document.body.appendChild(lb);
    return lb;
  }

  const lightbox = createLightbox();
  const lbImg = lightbox.querySelector('img');
  const lbClose = lightbox.querySelector('.lb-close');

  function openLightbox(src, alt){
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('show');
    // prevent background scroll on mobile
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    lightbox.focus();
  }

  function closeLightbox(){
    lightbox.classList.remove('show');
    // restore scroll
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  // attach click to images
  items.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      // only open for tap/clicks (not navigation links behind images)
      const src = img.getAttribute('src') || img.querySelector && img.querySelector('img')?.src;
      const alt = img.getAttribute('alt') || img.querySelector && img.querySelector('img')?.alt;
      if(!src) return;
      openLightbox(src, alt);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && lightbox.classList.contains('show')) closeLightbox();
  });
})();

// ===== CERTIFICATION CAROUSEL (manual) =====
(function certCarouselInit(){
  const viewport = document.querySelector('.cert-viewport');
  const track = document.querySelector('.cert-track');
  if(!viewport || !track) return;

  const cards = Array.from(track.querySelectorAll('.cert-card'));
  const prevBtn = document.querySelector('.cert-prev');
  const nextBtn = document.querySelector('.cert-next');

  const N = cards.length;
  const step = 360 / N;
  let idx = 0;

  // cumulative rotation in degrees (use continuous rotation so CSS transition always animates the small delta)
  let rotation = 0; // corresponds to rotateY(rotation deg)

  function updateTransform() {
    track.style.transform = `translateZ(-120px) rotateY(${rotation}deg)`;
  }

  function setFront() {
    // determine which card is at front from the cumulative rotation
    // normalized angle in [0,360)
    const normalized = ((-rotation % 360) + 360) % 360;
    const frontIndex = Math.round(normalized / step) % N;
    idx = ((frontIndex % N) + N) % N;

    // apply current transform (rotation already set by go)
    updateTransform();

    cards.forEach(c => c.classList.remove('is-front'));
    const front = cards[idx];
    front.classList.add('is-front');

    // Enable link only for the front; disable behind to avoid accidental clicks
    cards.forEach(c => {
      const disabled = !c.classList.contains('is-front') || c.getAttribute('aria-disabled') === 'true';
      c.style.pointerEvents = disabled ? 'none' : 'auto';
    });
  }

  function go(delta){
    // accumulate rotation so we don't jump when wrapping past 0/360
    rotation -= delta * step;
    setFront();
  }

  prevBtn?.addEventListener('click', () => go(-1));
  nextBtn?.addEventListener('click', () => go(1));

  // Keyboard arrows for accessibility
  viewport.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') go(-1);
    if(e.key === 'ArrowRight') go(1);
  });
  viewport.setAttribute('tabindex', '0'); // Focusable container

  // Pointer / touch swipe support (mobile): rotate the ring while dragging
  (function addSwipe(){
    let startX = 0; let startY = 0; let tracking = false; let pointerId = null;

    function onDown(e){
      if(e.pointerType === 'mouse' && e.button !== 0) return;
      startX = e.clientX; startY = e.clientY; tracking = true; pointerId = e.pointerId;
      try{ viewport.setPointerCapture(pointerId); } catch(_){}
      // disable transition for immediate drag feedback
      track.style.transition = 'none';
    }

    function onMove(e){
      if(!tracking || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX; const dy = e.clientY - startY;
      // ignore vertical drags
      if(Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy)) return;
      // map horizontal drag to rotation delta: full viewport drag -> one step
      const rotationDelta = (dx / Math.max(1, viewport.clientWidth)) * step;
      const rot = rotation + rotationDelta;
      track.style.transform = `translateZ(-120px) rotateY(${rot}deg)`;
    }

    function onUp(e){
      if(!tracking || e.pointerId !== pointerId) return;
      tracking = false;
      try{ viewport.releasePointerCapture(pointerId); } catch(_){}
      // restore transition
      track.style.transition = '';
      const dx = e.clientX - startX; const dy = e.clientY - startY;
      const THRESH = 40; // px
      if(Math.abs(dx) > THRESH && Math.abs(dx) > Math.abs(dy)){
        if(dx < 0) go(1); else go(-1);
      } else {
        // snap back to current rotation
        updateTransform();
      }
      pointerId = null;
    }

    function onCancel(){ tracking = false; track.style.transition = ''; updateTransform(); }

    viewport.addEventListener('pointerdown', onDown);
    viewport.addEventListener('pointermove', onMove);
    viewport.addEventListener('pointerup', onUp);
    viewport.addEventListener('pointercancel', onCancel);
  })();

  // Init
  updateTransform();
  setFront();
})();

// ===== TIMELINE COLLAPSE/EXPAND =====
(function timelineToggleInit(){
  const toggle = document.getElementById('timelineToggle');
  const body = document.getElementById('timelineBody');
  if(!toggle || !body) return;

  const COLLAPSED_MAX = 360; // must match CSS collapsed max-height
  const DURATION = 1000; // ms for both expand and collapse (slower)
  let runningAnim = null;

  function updateButton(isExpanded){
    toggle.textContent = isExpanded ? 'Show less' : 'Read more';
    toggle.setAttribute('aria-expanded', String(isExpanded));
  }

  function checkOverflow(){
    // Show the toggle when there are more than two timeline items so the "Read more"
    // button remains visible even if the collapsed body height is small (we hide items 3+ via CSS).
    try {
      const items = body.querySelectorAll('.t-item');
      if(items.length <= 2){
        toggle.style.display = 'none';
        return;
      }
    } catch(e){ /* ignore */ }
    toggle.style.display = '';
  }

  function animateHeight(expand){
    // cancel running animation
    if(runningAnim){
      try { runningAnim.cancel(); } catch(e) {}
      runningAnim = null;
    }
    const startHeight = body.getBoundingClientRect().height;

    // When expanding, we need to measure the full scrollHeight INCLUDING items
    // that are hidden via CSS when .expanded is not present. To measure correctly,
    // temporarily add the class then compute scrollHeight while keeping the
    // starting max-height to avoid layout jumps.
    let targetHeight;
    if(expand){
      // reveal content for measurement
      body.classList.add('expanded');
      // keep visible height at startHeight while we measure
      body.style.maxHeight = startHeight + 'px';
      // force reflow so changes take effect
      // eslint-disable-next-line no-unused-expressions
      body.offsetHeight;
      targetHeight = body.scrollHeight;
    } else {
      // collapsing: target is the collapsed max
      targetHeight = COLLAPSED_MAX;
    }

    // If already at target, just toggle class and update
    if(Math.abs(startHeight - targetHeight) < 2){
      if(expand){
        // fully expanded
        body.style.maxHeight = 'none';
        body.classList.add('expanded');
      } else {
        body.classList.remove('expanded');
        body.style.maxHeight = COLLAPSED_MAX + 'px';
      }
      updateButton(expand);
      checkOverflow();
      return;
    }

    // Ensure starting max-height is explicit to animate from
    body.style.maxHeight = startHeight + 'px';
    // force reflow
    // eslint-disable-next-line no-unused-expressions
    body.offsetHeight;

    // Use Web Animations API where available
    try {
      runningAnim = body.animate(
        [ { maxHeight: startHeight + 'px' }, { maxHeight: targetHeight + 'px' } ],
        { duration: DURATION, easing: 'cubic-bezier(.2,.9,.2,1)', fill: 'forwards' }
      );

      runningAnim.onfinish = () => {
        runningAnim = null;
        if(expand){
          // fully expanded: remove maxHeight so content can grow naturally
          body.style.maxHeight = 'none';
          body.classList.add('expanded');
        } else {
          // collapsed: ensure class removed and maxHeight set
          body.classList.remove('expanded');
          body.style.maxHeight = COLLAPSED_MAX + 'px';
        }
        updateButton(expand);
        checkOverflow();
      };

      runningAnim.oncancel = () => { runningAnim = null; };
    } catch (e) {
      // fallback to instant toggle if WA API not available
      body.classList.toggle('expanded', expand);
      body.style.maxHeight = expand ? 'none' : COLLAPSED_MAX + 'px';
      updateButton(expand);
      checkOverflow();
    }
  }

  toggle.addEventListener('click', () => {
    const isExpanded = body.classList.contains('expanded');
    animateHeight(!isExpanded);
  });

  // run on load and on window resize
  checkOverflow();
  updateButton(body.classList.contains('expanded'));
  window.addEventListener('resize', () => {
    clearTimeout(window._timelineResize);
    window._timelineResize = setTimeout(() => checkOverflow(), 160);
  });
})();
