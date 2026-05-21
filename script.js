(() => {
  const slides = document.querySelectorAll('.slide');
  const counter = document.getElementById('counter');
  const total = slides.length;
  let current = 0;

  function show(idx) {
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    current = idx;
    counter.textContent = `${idx + 1} / ${total}`;
  }

  function next() { if (current < total - 1) show(current + 1); }
  function prev() { if (current > 0) show(current - 1); }

  document.getElementById('next').addEventListener('click', next);
  document.getElementById('prev').addEventListener('click', prev);
  document.getElementById('fullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }
    if (e.key === 'p' || e.key === 'P') window.print();
  });

  // Touch/swipe support
  let startX = 0;
  document.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
  document.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
  });

  // Click left/right halves
  document.getElementById('presentation').addEventListener('click', (e) => {
    if (e.target.closest('#controls') || e.target.closest('a') || e.target.closest('button')) return;
    const x = e.clientX / window.innerWidth;
    x > 0.6 ? next() : x < 0.4 ? prev() : null;
  });

  show(0);
})();
