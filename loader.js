(() => {
  const root = document.documentElement;
  const dismiss = () => {
    if (!root.classList.contains('loader-enabled')) return;
    root.classList.add('loader-leaving');
    window.setTimeout(() => {
      root.classList.remove('loader-enabled', 'loader-leaving');
      document.querySelector('.site-loader')?.remove();
      window.dispatchEvent(new Event('site:loader-finished'));
    }, reduceMotion ? 0 : 850);
  };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.readyState === 'complete') window.setTimeout(dismiss, reduceMotion ? 0 : 1100);
  else window.addEventListener('load', () => window.setTimeout(dismiss, reduceMotion ? 0 : 1100), { once: true });
})();
