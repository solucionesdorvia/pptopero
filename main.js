/* ============================================================
   OPERO · Presentation controller
   - Keyboard nav: ← → Space (forward), Escape (reset to start)
   - Click navigation: dots + prev/next buttons
   - Touch swipe support
   ============================================================ */

(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;

  const progressFill = document.getElementById('progressFill');
  const counterCurrent = document.getElementById('counterCurrent');
  const counterTotal = document.getElementById('counterTotal');
  const dotsWrap = document.getElementById('dots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const fsBtn = document.getElementById('fsBtn');
  const topHeader = document.querySelector('.top-header');
  const topHeaderNum = document.getElementById('topHeaderNum');
  const topHeaderKicker = document.getElementById('topHeaderKicker');

  let current = 0;
  let isAnimating = false;

  // ---------- Build dots ----------
  const dots = [];
  for (let i = 0; i < total; i++) {
    const btn = document.createElement('button');
    btn.className = 'dot';
    btn.type = 'button';
    btn.setAttribute('aria-label', `Ir al slide ${i + 1}`);
    btn.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(btn);
    dots.push(btn);
  }

  counterTotal.textContent = String(total).padStart(2, '0');

  // ---------- Render state ----------
  function render() {
    slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));

    const numLabel = String(current + 1).padStart(2, '0');
    counterCurrent.textContent = numLabel;

    const pct = ((current + 1) / total) * 100;
    progressFill.style.width = `${pct}%`;

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;

    const activeSlide = slides[current];
    const kicker = activeSlide.dataset.kicker || '';
    topHeaderNum.textContent = numLabel;
    topHeaderKicker.textContent = kicker;
    topHeader.classList.toggle('is-hidden', current === 0);
  }

  // ---------- Navigation ----------
  function goTo(index) {
    if (isAnimating) return;
    const next = Math.max(0, Math.min(total - 1, index));
    if (next === current) return;
    isAnimating = true;
    current = next;
    render();
    // Match transition duration in CSS (0.55s)
    setTimeout(() => { isAnimating = false; }, 560);
  }

  function nextSlide() { goTo(current + 1); }
  function prevSlide() { goTo(current - 1); }
  function reset() { goTo(0); }

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // ---------- Fullscreen ----------
  function isFullscreen() {
    return Boolean(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    );
  }

  function enterFullscreen() {
    const el = document.documentElement;
    const req =
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.msRequestFullscreen;
    if (req) req.call(el);
  }

  function exitFullscreen() {
    const exit =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.msExitFullscreen;
    if (exit) exit.call(document);
  }

  function toggleFullscreen() {
    if (isFullscreen()) exitFullscreen();
    else enterFullscreen();
  }

  function syncFullscreenState() {
    document.body.classList.toggle('is-fullscreen', isFullscreen());
    if (fsBtn) {
      fsBtn.setAttribute(
        'aria-label',
        isFullscreen() ? 'Salir de pantalla completa' : 'Pantalla completa'
      );
      fsBtn.setAttribute(
        'title',
        isFullscreen() ? 'Salir de pantalla completa (F)' : 'Pantalla completa (F)'
      );
    }
  }

  if (fsBtn) fsBtn.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', syncFullscreenState);
  document.addEventListener('webkitfullscreenchange', syncFullscreenState);
  document.addEventListener('msfullscreenchange', syncFullscreenState);

  // ---------- Keyboard ----------
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'Spacebar':
      case 'PageDown':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goTo(0);
        break;
      case 'End':
        e.preventDefault();
        goTo(total - 1);
        break;
      case 'Escape':
        e.preventDefault();
        reset();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
    }
  });

  // ---------- Touch swipe ----------
  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', (e) => {
    if (!e.touches[0]) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (!e.changedTouches[0]) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  // ---------- Wheel (subtle, optional) ----------
  let wheelLock = false;
  document.addEventListener('wheel', (e) => {
    if (wheelLock || isAnimating) return;
    if (Math.abs(e.deltaY) < 30 && Math.abs(e.deltaX) < 30) return;
    wheelLock = true;
    if (e.deltaY > 0 || e.deltaX > 0) nextSlide();
    else prevSlide();
    setTimeout(() => { wheelLock = false; }, 700);
  }, { passive: true });

  // Initial render
  render();
})();
