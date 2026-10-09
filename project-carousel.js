(() => {
  document.querySelectorAll('[data-project-carousel]').forEach(carousel => {
    const slides = Array.from(carousel.querySelectorAll('[data-project-slide]'));
    const pagination = Array.from(carousel.querySelectorAll('[data-carousel-to]'));
    const previous = carousel.querySelector('[data-carousel-previous]');
    const next = carousel.querySelector('[data-carousel-next]');
    const currentLabel = carousel.querySelector('[data-carousel-current]');
    const title = carousel.querySelector('[data-carousel-title]');
    let current = 0;
    let startX = null;
    const clampIndex = index => (index + slides.length) % slides.length;
    const setActive = (index, direction = 1) => {
      const nextIndex = clampIndex(index);
      if (nextIndex === current && slides[current].classList.contains('is-active')) return;
      const previousIndex = current;
      const oldSlide = slides[previousIndex];
      oldSlide.classList.remove('is-active', 'is-before', 'is-after');
      oldSlide.classList.add(direction > 0 ? 'is-before' : 'is-after');
      current = nextIndex;
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === current;
        slide.classList.toggle('is-active', isActive);
        if (!isActive && slideIndex !== previousIndex) slide.classList.remove('is-before', 'is-after');
        slide.setAttribute('aria-hidden', String(!isActive));
        slide.querySelector('a')?.setAttribute('tabindex', isActive ? '0' : '-1');
      });
      pagination.forEach((button, buttonIndex) => button.setAttribute('aria-current', String(buttonIndex === current)));
      const projectName = slides[current].querySelector('h3')?.textContent.trim() || '';
      if (currentLabel) currentLabel.textContent = String(current + 1).padStart(2, '0');
      if (title) title.textContent = projectName;
    };
    previous?.addEventListener('click', () => setActive(current - 1, -1));
    next?.addEventListener('click', () => setActive(current + 1, 1));
    pagination.forEach((button, index) => button.addEventListener('click', () => setActive(index, index >= current ? 1 : -1)));
    carousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); setActive(current - 1, -1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); setActive(current + 1, 1); }
    });
    carousel.addEventListener('pointerdown', event => { startX = event.clientX; });
    carousel.addEventListener('pointerup', event => {
      if (startX === null) return;
      const distance = event.clientX - startX;
      startX = null;
      if (Math.abs(distance) < 42) return;
      setActive(current + (distance < 0 ? 1 : -1), distance < 0 ? 1 : -1);
    });
    carousel.addEventListener('pointercancel', () => { startX = null; });
  });
})();
