/* Two jobs only: mark empty slots so you can see what to drop in, and
   slide each page's content up as it comes into view. */

(function () {
  'use strict';

  /* ---- ambient drift -------------------------------------- */
  /* Gold flecks, bubble lights and petals, on one canvas.

     Two rules govern every number below. It must never hide anything: the
     alphas are budgeted so that the largest shapes are the faintest, and
     the brightest are only a couple of pixels across. And it must cost
     almost nothing: the round shapes are drawn once into small offscreen
     sprites and then blitted, because building a radial gradient per
     particle per frame is what actually burns a phone's battery. */

  (function ambient() {
    var canvas = document.getElementById('ambient');
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }

    var ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) { return; }

    var GOLD  = '201,162,39';       // the wax seal's gold, as r,g,b
    /* Deeper than the paper, not lighter. Cream petals on a cream page are
       invisible — the first pass proved it — so these are a blush, a rose
       and a sage, each a few steps darker than #efe7d8. */
    var PETAL = ['214,176,158', '203,163,150', '166,172,140'];

    var w = 0, h = 0, dpr = 1;
    var flecks = [], bubbles = [], petals = [];
    var fleckSprite, bubbleSprite;

    function rand(a, b) { return a + Math.random() * (b - a); }
    function pick(list) { return list[(Math.random() * list.length) | 0]; }

    /* -- the two round shapes, drawn once -- */

    function makeSprite(size, stops) {
      var c = document.createElement('canvas');
      c.width = c.height = size;
      var g = c.getContext('2d');
      var grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      stops.forEach(function (s) { grad.addColorStop(s[0], s[1]); });
      g.fillStyle = grad;
      g.fillRect(0, 0, size, size);
      return c;
    }

    function buildSprites() {
      fleckSprite = makeSprite(24, [
        [0,   'rgba(' + GOLD + ',1)'],
        [0.3, 'rgba(' + GOLD + ',0.55)'],
        [1,   'rgba(' + GOLD + ',0)']
      ]);
      /* A warm core that is lighter than the paper, ringed by gold that is
         darker than it. On cream, light alone reads as nothing; the gold
         edge is what makes the orb legible as a bubble of light. */
      bubbleSprite = makeSprite(128, [
        [0,    'rgba(255,253,246,0.62)'],
        [0.40, 'rgba(252,243,220,0.26)'],
        [0.72, 'rgba(216,183,112,0.18)'],
        [0.90, 'rgba(201,162,39,0.10)'],
        [1,    'rgba(201,162,39,0)']
      ]);
    }

    /* -- seeding -- */
    /* Counts follow the area rather than being fixed, or a laptop looks
       empty at the same numbers that crowd a phone. Capped at both ends. */

    function countFor(per, lo, hi) {
      return Math.max(lo, Math.min(hi, Math.round((w * h) / per)));
    }

    function newFleck(seed) {
      return {
        x: rand(0, w),
        y: seed ? rand(0, h) : h + rand(10, 80),
        r: rand(1.0, 2.8),
        vy: rand(-0.30, -0.10),
        sway: rand(6, 22),
        phase: rand(0, Math.PI * 2),
        spin: rand(0.0006, 0.0018),
        twinkle: rand(0.0012, 0.0035),
        alpha: rand(0.55, 0.95)
      };
    }

    function newBubble(seed) {
      return {
        x: rand(0, w),
        y: seed ? rand(0, h) : h + rand(40, 180),
        r: rand(16, 54),
        vy: rand(-0.34, -0.13),
        sway: rand(14, 44),
        phase: rand(0, Math.PI * 2),
        spin: rand(0.0004, 0.0012),
        /* The ripple is a ring that grows out of the orb and fades. Each
           one starts at its own point in the cycle so they never pulse in
           unison, which would read as a machine rather than as light. */
        ripple: Math.random(),
        rippleRate: rand(0.0016, 0.0034),
        alpha: rand(0.14, 0.28)
      };
    }

    function newPetal(seed) {
      return {
        x: rand(0, w),
        y: seed ? rand(0, h) : rand(-140, -20),
        s: rand(5, 13),
        vy: rand(0.22, 0.58),
        sway: rand(18, 52),
        phase: rand(0, Math.PI * 2),
        spin: rand(0.0005, 0.0013),
        rot: rand(0, Math.PI * 2),
        /* Turning over as it falls. Scaling one axis by a cosine is the
           cheapest honest way to suggest a flat thing rotating in space. */
        flip: rand(0, Math.PI * 2),
        flipRate: rand(0.0008, 0.0022),
        tint: pick(PETAL),
        alpha: rand(0.30, 0.55)
      };
    }

    function seed() {
      var fill = function (make, per, lo, hi) {
        var n = countFor(per, lo, hi), out = [];
        for (var i = 0; i < n; i++) { out.push(make(true)); }
        return out;
      };
      /* Density is per unit of area, so a laptop is not emptier than a
         phone, with its own floor and ceiling per kind. The first pass put
         27 particles on a whole screen, which read as nothing at all. */
      flecks  = fill(newFleck,  10800, 14, 64);
      bubbles = fill(newBubble, 37000,  5, 18);
      petals  = fill(newPetal,  23000,  7, 30);
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    /* -- drawing -- */

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(Math.cos(p.flip) * 0.75 + 0.25, 1);
      ctx.beginPath();
      ctx.moveTo(0, -p.s);
      ctx.bezierCurveTo( p.s, -p.s * 0.4,  p.s * 0.7, p.s * 0.7, 0, p.s);
      ctx.bezierCurveTo(-p.s * 0.7, p.s * 0.7, -p.s, -p.s * 0.4, 0, -p.s);
      ctx.fillStyle = 'rgba(' + p.tint + ',' + p.alpha.toFixed(3) + ')';
      /* Only ten of these exist, so a per-shape shadow is affordable, and
         it is what gives a petal an edge against paper of a similar tone. */
      ctx.shadowColor = 'rgba(120,95,60,0.20)';
      ctx.shadowBlur = 5;
      ctx.fill();
      ctx.restore();
    }

    var last = 0;

    function frame(now) {
      rafId = 0;
      if (!running) { return; }
      /* Clamp the step. A tab that was backgrounded hands back a gap of
         several seconds, and without this every particle teleports. */
      /* `now - last || 16` was a trap: a delta of exactly 0 is falsy, so two
         callbacks landing on the same rAF timestamp each took a FULL 16ms
         step instead of none. That is what turned duplicate loops into
         visible speed rather than merely wasted work. */
      var dt = last ? Math.min(now - last, 48) : 16;
      last = now;

      ctx.clearRect(0, 0, w, h);

      bubbles.forEach(function (b, i) {
        b.y += b.vy * dt * 0.06;
        b.phase += b.spin * dt;
        b.ripple += b.rippleRate * dt;
        if (b.ripple > 1) { b.ripple -= 1; }
        var x = b.x + Math.sin(b.phase) * b.sway;

        ctx.globalAlpha = b.alpha;
        ctx.drawImage(bubbleSprite, x - b.r, b.y - b.r, b.r * 2, b.r * 2);

        /* the ripple ring, fading as it grows past the orb */
        var k = b.ripple;
        ctx.globalAlpha = b.alpha * (1 - k) * 0.85;
        ctx.beginPath();
        ctx.arc(x, b.y, b.r * (0.55 + k * 0.95), 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(201,162,39,0.75)';
        ctx.lineWidth = 1;
        ctx.stroke();

        if (b.y < -b.r * 2) { bubbles[i] = newBubble(false); }
      });

      petals.forEach(function (p, i) {
        p.y += p.vy * dt * 0.06;
        p.phase += p.spin * dt;
        p.flip  += p.flipRate * dt;
        p.rot   += p.spin * dt * 0.5;
        p.x += Math.cos(p.phase) * 0.12;
        ctx.globalAlpha = 1;
        drawPetal({ x: p.x + Math.sin(p.phase) * p.sway, y: p.y, s: p.s,
                    rot: p.rot, flip: p.flip, tint: p.tint, alpha: p.alpha });
        /* x drifts every frame but only y was ever checked, so over a long
           session petals wandered off the sides for good and the effect
           slowly thinned out. Wrap them instead. */
        if (p.x < -80) { p.x = w + 60; } else if (p.x > w + 80) { p.x = -60; }
        if (p.y > h + p.s * 3) { petals[i] = newPetal(false); }
      });

      flecks.forEach(function (f, i) {
        f.y += f.vy * dt * 0.06;
        f.phase += f.spin * dt;
        var a = f.alpha * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(now * f.twinkle + f.phase)));
        var x = f.x + Math.sin(f.phase) * f.sway;
        ctx.globalAlpha = a;
        ctx.drawImage(fleckSprite, x - f.r * 3, f.y - f.r * 3, f.r * 6, f.r * 6);
        if (f.y < -20) { flecks[i] = newFleck(false); }
      });

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(frame);
    }

    /* -- run only when it can be seen -- */

    var running = false;
    var rafId = 0;

    function start() {
      if (running) { return; }
      running = true;
      last = 0;
      rafId = requestAnimationFrame(frame);
    }

    /* Clearing the flag is not enough on its own. A callback scheduled
       before the tab was hidden is still queued; if the tab comes back
       before it fires, start() sees running === false, begins a second
       loop, and then the old callback fires, sees running === true and
       keeps itself alive too. Every hide/show cycle added another loop —
       measured: six loops after five cycles, so everything moved six times
       too fast. Cancelling the pending frame is what actually stops it. */
    function stop() {
      running = false;
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stop(); } else { start(); }
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    }, { passive: true });

    buildSprites();
    resize();
    start();
    canvas.classList.add('is-live');
  })();

  /* ---- the cover ------------------------------------------ */
  /* Runs before everything else and outside the reduced-motion guard
     further down: whatever else this page does or does not do, the cover
     must always be openable or the invitation cannot be read at all. */

  var cover = document.getElementById('cover');

  if (cover) {
    var deck      = document.querySelector('.deck');
    var crest     = cover.querySelector('[data-open]');
    var guestSlot = cover.querySelector('[data-guest]');

    /* -- who is this for -- */
    /* textContent, never innerHTML: the name arrives from the URL, so it
       is untrusted by definition. Falls back rather than showing blank. */
    try {
      var asked = new URLSearchParams(window.location.search).get('to');
      if (asked) {
        asked = asked.replace(/\+/g, ' ').trim();
        if (asked) { guestSlot.textContent = asked; }
      }
    } catch (e) { /* no URLSearchParams, or a malformed query — keep the default */ }

    /* -- hold the page at the top -- */
    /* A reload part-way down the deck would otherwise leave the cover over
       the middle of the invitation, and lifting it would reveal section 4. */
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    /* -- music -- */
    /* Browsers refuse to start audio without a user gesture. Pressing the
       seal IS that gesture, so nothing is even requested until then. */
    var music = new Audio();
    music.src = 'assets/audio/path-of-the-wind-totoro.mp3';
    music.loop = true;
    music.preload = 'none';
    music.volume = 0;

    /* One ramp for both directions. Cancelling by token rather than by
       clearing a handle: a guest tapping the toggle twice quickly would
       otherwise leave two ramps fighting over the volume. */
    var fadeToken = 0;

    function fadeTo(target, ms, done) {
      var mine = ++fadeToken;
      var from = music.volume;
      var started = null;
      var settled = false;

      function finish() {
        if (settled || mine !== fadeToken) { return; }
        settled = true;
        music.volume = target;
        if (done) { done(); }
      }

      function step(now) {
        if (settled || mine !== fadeToken) { return; }
        if (started === null) { started = now; }
        var k = Math.min(1, (now - started) / ms);
        /* Eased, so it does not bloom on the way in or clip on the way out. */
        music.volume = Math.max(0, Math.min(1, from + (target - from) * k * k));
        if (k < 1) { requestAnimationFrame(step); } else { finish(); }
      }

      requestAnimationFrame(step);

      /* rAF stops firing in a background tab. Without this backstop, a guest
         who taps pause and immediately switches away never reaches the
         music.pause() at the end of the ramp — and the track plays on in a
         tab they cannot see. A timer still runs there; a frame does not. */
      window.setTimeout(finish, ms + 80);
    }

    /* -- where the seal actually is -- */
    /* The erase radiates from the wax, and the wax sits at 49.9% across
       and 46.0% down the crest artwork — not at its centre, because the
       sprigs hang lower. Measured from the PNG, written as percentages of
       the viewport so the mask's anchor holds while its size grows. */
    function aimErase() {
      var box = crest.getBoundingClientRect();
      if (!box.width) { return; }
      var x = box.left + box.width  * 0.499;
      var y = box.top  + box.height * 0.460;
      cover.style.setProperty('--erase-x', (x / window.innerWidth  * 100).toFixed(2) + '%');
      cover.style.setProperty('--erase-y', (y / window.innerHeight * 100).toFixed(2) + '%');
    }

    aimErase();
    window.addEventListener('resize', aimErase, { passive: true });

    /* -- open -- */
    var opened = false;
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function open() {
      if (opened) { return; }
      opened = true;

      aimErase();                     // the layout may have settled since load

      music.play().then(function () { fadeTo(1, 1500); }).catch(function () {});

      /* The toggle arrives with the invitation, not during the animation,
         and it appears whether or not the browser allowed the audio: if it
         refused, the control shows up paused so the guest can start it by
         hand, which beats hiding a button that would work on a second tap. */
      window.setTimeout(showToggle, calm ? 350 : 2100);

      cover.classList.add('is-opening');
      if (deck && !calm) { deck.classList.add('is-arriving'); }

      /* Scrolling comes back as the silk clears, not at the very end —
         by then the invitation has been readable for half a second and a
         locked page feels broken. */
      window.setTimeout(function () {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }, calm ? 300 : 2100);

      window.setTimeout(function () {
        cover.hidden = true;
        if (deck) { deck.classList.remove('is-arriving'); }
      }, calm ? 350 : 2800);
    }

    crest.addEventListener('click', open);

    /* -- escalate the hint, but only for someone who is stuck -- */
    /* Six seconds is long enough that a guest already reaching for the seal
       never sees it; short enough that one who is waiting for the page to
       "do something" gets an answer. Any sign of intent calls it off. */
    var nudge = window.setTimeout(function () {
      cover.classList.add('is-nudging');
    }, 6000);

    ['pointerdown', 'pointermove', 'keydown', 'touchstart'].forEach(function (kind) {
      cover.addEventListener(kind, function () {
        window.clearTimeout(nudge);
        cover.classList.remove('is-nudging');
      }, { passive: true, once: true });
    });

    /* -- the toggle -- */

    var toggle = document.getElementById('music');

    function paint(playing) {
      if (!toggle) { return; }
      toggle.classList.toggle('is-playing', playing);
      toggle.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
    }

    /* The audio element is the source of truth. Asking it directly means
       the bars cannot drift out of step with the sound — not when play()
       resolves late, not when the browser pauses the track itself. */
    music.addEventListener('play',  function () { paint(true); });
    music.addEventListener('pause', function () { paint(false); });

    function showToggle() {
      if (!toggle || !toggle.hidden) { return; }
      paint(!music.paused);
      toggle.hidden = false;
      /* Force a reflow between unhiding and the class: the transition needs
         a rendered "before" state to move from. Doing it this way rather
         than with requestAnimationFrame because rAF does not fire in a
         background tab, and the button would then never appear at all. */
      void toggle.offsetWidth;
      toggle.classList.add('is-ready');
    }

    if (toggle) {
      toggle.addEventListener('click', function () {
        if (music.paused) {
          music.play().then(function () { fadeTo(1, 600); })
                      .catch(function () { paint(false); });
        } else {
          /* Fade first, pause after: cutting a piano note dead is the one
             thing that makes a mute button feel broken. */
          paint(false);
          fadeTo(0, 450, function () { music.pause(); });
        }
      });
    }
  }

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

  /* ---- gallery: lightbox ---------------------------------- */
  /* One dialog, reused. Opening is just: remember which tile, point the
     dialog's <img> at that tile's src, unhide. Nothing is cloned and no
     markup is built, so twelve photos cost the same as one. */

  var lb = document.getElementById('lightbox');
  var tiles = Array.prototype.slice.call(
    document.querySelectorAll('.gal__item:not(.is-empty)')
  );

  if (lb && tiles.length) {
    var lbImg     = lb.querySelector('.lb__img');
    var lbCaption = lb.querySelector('.lb__caption');
    var at = 0;
    var opener = null;

    function show(i) {
      /* Wrap both ways, so the arrows never dead-end. */
      at = (i + tiles.length) % tiles.length;
      var img = tiles[at].querySelector('img');
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || '';
      lbCaption.textContent = (at + 1) + ' / ' + tiles.length;
    }

    function open(i) {
      opener = tiles[i];
      show(i);
      lb.hidden = false;
      /* The page behind must not scroll under the photo. */
      document.body.style.overflow = 'hidden';
      lb.querySelector('.lb__close').focus();
    }

    function close() {
      lb.hidden = true;
      lbImg.src = '';
      document.body.style.overflow = '';
      /* Put focus back where it came from, or a keyboard user lands at the
         top of the document and has to walk the whole page again. */
      if (opener) { opener.focus(); }
    }

    tiles.forEach(function (tile, i) {
      tile.tabIndex = 0;
      tile.setAttribute('role', 'button');
      tile.addEventListener('click', function () { open(i); });
      tile.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });

    lb.querySelector('.lb__close').addEventListener('click', close);
    lb.querySelector('.lb__nav--prev').addEventListener('click', function () { show(at - 1); });
    lb.querySelector('.lb__nav--next').addEventListener('click', function () { show(at + 1); });

    /* Clicking the backdrop closes; clicking the photo or a button does not. */
    lb.addEventListener('click', function (e) {
      if (e.target === lb) { close(); }
    });

    document.addEventListener('keydown', function (e) {
      if (lb.hidden) { return; }
      if (e.key === 'Escape')     { close(); }
      if (e.key === 'ArrowLeft')  { show(at - 1); }
      if (e.key === 'ArrowRight') { show(at + 1); }
    });

    /* Swipe, on a phone. Horizontal only, and only past a real threshold,
       so a scroll that drifts sideways does not flip the photo. */
    var startX = null;
    lb.addEventListener('touchstart', function (e) {
      startX = e.changedTouches[0].clientX;
    }, { passive: true });

    lb.addEventListener('touchend', function (e) {
      if (startX === null) { return; }
      var dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) { show(dx < 0 ? at + 1 : at - 1); }
    }, { passive: true });
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

  /* The gallery gets its own pass. Watching the tiles rather than the
     section means they land in reading order as you scroll into them —
     the whole mosaic appearing at once reads as a page load, not as a
     gallery. The stagger itself is CSS; this only says when to start. */
  var tileWatcher = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) { return; }
      entry.target.classList.add('is-in');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.gal__item').forEach(function (el) {
    el.classList.add('reveal');
    tileWatcher.observe(el);
  });
})();
