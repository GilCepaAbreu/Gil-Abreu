(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  const banner = document.querySelector('[data-cookie-banner]');
  const dialog = document.querySelector('[data-consent-dialog]');
  const consentKey = 'cc_cookie_notice_v1';
  document.querySelector('[data-year]').textContent = new Date().getFullYear();
  window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 12), { passive: true });
  menuButton?.addEventListener('click', () => { const open = menu.classList.toggle('is-open'); menuButton.setAttribute('aria-expanded', String(open)); });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.classList.remove('is-open'); menuButton?.setAttribute('aria-expanded', 'false'); }));
  const saveConsent = () => {
    banner.hidden = true;
    try { localStorage.setItem(consentKey, 'necessary'); } catch (_) { /* Private browsers may block local storage. */ }
    dialog?.close();
  };
  try { if (!localStorage.getItem(consentKey)) banner.hidden = false; } catch (_) { banner.hidden = false; }
  document.querySelectorAll('[data-cookie-necessary], [data-cookie-accept]').forEach(button => button.addEventListener('click', saveConsent));
  document.querySelector('[data-open-consent]')?.addEventListener('click', () => dialog?.showModal());
})();
