// Prevent browsers from restoring previous scroll position on reload which
// can cause a small visual 'jump' when the page finishes loading.
try {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
} catch (e) { /* ignore */ }

// Ensure no element is auto-focused on load which can also trigger a scroll jump.
window.addEventListener('DOMContentLoaded', () => {
  try { if (document.activeElement && typeof document.activeElement.blur === 'function') document.activeElement.blur(); } catch(e){}
});

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

// Enhanced smooth scroll with fixed nav offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed nav height
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
    });
});

// Add scroll-based nav styling and hero effects
let lastScrollY = window.scrollY;
const nav = document.querySelector('.nav');
const hero = document.querySelector('.hero');
const heroBackground = document.querySelector('.hero-background');
const scrollIndicator = document.querySelector('.scroll-indicator');

function handleNavScroll() {
  const currentScrollY = window.scrollY;
  const heroHeight = hero ? hero.offsetHeight : 0;
  const scrollProgress = Math.min(currentScrollY / heroHeight, 1);
  
  // Enhanced navigation styling
  if (currentScrollY > 100) {
    nav.style.background = 'color-mix(in oklab, var(--bg), transparent 10%)';
    nav.style.backdropFilter = 'blur(20px)';
  } else {
    nav.style.background = 'color-mix(in oklab, var(--bg), transparent 20%)';
    nav.style.backdropFilter = 'blur(16px)';
  }
  
  // Hero background parallax and fade effects
  if (heroBackground) {
    const parallaxOffset = currentScrollY * 0.5;
    heroBackground.style.transform = `translateY(${parallaxOffset}px)`;
    heroBackground.style.opacity = Math.max(0.1, 1 - scrollProgress);
  }
  
  // Hide scroll indicator when scrolling
  if (scrollIndicator) {
    scrollIndicator.style.opacity = Math.max(0, 1 - scrollProgress * 3);
  }
  
  // Add scrolled class to hero for CSS transitions
  if (hero) {
    if (scrollProgress > 0.1) {
      hero.classList.add('scrolled');
    } else {
      hero.classList.remove('scrolled');
    }
  }
  
  lastScrollY = currentScrollY;
}

// Initialize enhanced 3D hero animations
function initHero3D() {
  const particles = document.querySelectorAll('.particle-cube');
  const glowOrbs = document.querySelectorAll('.glow-orb');
  
  // Add random animation delays and positions
  particles.forEach((particle, index) => {
    const randomDelay = Math.random() * 6;
    const randomDuration = 6 + Math.random() * 6;
    particle.style.animationDelay = `-${randomDelay}s`;
    particle.style.animationDuration = `${randomDuration}s`;
  });
  
  // Mouse parallax effect for desktop
  if (window.innerWidth > 960) {
    document.addEventListener('mousemove', (e) => {
      const mouseX = (e.clientX / window.innerWidth) - 0.5;
      const mouseY = (e.clientY / window.innerHeight) - 0.5;
      
      particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 0.5;
        const x = mouseX * speed * 20;
        const y = mouseY * speed * 20;
        particle.style.transform = `translate(${x}px, ${y}px) rotateX(${y}deg) rotateY(${x}deg)`;
      });
      
      glowOrbs.forEach((orb, index) => {
        const speed = (index % 2 + 1) * 0.3;
        const x = mouseX * speed * 30;
        const y = mouseY * speed * 30;
        orb.style.transform = `translate(${x}px, ${y}px) scale(${1 + Math.abs(mouseX + mouseY) * 0.1})`;
      });
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initHero3D();
});

window.addEventListener('scroll', handleNavScroll, { passive: true });

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
  let _savedScrollY = 0;

  function openLightbox(src, alt){
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('show');
  // preserve scroll position and prevent background scroll by fixing body
  _savedScrollY = window.scrollY || window.pageYOffset || 0;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${_savedScrollY}px`;
  document.documentElement.style.overflow = 'hidden';
  lightbox.focus();
  }

  function closeLightbox(){
    lightbox.classList.remove('show');
  // restore scroll position and remove fixed body
  document.documentElement.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, _savedScrollY);
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
  // Update ring positions dynamically so CSS hard-coded angles are optional fallback
  const radiusZ = 320; // must match translateZ distance in CSS
  cards.forEach((c, i) => {
    c.style.transform = `rotateY(${(360 / N) * i}deg) translateZ(${radiusZ}px)`;
  });
  const step = 360 / N;
  let idx = 0;

  // cumulative rotation in degrees (use continuous rotation so CSS transition always animates the small delta)
  let rotation = 0; // corresponds to rotateY(rotation deg)

  function updateTransform() {
    track.style.transform = `translateZ(-120px) rotateY(${rotation}deg)`;
  }

  const liveRegion = document.getElementById('certLive');

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
    if(liveRegion){
      const title = front.getAttribute('data-title') || front.querySelector('p')?.textContent || 'Certification';
      liveRegion.textContent = `Showing ${title}`;
    }

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

  // Make cards clickable even inside drag area:
  // - Click front card => open link (new tab)
  // - Click non-front enabled card => rotate it to front then open
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      const disabled = card.getAttribute('aria-disabled') === 'true';
      const href = card.getAttribute('href');
      if(disabled || !href) { e.preventDefault(); return; }

      // If not front yet, rotate shortest path to it first
      if(!card.classList.contains('is-front')){
        e.preventDefault();
        const targetIdx = cards.indexOf(card);
        // distance forward (positive) in ring
        let diff = (targetIdx - idx) % N;
        if(diff < 0) diff += N;
        // choose shortest direction
        if(diff > N/2) diff = diff - N; // go negative instead
        go(diff);
        // After rotation completes (CSS transition ~600ms), open link
        if(href !== '#') setTimeout(()=> { window.open(href, '_blank', 'noopener'); }, 620);
        return;
      }

      // Front card: ensure new tab & prevent drag logic from hijacking
      if(href === '#') { e.preventDefault(); return; }
      card.setAttribute('target','_blank');
      if(!card.getAttribute('rel')) card.setAttribute('rel','noopener');
      // let default proceed (new tab because of target)
    });
  });

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
  // If initiating on a front, enabled cert card, let click/open happen instead of drag
  const card = e.target.closest('.cert-card');
  if(card && card.classList.contains('is-front') && card.getAttribute('aria-disabled') !== 'true') return;
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

  // Init (ensure initial front styling applied immediately)
  updateTransform();
  setFront();
})();

// ===== PROJECTS SHOWCASE =====
function initProjectShowcase() {
  const showcase = document.querySelector('.project-showcase');
  if (!showcase) return;

  const slides = showcase.querySelectorAll('.project-slide');
  const indicators = showcase.querySelectorAll('.indicator');
  const prevBtn = showcase.querySelector('.prev-btn');
  const nextBtn = showcase.querySelector('.next-btn');
  
  let currentSlide = 0;
  let autoPlayInterval;
  let isPlaying = true;
  let hoverTimeout;
  let isHovering = false;

  // AR Scene rotation for CompMed AR
  function initARScene() {
    const arImages = [
      'project_images/project1/1.jpg',
      'project_images/project1/2.png', 
      'project_images/project1/3.jpg'
    ];
    
    let arIndex = 0;
    const arContainer = document.querySelector('.ar-scene');
    if (!arContainer) return;

    // Create AR image elements
    arImages.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.className = `ar-image ${index === 0 ? 'active' : ''}`;
      img.alt = `AR Medical Visualization ${index + 1}`;
      arContainer.appendChild(img);
    });

    // Auto-rotate AR images
    setInterval(() => {
      const images = arContainer.querySelectorAll('.ar-image');
      if (images.length > 0) {
        images[arIndex].classList.remove('active');
        arIndex = (arIndex + 1) % images.length;
        images[arIndex].classList.add('active');
      }
    }, 3000);
  }

  // AI particles animation
  function createAIParticles() {
    const aiOverlay = document.querySelector('.ai-overlay');
    if (!aiOverlay) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'ai-particles';
    
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 4 + 's';
      particlesContainer.appendChild(particle);
    }
    
    aiOverlay.appendChild(particlesContainer);
  }

  function updateSlide(index) {
    // Ensure index is within bounds
    index = Math.max(0, Math.min(index, slides.length - 1));
    
    // Remove active/prev classes
    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev');
      if (i < index) {
        slide.classList.add('prev');
      } else if (i === index) {
        slide.classList.add('active');
      }
    });

    // Update indicators
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });

    // Buttons are always enabled for endless loop navigation

    currentSlide = index;
  }

  function nextSlide() {
    if (currentSlide < slides.length - 1) {
      updateSlide(currentSlide + 1);
    } else {
      updateSlide(0); // Loop back to first project
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      updateSlide(currentSlide - 1);
    } else {
      updateSlide(slides.length - 1); // Loop back to last project
    }
  }

  function goToSlide(index) {
    updateSlide(index);
  }

  function startAutoPlay() {
    if (!isPlaying || isHovering) return;
    stopAutoPlay(); // Clear any existing interval
    autoPlayInterval = setInterval(() => {
      if (!isHovering && currentSlide < slides.length - 1) {
        nextSlide();
      } else if (!isHovering) {
        updateSlide(0); // Loop back to first
      }
    }, 6000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  function handleMouseEnter() {
    isHovering = true;
    stopAutoPlay();
    
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
  }

  function handleMouseLeave() {
    isHovering = false;
    
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    
    // Wait 4 seconds before resuming autoplay
    hoverTimeout = setTimeout(() => {
      if (!isHovering && isPlaying) {
        startAutoPlay();
      }
    }, 4000);
  }

  // Navigation event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      stopAutoPlay();
      prevSlide();
      setTimeout(startAutoPlay, 3000);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      stopAutoPlay();
      nextSlide();
      setTimeout(startAutoPlay, 3000);
    });
  }

  // Indicator clicks with data-slide attribute
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      stopAutoPlay();
      const slideIndex = indicator.getAttribute('data-slide');
      if (slideIndex !== null) {
        updateSlide(parseInt(slideIndex));
      } else {
        updateSlide(index);
      }
      setTimeout(startAutoPlay, 3000);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const showcaseRect = showcase.getBoundingClientRect();
    const isVisible = showcaseRect.top < window.innerHeight && showcaseRect.bottom > 0;
    
    if (!isVisible) return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stopAutoPlay();
      prevSlide();
      setTimeout(startAutoPlay, 3000);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      stopAutoPlay();
      nextSlide();
      setTimeout(startAutoPlay, 3000);
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      if (isPlaying) {
        stopAutoPlay();
        isPlaying = false;
      } else {
        isPlaying = true;
        startAutoPlay();
      }
    }
  });

  // Touch/swipe support
  let startX = null;
  let startY = null;
  let isDragging = false;

  showcase.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });

  showcase.addEventListener('touchmove', (e) => {
    if (!isDragging || !startX || !startY) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    const diffX = startX - currentX;
    const diffY = startY - currentY;
    
    // Only handle horizontal swipes
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      e.preventDefault();
    }
  }, { passive: false });

  showcase.addEventListener('touchend', (e) => {
    if (!isDragging || !startX || !startY) return;
    
    const currentX = e.changedTouches[0].clientX;
    const diffX = startX - currentX;
    
    if (Math.abs(diffX) > 50) { // Minimum swipe distance
      stopAutoPlay();
      if (diffX > 0 && currentSlide < slides.length - 1) {
        nextSlide();
      } else if (diffX < 0 && currentSlide > 0) {
        prevSlide();
      }
      setTimeout(startAutoPlay, 3000);
    }
    
    startX = null;
    startY = null;
    isDragging = false;
  }, { passive: true });

  // Pause autoplay on hover (desktop and tablet)
  if (window.innerWidth > 768) {
    showcase.addEventListener('mouseenter', handleMouseEnter);
    showcase.addEventListener('mouseleave', handleMouseLeave);
  }

  // Handle window resize for responsive behavior
  window.addEventListener('resize', () => {
    // Re-evaluate hover behavior based on new screen size
    const newWidth = window.innerWidth;
    if (newWidth > 768 && !showcase.dataset.hoverListeners) {
      showcase.addEventListener('mouseenter', handleMouseEnter);
      showcase.addEventListener('mouseleave', handleMouseLeave);
      showcase.dataset.hoverListeners = 'true';
    } else if (newWidth <= 768 && showcase.dataset.hoverListeners) {
      showcase.removeEventListener('mouseenter', handleMouseEnter);
      showcase.removeEventListener('mouseleave', handleMouseLeave);
      delete showcase.dataset.hoverListeners;
      // Resume autoplay on mobile if paused
      if (isPlaying && !autoPlayInterval) {
        startAutoPlay();
      }
    }
  });

  // Intersection Observer for performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && isPlaying) {
        startAutoPlay();
      } else {
        stopAutoPlay();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(showcase);

  // Initialize everything
  updateSlide(0);
  initARScene();
  createAIParticles();
  
  // Start autoplay after a short delay
  // setTimeout(() => {
  //   if (isPlaying) startAutoPlay();
  // }, 1000);

  // Global functions for external access
  window.prevProject = prevSlide;
  window.nextProject = nextSlide;
  window.goToProject = goToSlide;
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    stopAutoPlay();
    if (hoverTimeout) clearTimeout(hoverTimeout);
    if (observer) observer.disconnect();
  });
}

// Initialize the showcase when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjectShowcase);
} else {
  initProjectShowcase();
}

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
