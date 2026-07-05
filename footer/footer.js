/* ==========================================================================
   FOOTER BEHAVIOR
   Fills the copyright year dynamically. Called again after the footer
   partial is fetched and inserted into the DOM (see each page's loader).
   ========================================================================== */

function tgcInitFooter() {
  const yearEl = document.getElementById('tgc-footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', tgcInitFooter);
