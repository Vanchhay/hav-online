/* ============================================================
   EDIT THESE TWO LINES
   ============================================================ */

// Target date/time for the section-4 countdown. ISO 8601, +07:00 = Cambodia.
const WEDDING_DATE = '2026-11-22T06:00:00+07:00';

// Music. Filenames are percent-encoded because they contain spaces —
// an unencoded space breaks the request on most static hosts.
const TRACKS = [
  'assets/audio/path-of-the-wind-totoro.mp3',
  'assets/audio/beautiful-in-white-piano.mp3',
];
const MUSIC_VOLUME = 0.55;   // 0-1, faded up to over ~2.5s

// Ambient petals + shimmer. Counts are for a phone-sized screen and scale
// up with area. Set either to 0 to switch that layer off entirely.
const AMBIENT = {
  petals:   14,
  sparkles: 18,
  petalColors:   ['#e6c6ce', '#d8cbb4', '#c8d4ba', '#efdfcb'],
  sparkleColor:  '201, 162, 39',   // the gold of the wax seal, as r,g,b
};

// Hold the page on the envelope until the guest opens it. false = free scroll.
const INTRO_LOCK_SCROLL = true;

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
    // Optional slots are expected to be absent, so don't spend a second
    // round trip guessing the other extension for a file that isn't there.
    if (img.parentElement.classList.contains('slot--optional')) { return false; }
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
      if (page.hasAttribute('data-no-reveal')) { return; }

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

  /* ---- save the date reveal -------------------------------- */
  /* Long names get a smaller size rather than overflowing the card. */
  /* .sd-ready is what actually hides the lines, and only JS adds it —
     so if this script never runs the text is plainly visible instead
     of stranded at opacity 0. Indexes are assigned here rather than
     with :nth-child so you can add or remove a line in the HTML and
     the cadence re-spaces itself.                                    */

  var sdPlay = function () {};        // replaced below when the section exists
  var sdDuration = function () { return 0; };
  var sdSection = document.getElementById('p05');

  if (sdSection) {
    var sdLines = sdSection.querySelectorAll('.sd__line');
    sdLines.forEach(function (line, i) { line.style.setProperty('--i', i); });
    var sdNames = sdSection.querySelector('.sd__names');
    if (sdNames && sdNames.textContent.trim().length > 22) {
      sdNames.classList.add('sd__names--long');
    }

    // .sd-ready is in the HTML, not added here. Applying it from JS meant the
    // text was visible until the script ran — and stayed visible for good if
    // the script was stale or failed. It now holds from the first paint, which
    // also removes any chance of the load flicker this used to have.

    sdPlay = function () { sdSection.classList.add('is-on'); };

    // How long the whole reveal takes, read from the CSS rather than hard
    // coded, so retuning --sd-step never leaves the scroll lock out of sync.
    function cssMs(name) {
      var v = getComputedStyle(sdSection).getPropertyValue(name).trim();
      if (!v) { return 0; }
      return v.slice(-2) === 'ms' ? parseFloat(v) : parseFloat(v) * 1000;
    }

    sdDuration = function () {
      var lines = sdSection.querySelectorAll('.sd__line').length;
      return cssMs('--sd-start') +
             Math.max(lines - 1, 0) * cssMs('--sd-step') +
             cssMs('--sd-fade');
    };

    // The observer is now only a backstop, for a guest who scrolls straight
    // here without using the envelope. A low threshold on purpose: 0.45 of a
    // full-height section is a surprisingly late trigger, and it was the only
    // thing starting the sequence.
    // No scroll trigger and no observer: this section is the first thing on
    // the page and its own envelope is the only way in. The envelope handler
    // below calls sdPlay() directly.
  }

  /* ---- ken burns ------------------------------------------- */
  /* Deliberately does NOT unobserve: the class goes on when a section
     scrolls in and comes back off when it leaves, so only the visible
     background is ever animating.                                     */

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      'IntersectionObserver' in window) {

    var kbWatcher = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('kb-live', entry.isIntersecting);
      });
    }, { rootMargin: '10% 0px' });

    document.querySelectorAll('.page').forEach(function (page) {
      if (page.querySelector('.slot--bg img')) { kbWatcher.observe(page); }
    });
  }

  /* ---- music ----------------------------------------------- */
  /* Browsers refuse to start audio without a user gesture, so nothing
     plays on load. Opening the envelope IS that gesture — the music
     comes up with the card. Without an envelope, the first tap anywhere
     starts it instead.                                                 */

  var musicPlay = function () {};   // replaced below when there are tracks
  var musicBtn = document.querySelector('[data-music]');

  if (musicBtn && TRACKS.length) {
    var audio = new Audio();
    var trackIndex = 0;
    var wantPlaying = false;
    var deadTracks = 0;

    // 'none', not 'auto': the first track is several megabytes and the browser
    // would fetch it during page load, ahead of the images. Nothing is
    // requested until the envelope is opened and play() is actually called.
    audio.preload = 'none';
    audio.volume = 0;

    function cue(i) {
      trackIndex = ((i % TRACKS.length) + TRACKS.length) % TRACKS.length;
      audio.src = TRACKS[trackIndex];
    }

    function fadeTo(target, ms) {
      var from = audio.volume;
      var t0 = performance.now();
      requestAnimationFrame(function step(now) {
        var k = Math.min(1, (now - t0) / ms);
        audio.volume = Math.max(0, Math.min(1, from + (target - from) * k));
        if (k < 1) { requestAnimationFrame(step); }
      });
    }

    audio.addEventListener('canplay', function () {
      deadTracks = 0;
      musicBtn.hidden = false;
    });

    audio.addEventListener('error', function () {
      deadTracks++;
      if (deadTracks >= TRACKS.length) { musicBtn.hidden = true; return; }
      cue(trackIndex + 1);
      if (wantPlaying) { audio.play().catch(function () {}); }
    });

    audio.addEventListener('ended', function () {
      cue(trackIndex + 1);
      audio.play().catch(function () {});
    });

    function play() {
      wantPlaying = true;
      audio.play().then(function () {
        musicBtn.hidden = false;
        musicBtn.classList.add('is-playing');
        fadeTo(MUSIC_VOLUME, 2500);
      }).catch(function () {
        wantPlaying = false;        // gesture requirement not met yet
      });
    }

    function pause() {
      wantPlaying = false;
      musicBtn.classList.remove('is-playing');
      fadeTo(0, 400);
      setTimeout(function () { if (!wantPlaying) { audio.pause(); } }, 420);
    }

    musicBtn.addEventListener('click', function () {
      wantPlaying ? pause() : play();
    });

    cue(0);
    musicPlay = play;

    // No envelope to open? Then the first tap anywhere is the gesture.
    if (!document.querySelector('[data-envelope]')) {
      document.addEventListener('pointerdown', function once() {
        document.removeEventListener('pointerdown', once);
        play();
      });
    }
  }

  /* ---- envelope intro -------------------------------------- */

  var envelope = document.querySelector('[data-envelope]');

  if (envelope) {
    // Named docEl, not root: the countdown below already declares `var root`
    // in this same function scope, and var is function-scoped — the two would
    // be the same variable, so by click time this would point at the wrong node.
    var docEl = document.documentElement;
    var locked = INTRO_LOCK_SCROLL && !location.hash;

    function releaseScroll() { docEl.classList.remove('intro-locked'); }

    if (locked) {
      // Held until the envelope is opened, with no timed release. There was a
      // 12s auto-unlock here as a "never trap the page" guard, but it just
      // meant the lock quietly expired while the guest was still looking at
      // the envelope. There is no trap to guard against anyway: the lock is
      // applied by this script, so if the script fails it is never applied,
      // and the <noscript> block skips the envelope entirely.
      docEl.classList.add('intro-locked');
    }

    // Opens in place. The flap turns, then the cover lifts away while the
    // card zooms down into rest. Nothing scrolls, so nothing depends on a
    // scroll landing or an observer noticing that it did — which is exactly
    // what was failing before.
    var REVEAL_AFTER = 1275;   // ms from tap to the card starting its zoom

    function openEnvelope() {
      if (envelope.classList.contains('is-open')) { return; }
      envelope.classList.add('is-open');
      musicPlay();

      setTimeout(function () {
        sdPlay();
        // Scroll stays locked until the last line has finished arriving, so
        // nobody scrolls away mid-reveal. The wait is measured from the CSS,
        // plus a short grace period.
        setTimeout(releaseScroll, sdDuration() + 400);
      }, REVEAL_AFTER);
    }

    envelope.addEventListener('click', openEnvelope);
  }

  /* ---- ambient petals + shimmer ---------------------------- */
  /* One canvas, one rAF loop. Everything is redrawn each frame rather than
     kept as DOM nodes, so the cost is a few dozen fills instead of a few
     dozen composited layers — which is what matters on a cheap phone.      */

  var ambCanvas = document.querySelector('[data-ambient]');

  if (ambCanvas &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      (AMBIENT.petals > 0 || AMBIENT.sparkles > 0)) {

    var ambCtx = ambCanvas.getContext('2d');
    var ambW = 0, ambH = 0, ambRaf = null;
    var petals = [], sparkles = [];

    function rand(a, b) { return a + Math.random() * (b - a); }

    function ambResize() {
      // Cap the pixel ratio at 2: a 3x buffer on a large phone is a lot of
      // fill rate for decoration nobody is looking straight at.
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      ambW = window.innerWidth;
      ambH = window.innerHeight;
      ambCanvas.width  = Math.round(ambW * dpr);
      ambCanvas.height = Math.round(ambH * dpr);
      ambCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Scale the population with screen area so a desktop isn't sparse and a
    // phone isn't swamped.
    function countFor(base) {
      var factor = Math.sqrt((ambW * ambH) / (390 * 844));
      return Math.round(base * Math.min(Math.max(factor, 1), 2.4));
    }

    function makePetal(seeded) {
      return {
        x: rand(0, ambW),
        y: seeded ? rand(-ambH, ambH) : rand(-60, -10),
        size: rand(4.5, 9),
        speed: rand(14, 34),            // px per second
        sway: rand(14, 42),
        swayRate: rand(0.25, 0.7),
        phase: rand(0, Math.PI * 2),
        spin: rand(0.4, 1.5),
        tilt: rand(0, Math.PI * 2),
        alpha: rand(0.5, 0.92),
        color: AMBIENT.petalColors[(Math.random() * AMBIENT.petalColors.length) | 0]
      };
    }

    function makeSparkle() {
      return {
        x: rand(0, ambW),
        y: rand(0, ambH),
        r: rand(0.8, 2.1),
        life: 0,
        span: rand(1.6, 4.2),           // seconds for one full twinkle
        peak: rand(0.35, 0.95)
      };
    }

    function seed() {
      petals = [];
      sparkles = [];
      var np = countFor(AMBIENT.petals);
      var ns = countFor(AMBIENT.sparkles);
      for (var i = 0; i < np; i++) { petals.push(makePetal(true)); }
      for (var j = 0; j < ns; j++) {
        var sp = makeSparkle();
        sp.life = rand(0, sp.span);     // stagger so they don't blink together
        sparkles.push(sp);
      }
    }

    function drawPetal(p) {
      ambCtx.save();
      ambCtx.translate(p.x, p.y);
      ambCtx.rotate(p.tilt);
      // Squashing horizontally as it spins reads as a petal turning over,
      // without any of the cost of actual 3D.
      ambCtx.scale(Math.cos(p.phase * 1.3) * 0.7 + 0.35, 1);
      ambCtx.globalAlpha = p.alpha;
      ambCtx.fillStyle = p.color;
      ambCtx.beginPath();
      ambCtx.moveTo(0, -p.size);
      ambCtx.quadraticCurveTo(p.size * 0.9, -p.size * 0.15, 0, p.size);
      ambCtx.quadraticCurveTo(-p.size * 0.9, -p.size * 0.15, 0, -p.size);
      ambCtx.fill();
      ambCtx.restore();
    }

    function drawSparkle(sp) {
      // Ease in and out of the twinkle rather than a linear ramp.
      var k = sp.life / sp.span;
      var a = Math.sin(k * Math.PI);
      a = a * a * sp.peak;
      if (a <= 0.01) { return; }

      var rgb = AMBIENT.sparkleColor;
      ambCtx.save();
      ambCtx.translate(sp.x, sp.y);

      // Mostly glow with only a hint of a cross — a long, thick cross reads
      // as a drawn plus sign rather than a glint of light.
      var glow = ambCtx.createRadialGradient(0, 0, 0, 0, 0, sp.r * 7);
      glow.addColorStop(0,    'rgba(' + rgb + ',' + a + ')');
      glow.addColorStop(0.35, 'rgba(' + rgb + ',' + a * 0.28 + ')');
      glow.addColorStop(1,    'rgba(' + rgb + ',0)');
      ambCtx.fillStyle = glow;
      ambCtx.beginPath();
      ambCtx.arc(0, 0, sp.r * 7, 0, Math.PI * 2);
      ambCtx.fill();

      ambCtx.strokeStyle = 'rgba(' + rgb + ',' + a * 0.4 + ')';
      ambCtx.lineWidth = Math.max(0.5, sp.r * 0.28);
      ambCtx.lineCap = 'round';
      ambCtx.beginPath();
      ambCtx.moveTo(-sp.r * 2.2, 0); ambCtx.lineTo(sp.r * 2.2, 0);
      ambCtx.moveTo(0, -sp.r * 2.2); ambCtx.lineTo(0, sp.r * 2.2);
      ambCtx.stroke();
      ambCtx.restore();
    }

    var ambLast = null;

    function ambFrame(now) {
      if (ambLast === null) { ambLast = now; }
      var dt = Math.min((now - ambLast) / 1000, 0.05);   // clamp after a stall
      ambLast = now;

      ambCtx.clearRect(0, 0, ambW, ambH);

      for (var i = 0; i < petals.length; i++) {
        var p = petals[i];
        p.phase += p.spin * dt;
        p.y += p.speed * dt;
        p.x += Math.sin(p.phase * p.swayRate * 3) * p.sway * dt;
        p.tilt += p.spin * 0.35 * dt;
        if (p.y - p.size > ambH) { petals[i] = makePetal(false); }
        else { drawPetal(p); }
      }

      for (var j = 0; j < sparkles.length; j++) {
        var sp = sparkles[j];
        sp.life += dt;
        if (sp.life >= sp.span) {
          sparkles[j] = makeSparkle();   // reappears somewhere new
        } else {
          drawSparkle(sp);
        }
      }

      ambRaf = requestAnimationFrame(ambFrame);
    }

    function ambStart() {
      if (ambRaf === null) { ambLast = null; ambRaf = requestAnimationFrame(ambFrame); }
    }
    function ambStop() {
      if (ambRaf !== null) { cancelAnimationFrame(ambRaf); ambRaf = null; }
    }

    ambResize();
    seed();
    ambStart();

    var ambResizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(ambResizeTimer);
      ambResizeTimer = setTimeout(function () { ambResize(); seed(); }, 200);
    });

    // Don't burn battery animating a tab nobody is looking at.
    document.addEventListener('visibilitychange', function () {
      document.hidden ? ambStop() : ambStart();
    });
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
