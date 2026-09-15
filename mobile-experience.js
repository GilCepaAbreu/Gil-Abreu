(() => {
  const mobile = window.matchMedia('(max-width: 720px)');
  if (!mobile.matches) return;
  const dock = document.querySelector('.mobile-contact-dock');
  const projects = document.querySelectorAll('.project');
  const contact = document.querySelector('#contacto');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion && projects.length) {
    const focusProject = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.classList.toggle('is-mobile-active', entry.isIntersecting);
    }), { threshold: .72 });
    projects.forEach(project => focusProject.observe(project));
  }

  if (dock && contact) {
    const updateDock = () => {
      const contactTop = contact.getBoundingClientRect().top;
      dock.classList.toggle('is-visible', window.scrollY > window.innerHeight * .55 && contactTop > window.innerHeight * .42);
    };
    window.addEventListener('scroll', updateDock, { passive: true });
    updateDock();
  }
})();
