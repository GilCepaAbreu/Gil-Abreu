(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root = document.documentElement;
  root.classList.add('has-motion');

  const selectors = [
    ['.hero .eyebrow', 'hero'], ['.hero h1', 'hero-title'], ['.hero .hero-aside', 'hero'], ['.hero .hero-rule', 'rule'],
    ['.statement .section-label, .statement h2, .statement .lead', 'section'],
    ['.section-head > *, .method-title > *, .contact-grid > *', 'section'],
    ['.service-list article, .method li', 'item'], ['.project', 'project'], ['.footer-top > *', 'footer']
  ];
  selectors.forEach(([selector, kind]) => document.querySelectorAll(selector).forEach((element, index) => {
    element.dataset.reveal = kind;
    element.style.setProperty('--reveal-delay', String(Math.min(index, 6)));
  }));

  const reveal = new IntersectionObserver((entries, observer) => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }), { threshold: .12, rootMargin: '0px 0px -7% 0px' });
  document.querySelectorAll('[data-reveal]').forEach(element => reveal.observe(element));

  const progress = document.createElement('div');
  progress.className = 'progress-line';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  const updateProgress = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${height > 0 ? window.scrollY / height : 0})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  document.querySelectorAll('.project').forEach(project => project.addEventListener('pointermove', event => {
    const rect = project.getBoundingClientRect();
    project.style.setProperty('--spot-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    project.style.setProperty('--spot-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }));
})();
