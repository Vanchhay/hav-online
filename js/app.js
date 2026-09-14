/* ============================================================
   EDIT THESE TWO LINES
   ============================================================ */

// Target date/time for the section-4 countdown. ISO 8601, +07:00 = Cambodia.
const WEDDING_DATE = '2026-11-21T06:00:00+07:00';

// Where section 3 should link to when tapped. Empty string = not clickable.
const MAP_URL = 'https://maps.app.goo.gl/3eCKcXHDKM45GhzM9';

/* ============================================================
   Nothing below needs editing.
   ============================================================ */

(function () {
  'use strict';

  /* ---- placeholder slots ---------------------------------- */
  /* A slot whose image is missing gets .is-empty, which renders
     a dashed box labelled with the filename to drop in.
     The extension in the markup is only a suggestion: if the .jpg
     isn't there we retry the .png (and vice versa), so you can drop
     in whichever format you exported.                            */

  var SWAP = { jpg: 'png', jpeg: 'png', png: 'jpg' };

  function markEmpty(slot) { slot.classList.add('is-empty'); }
  function markFilled(slot) { slot.classList.remove('is-empty'); }

  function retryOtherExtension(img) {
    if (img.dataset.extRetried) { return false; }
    var src = img.getAttribute('src') || '';
    var m = src.match(/\.(jpe?g|png)$/i);
    if (!m) { return false; }
    img.dataset.extRetried = '1';
    img.src = src.slice(0, -m[0].length) + '.' + SWAP[m[1].toLowerCase()];
    return true;
  }

  document.querySelectorAll('.slot').forEach(function (slot) {
    var img = slot.querySelector('img');
    if (!img) { return; }

    function settle() {
      img.naturalWidth === 0 ? markEmpty(slot) : markFilled(slot);
    }

    img.addEventListener('load', function () { markFilled(slot); });
    img.addEventListener('error', function () {
      if (!retryOtherExtension(img)) { markEmpty(slot); }
    });

    if (img.complete) {
      if (img.naturalWidth === 0 && retryOtherExtension(img)) { return; }
      settle();
    }
    // Not yet loaded is not the same as missing — a lazy image below the fold
    // simply hasn't been fetched. The error handler above marks it if it 404s.
  });

  /* ---- location link -------------------------------------- */

  document.querySelectorAll('[data-map-link]').forEach(function (link) {
    if (MAP_URL) {
      link.href = MAP_URL;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.removeAttribute('href');   // inert rather than a dead '#' jump
    }
  });

  /* ---- scroll reveal -------------------------------------- */
  /* Gallery pages stagger their photos in one by one; single-artwork
     pages fade in as a whole card. See the SCROLL REVEAL block in
     style.css for why the two cases differ.                        */

  var STAGGER_MIN = 2;   // a section needs this many content slots to stagger

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      'IntersectionObserver' in window) {

    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        entry.target.querySelectorAll('.reveal').forEach(function (el) {
          el.classList.add('is-in');
        });
        if (entry.target.classList.contains('reveal')) {
          entry.target.classList.add('is-in');
        }
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.documentElement.classList.add('is-priming');

    document.querySelectorAll('.page').forEach(function (page) {
      // querySelectorAll returns document order, so --i cascades down the
      // page regardless of how the elements are nested.
      var parts = page.querySelectorAll('.frame__body .slot, .countdown');

      if (parts.length >= STAGGER_MIN) {
        parts.forEach(function (el, i) {
          el.classList.add('reveal');
          el.style.setProperty('--i', i);
        });
      } else {
        var frame = page.querySelector('.frame');
        if (frame) { frame.classList.add('reveal', 'reveal--fade'); }
      }

      revealer.observe(page);
    });

    // Commit the hidden state, then re-enable transitions on the next frame
    // so the fade-in animates but the fade-out never happens.
    void document.documentElement.offsetHeight;
    requestAnimationFrame(function () {
      document.documentElement.classList.remove('is-priming');
    });

    // Failsafe: if anything goes wrong with the observer, never leave a
    // section stranded at opacity 0.
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.is-in)').forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('is-in');
        }
      });
    }, 4000);
  }

  /* ---- countdown ------------------------------------------ */

  var root = document.querySelector('[data-countdown]');
  if (!root) { return; }

  var fields = {
    days:    root.querySelector('[data-cd="days"]'),
    hours:   root.querySelector('[data-cd="hours"]'),
    minutes: root.querySelector('[data-cd="minutes"]'),
    seconds: root.querySelector('[data-cd="seconds"]')
  };

  var target = new Date(WEDDING_DATE).getTime();
  if (isNaN(target)) {
    console.warn('WEDDING_DATE is not a valid date:', WEDDING_DATE);
    return;
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tick() {
    var left = Math.max(0, target - Date.now());
    var s = Math.floor(left / 1000);

    fields.days.textContent    = String(Math.floor(s / 86400));
    fields.hours.textContent   = pad(Math.floor(s / 3600) % 24);
    fields.minutes.textContent = pad(Math.floor(s / 60) % 60);
    fields.seconds.textContent = pad(s % 60);

    if (left === 0) { clearInterval(timer); }
  }

  tick();
  var timer = setInterval(tick, 1000);
})();
