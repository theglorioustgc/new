/* ==========================================================================
   SHARED: page-loader.js
   Fetches each component's .html partial and inserts it into its matching
   placeholder element, keeping the site fully static (no build step) while
   still being component-based. Used by index.html, live.html, contact.html.
   ========================================================================== */

/**
 * Fetches a list of { id, path } partials and inserts each into the
 * element with the matching id, in order. Returns a Promise that resolves
 * once everything has been inserted, so callers can run init scripts after.
 * @param {{id: string, path: string}[]} partials
 */
async function tgcLoadPartials(partials) {
  await Promise.all(
    partials.map(async ({ id, path }) => {
      const placeholder = document.getElementById(id);
      if (!placeholder) return;
      try {
        const res = await fetch(path);
        const html = await res.text();
        placeholder.insertAdjacentHTML('beforeend', html);
      } catch (err) {
        console.error(`TGC: failed to load partial "${path}"`, err);
      }
    })
  );
}
