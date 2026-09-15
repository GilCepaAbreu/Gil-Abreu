(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  const banner = document.querySelector('[data-cookie-banner]');
  const dialog = document.querySelector('[data-consent-dialog]');
  const consentKey = 'cc_cookie_notice_v1';
  const isEnglish = document.documentElement.lang.startsWith('en');
  document.querySelector('[data-year]').textContent = new Date().getFullYear();
  window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 12), { passive: true });
  const setMenu = open => {
    menu?.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
    if (menuButton) menuButton.innerHTML = `${open ? (isEnglish ? 'Close' : 'Fechar') : 'Menu'} <span></span>`;
  };
  menuButton?.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
  const saveConsent = () => {
    banner.hidden = true;
    try { localStorage.setItem(consentKey, 'necessary'); } catch (_) { /* Private browsers may block local storage. */ }
    dialog?.close();
  };
  try { if (!localStorage.getItem(consentKey)) banner.hidden = false; } catch (_) { banner.hidden = false; }
  document.querySelectorAll('[data-cookie-necessary], [data-cookie-accept]').forEach(button => button.addEventListener('click', saveConsent));
  document.querySelector('[data-open-consent]')?.addEventListener('click', () => dialog?.showModal());
})();
