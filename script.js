/* ==========================================================================
   Bracket & Bevel — shared behavior + GA4 event tracking helper
   ========================================================================== */

// --- mobile nav toggle ---
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
});

/**
 * trackEvent(name, params)
 * Thin wrapper around gtag() so every call site doesn't need to guard
 * against gtag.js not being loaded (ad blockers, no GA ID set yet, etc).
 * Also logs to console so you can verify events while developing, even
 * before a real Measurement ID is wired up.
 */
function trackEvent(name, params) {
  params = params || {};
  params.page_path = window.location.pathname;
  if (typeof gtag === 'function') {
    gtag('event', name, params);
  }
  console.log('[GA event]', name, params);
}

// --- generic click tracking for anything with data-track-* attributes ---
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      trackEvent(el.getAttribute('data-track'), {
        label: el.getAttribute('data-track-label') || el.textContent.trim()
      });
    });
  });
});

// --- contact form: no backend here, just demonstrates a conversion event ---
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.querySelector('#name').value.trim();
    var email = form.querySelector('#email').value.trim();

    trackEvent('contact_form_submit', {
      form_id: 'contact-form',
      has_name: !!name,
      has_email: !!email
    });

    var status = document.getElementById('form-status');
    if (status) {
      status.textContent = 'Thanks — that reached the shop. We reply within two working days.';
      status.classList.add('show');
    }
    form.reset();
  });
});
