/* Two jobs only: mark empty slots so you can see what to drop in, and
   slide each page's content up as it comes into view. */

(function () {
  'use strict';

  /* ---- empty slots ---------------------------------------- */
  /* The extension in the markup is a suggestion: if the .png isn't there
     we retry the .jpg, so either export works with no edits. */

  var SWAP = { jpg: 'png', jpeg: 'png', png: 'jpg' };

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

    img.addEventListener('load', function () { slot.classList.remove('is-empty'); });
    img.addEventListener('error', function () {
      if (!retryOtherExtension(img)) { slot.classList.add('is-empty'); }
    });

    if (img.complete) {
      if (img.naturalWidth === 0 && retryOtherExtension(img)) { return; }
      if (img.naturalWidth === 0) { slot.classList.add('is-empty'); }
    }
  });

  /* ---- stay on the same page through a resize -------------- */
  /* Each panel is one screen tall, so changing the window width changes every
     panel's offset at once while the browser keeps the old scrollTop — you end
     up parked between two pages and the design reads as off-centre. Scrolling
     itself is free; this only ever runs after a resize. */

  var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));

  if (pages.length) {
    var current = 0;
    var isResizing = false;
    var scrollTimer, resizeTimer;

    function nearestPage() {
      var middle = window.innerHeight / 2;
      var best = Infinity, index = 0;
      pages.forEach(function (page, i) {
        var box = page.getBoundingClientRect();
        var distance = Math.abs(box.top + box.height / 2 - middle);
        if (distance < best) { best = distance; index = i; }
      });
      return index;
    }

    /* The resize itself fires scroll events off the stale layout, so ignore
       them while a resize is in flight or we would remember the wrong page. */
    window.addEventListener('scroll', function () {
      if (isResizing) { return; }
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () { current = nearestPage(); }, 80);
    }, { passive: true });

    /* Width only. A phone fires `resize` every time its address bar slides
       away — that is a height change, not a new layout, and correcting the
       scroll for it yanked the page out from under your thumb mid-flick. */
    var lastWidth = window.innerWidth;

    window.addEventListener('resize', function () {
      if (window.innerWidth === lastWidth) { return; }
      lastWidth = window.innerWidth;
      isResizing = true;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        /* 'auto' would inherit html's scroll-behavior:smooth and animate the
           correction, which looks like the page drifting. 'instant' wins. */
        pages[current].scrollIntoView({ behavior: 'instant', block: 'start' });
        isResizing = false;
      }, 150);
    });
  }

  /* ---- countdown ------------------------------------------ */
  /* One interval for every clock on the page. The target is written in the
     markup (data-countdown) so the date lives with the design, not in here.
     Parsed without a timezone on purpose: the date reads as the couple's
     local wedding day, not as an instant in UTC. */

  var clocks = Array.prototype.slice.call(document.querySelectorAll('[data-countdown]'));

  if (clocks.length) {
    clocks.forEach(function (clock) {
      clock.dataset.target = String(new Date(clock.dataset.countdown).getTime());
    });

    var pad = function (n) { return n < 10 ? '0' + n : String(n); };

    function tick() {
      clocks.forEach(function (clock) {
        /* Never count past the day itself: after the wedding every field
           pins to zero rather than running negative. */
        var left = Math.max(0, Number(clock.dataset.target) - Date.now());
        var s = Math.floor(left / 1000);

        var parts = {
          days:    Math.floor(s / 86400),
          hours:   pad(Math.floor(s / 3600) % 24),
          minutes: pad(Math.floor(s / 60) % 60),
          seconds: pad(s % 60)
        };

        Object.keys(parts).forEach(function (unit) {
          var cell = clock.querySelector('[data-cd="' + unit + '"]');
          if (cell && cell.textContent !== String(parts[unit])) {
            cell.textContent = parts[unit];
          }
        });
      });
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ---- slide in ------------------------------------------- */

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)) { return; }

  var watcher = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) { return; }
      entry.target.classList.add('is-in');
      obs.unobserve(entry.target);        // slides once, never replays
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('.content').forEach(function (el) {
    el.classList.add('reveal');
    watcher.observe(el);
  });
})();
