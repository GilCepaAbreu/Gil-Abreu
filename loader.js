(() => {
  const root = document.documentElement;
  const dismiss = () => {
    if (!root.classList.contains('loader-enabled')) return;
    root.classList.add('loader-leaving');
    window.setTimeout(() => {
      root.classList.remove('loader-enabled', 'loader-leaving');
      document.querySelector('.site-loader')?.remove();
    }, 600);
  };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.readyState === 'complete') window.setTimeout(dismiss, reduceMotion ? 0 : 750);
  else window.addEventListener('load', () => window.setTimeout(dismiss, reduceMotion ? 0 : 750), { once: true });
})();
