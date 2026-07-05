/* ==========================================================================
   SHARED: smooth-scroll.js
   Handles in-page anchor smooth scrolling, and cross-page navigation to a
   section anchor on index.html (used by the hamburger nav + "Give Now" CTA).
   ========================================================================== */

/**
 * Smooth-scrolls to an element on the current page, or — if the element
 * doesn't exist here — navigates to index.html with the anchor appended,
 * so it works from live.html / contact.html too.
 * @param {string} targetId - the id of the section, WITHOUT the leading '#'
 */
function tgcScrollToSection(targetId) {
  const el = document.getElementById(targetId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    // Not on index.html — go there and let it scroll on load.
    const base = window.location.pathname.includes('/') ? '' : '';
    window.location.href = `index.html#${targetId}`;
  }
}

// On page load, if the URL has a hash (e.g. index.html#gallery), scroll to it.
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    const el = document.getElementById(id);
    if (el) {
      // slight delay lets fetched partials finish inserting into the DOM
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
    }
  }
});

// Generic handler: any element with [data-scroll-to="sectionId"] smooth-scrolls.
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-scroll-to]');
  if (!trigger) return;
  e.preventDefault();
  tgcScrollToSection(trigger.getAttribute('data-scroll-to'));
});
