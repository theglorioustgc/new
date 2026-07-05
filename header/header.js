/* ==========================================================================
   HEADER BEHAVIOR
   Hamburger toggles the slide-in nav; closes on outside click or link click.
   Re-runs init after fetch() inserts the header partial into the DOM.
   ========================================================================== */

function tgcInitHeader() {
  const hamburger = document.getElementById('tgc-hamburger');
  const menu = document.getElementById('tgc-nav-menu');
  const backdrop = document.getElementById('tgc-nav-backdrop');

  if (!hamburger || !menu || !backdrop) return; // header not yet in DOM

  function openMenu() {
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('is-open');
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('is-open');
  }

  hamburger.addEventListener('click', () => {
    menu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);

  // Close menu whenever a nav link is clicked
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// If header is already in the DOM (e.g. inlined), init immediately.
document.addEventListener('DOMContentLoaded', tgcInitHeader);
