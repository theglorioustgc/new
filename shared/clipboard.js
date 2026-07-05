/* ==========================================================================
   SHARED: clipboard.js
   Copy-to-clipboard utility used by the Donation section's "Copy" buttons.
   Any button with [data-copy-value="TEXT"] will copy TEXT and show a
   "Copied!" confirmation for 1.5s before reverting its label.
   ========================================================================== */

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-copy-value]');
  if (!btn) return;

  const value = btn.getAttribute('data-copy-value');
  const originalLabel = btn.getAttribute('data-original-label') || btn.textContent;

  // store the original label once so repeated clicks don't lose it
  if (!btn.getAttribute('data-original-label')) {
    btn.setAttribute('data-original-label', originalLabel);
  }

  try {
    await navigator.clipboard.writeText(value);
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
  } catch (err) {
    // Fallback for older browsers without Clipboard API support
    const tempInput = document.createElement('textarea');
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
  }

  setTimeout(() => {
    btn.textContent = btn.getAttribute('data-original-label');
    btn.classList.remove('copied');
  }, 1500);
});
