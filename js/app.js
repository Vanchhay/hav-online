/* ===================================================================
   Khmer Animated Wedding Invitation — behavior
   EDIT THE CONFIG BELOW to re-theme for any couple, then swap the files
   in assets/. Everything on the page is generated from this object.
   =================================================================== */

const CONFIG = {
  // ── Couple ──────────────────────────────────────────
  album_display_name: "PECH ANNIEE",
  groom_name_en: "KIM KHEMRA",
  bride_name_en: "SAY SOPHEAKNEATH",
  groom_name_kh: "គីម ខេមរ៉ា",
  bride_name_kh: "សាយ សុភ័ក្រនាថ",
  couple_short: "Khemra & Neath",
  groom_parents: "Mr. Sok Dara & Mrs. Ros Samoun",
  bride_parents: "Mr. Chan Veasna & Mrs. Vong Phanny",

  // ── Date & time ─────────────────────────────────────
  // NOTE: demo uses a future date so the countdown ticks live.
  // For the real event set both the text and the target below.
  wedding_date_en: "01 FEBRUARY 2027",
  wedding_time_en: "5:00 PM",
  wedding_date_kh: "ថ្ងៃអាទិត្យ ១៤ កើត ខែមាឃ ព.ស.២៥៧០ ត្រូវនឹងថ្ងៃទី ០១ ខែកុម្ភៈ ឆ្នាំ២០២៧",
  countdown_target: "2027-02-01T17:00:00", // ISO local time

  // ── Venue ───────────────────────────────────────────
  venue_kh: "នៅ ព្រីមៀ សេនធ័រ សែនសុខ (អគារ H) ភ្នំពេញ",
  venue_en: "AT THE PREMIER CENTER SEN SOK (BUILDING H), PHNOM PENH. THANK YOU.",
  maps_url: "https://www.google.com/maps/search/?api=1&query=Premier+Center+Sen+Sok+Phnom+Penh",

  // ── Agenda (icon: guests|procession|meal|rings|monk|haircut|blessing|reception) ──
  agenda: [
    { time: "០៦:៣០ ព្រឹក", label: "ភ្ញៀវកិត្តិយសអញ្ជើញចូលរួម",              icon: "guests" },
    { time: "០៧:០០ ព្រឹក", label: "ពិធីហែជំនូនកំណត់ ចូលរោងជ័យ",           icon: "procession" },
    { time: "០៧:១៥ ព្រឹក", label: "អញ្ជើញពិសាអាហារពេលព្រឹក",              icon: "meal" },
    { time: "០៧:៣០ ព្រឹក", label: "ពិធីរៀបចំបំពាក់ចិញ្ចៀន",                icon: "rings" },
    { time: "០៨:១៥ ព្រឹក", label: "ពិធីសូត្រមន្តជ័យបរិត្ត",                 icon: "monk" },
    { time: "០៩:០០ ព្រឹក", label: "ពិធីកាត់សក់ បង្កគល់ពរ",                 icon: "haircut" },
    { time: "១០:៣៥ ព្រឹក", label: "ពិធីសែនក្រុងពាលី ចងដៃ",                  icon: "blessing" },
    { time: "០៥:០០ ល្ងាច", label: "អញ្ជើញពិសាអាហារពេលល្ងាច",              icon: "reception" },
  ],

  // ── Gallery (drop your own files in assets/img and list them here) ──
  gallery: ["01.svg","02.svg","03.svg","04.svg","05.svg","06.svg","07.svg","08.svg","09.svg","10.svg"],

  // ── Media (leave "" to use the built-in CSS ambient/intro) ──
  cover_bg_video: "",   // e.g. "assets/video/intro-ambient.mp4"
  detail_bg_video: "",  // e.g. "assets/video/detail-ambient.mp4"
  open_intro_video: "", // e.g. "assets/video/open-intro.mp4"
  background_music: "assets/audio/song.mp3",

  // ── Copy ────────────────────────────────────────────
  gratitude_kh: "យើងខ្ញុំ សូមគោរពថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ ចំពោះវត្តមានដ៏ឧត្តុង្គឧត្តមរបស់ សម្តេច ឯកឧត្តម លោកជំទាវ លោកឧកញ៉ា អ្នកឧកញ៉ា ទ្រង់ លោក លោកស្រី អ្នកនាង កញ្ញា ដែលបានអញ្ជើញចូលរួមជាកិត្តិយស ក្នុងកម្មវិធីពិធីមង្គលអាពាហ៍ពិពាហ៍ កូនប្រុស-កូនស្រីរបស់យើងខ្ញុំ។",
  gratitude_en: "We are extremely thankful for Excellencies, Lok Chum Teav, Neak Okhna, Okhna, ladies and gentlemen for your presence at the wedding of our children.",

  // ── Footer ──────────────────────────────────────────
  page_title: "សិរីមង្គលអាពាហ៍ពិពាហ៍ — សូមគោរពអញ្ជើញ",
  telegram: "081 711 611",
  social: { instagram: "#", facebook: "#", tiktok: "#" },
};

/* ---------- Agenda icons ---------- */
const ICONS = {
  guests:     '<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="16" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 19c0-3 2.5-5 5-5s5 2 5 5M13 19c0-3 2-5 3-5s5 2 5 5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  procession: '<svg viewBox="0 0 24 24"><path d="M4 20V9l8-5 8 5v11" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 20v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  meal:       '<svg viewBox="0 0 24 24"><path d="M6 3v7a2 2 0 004 0V3M8 12v9M18 3c-2 0-3 2-3 5s1 4 3 4v9" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  rings:      '<svg viewBox="0 0 24 24"><circle cx="9" cy="14" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="15" cy="14" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M15 4l2 3h-4z" fill="currentColor"/></svg>',
  monk:       '<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6 21c0-4 3-7 6-7s6 3 6 7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 10v7" stroke="currentColor" stroke-width="1.6"/></svg>',
  haircut:    '<svg viewBox="0 0 24 24"><circle cx="6" cy="7" r="2.4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="6" cy="17" r="2.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 8l12 9M8 16l12-9" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  blessing:   '<svg viewBox="0 0 24 24"><path d="M12 3l2 5 5 .5-4 3.5 1.5 5L12 19l-4.5 3 1.5-5-4-3.5 5-.5z" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
  reception:  '<svg viewBox="0 0 24 24"><path d="M4 10h16l-2 10H6z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 10a4 4 0 018 0" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 3v3" stroke="currentColor" stroke-width="1.6"/></svg>',
};
const SOCIAL_ICONS = {
  instagram: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>',
  facebook:  '<svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8z" fill="currentColor"/></svg>',
  tiktok:    '<svg viewBox="0 0 24 24"><path d="M14 4v9.5a3.5 3.5 0 11-3-3.46V13a1.5 1.5 0 101 1.4V4h2c.3 2 1.7 3.4 4 3.6V10c-1.6-.1-3-.6-4-1.5z" fill="currentColor"/></svg>',
};

/* =================================================================
   Resolve invitee name from ?v=<id> → data/invitees.csv
   ================================================================= */
async function resolveInviteeName() {
  const id = new URLSearchParams(window.location.search).get("v");
  if (!id) return;
  try {
    const text = await fetch("data/invitees.csv").then((r) => r.text());
    const lines = text.trim().split("\n").slice(1); // skip header
    for (const line of lines) {
      const comma = line.indexOf(",");
      if (comma === -1) continue;
      const rowId = line.slice(0, comma).trim();
      const rowName = line.slice(comma + 1).trim();
      if (rowId === id) {
        CONFIG.album_display_name = rowName;
        return;
      }
    }
  } catch (_) {
    // fetch failed — keep default
  }
}

/* =================================================================
   Boot
   ================================================================= */
document.addEventListener("DOMContentLoaded", async () => {
  await resolveInviteeName();
  populateText();
  buildAgenda();
  buildGallery();
  buildSocial();
  makePetals(document.getElementById("petals"), 14);
  makePetals(document.querySelector(".intro-petals"), 10);
  seedWishesIfEmpty();
  renderWishes();
  wireMedia();
  wireOpen();
  wireLightbox();
  wireNav();
  wireForm();
  wireSaveButtons();
});

/* ---------- Fill config-driven text ---------- */
function populateText() {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  document.title = CONFIG.page_title;
  set("page-title", CONFIG.page_title);
  set("og-title", CONFIG.couple_short + " — Wedding Invitation");
  set("cover-album", CONFIG.album_display_name);
  set("intro-groom", CONFIG.couple_short.split("&")[0].trim());
  set("intro-bride", (CONFIG.couple_short.split("&")[1] || "").trim());
  set("intro-date", CONFIG.wedding_date_en.replace(/ /g, " · "));
  set("groom-parents", CONFIG.groom_parents);
  set("bride-parents", CONFIG.bride_parents);
  set("groom-en", CONFIG.groom_name_en);
  set("groom-kh", CONFIG.groom_name_kh);
  set("bride-en", CONFIG.bride_name_en);
  set("bride-kh", CONFIG.bride_name_kh);
  set("invite-when", `ON ${CONFIG.wedding_date_en}, AT ${CONFIG.wedding_time_en}.`);
  set("invite-where", CONFIG.venue_en);
  set("agenda-date", CONFIG.wedding_date_kh);
  set("venue-kh", CONFIG.venue_kh);
  set("venue-en", CONFIG.venue_en.replace(/\.?\s*THANK YOU\.?$/i, ""));
  set("gratitude-kh", CONFIG.gratitude_kh);
  set("gratitude-en", CONFIG.gratitude_en);
  set("footer-telegram", CONFIG.telegram);
}

function buildAgenda() {
  const ul = document.getElementById("timeline");
  ul.innerHTML = CONFIG.agenda.map((a, i) => `
    <li class="tl-item js-scroll ${i % 2 ? "slide-right" : "slide-left"}">
      <span class="tl-icon">${ICONS[a.icon] || ICONS.blessing}</span>
      <div class="tl-body"><div class="tl-time">${a.time}</div><div class="tl-label">${a.label}</div></div>
    </li>`).join("");
}

function buildGallery() {
  const grid = document.getElementById("gallery-grid");
  grid.innerHTML = CONFIG.gallery.map((src, i) => `
    <a class="g-item js-scroll fade-in-bottom lightbox-item" href="assets/img/${src}" data-caption="${CONFIG.couple_short} · ${i + 1}">
      <img src="assets/img/${src}" alt="Wedding photo ${i + 1}" loading="lazy"/>
    </a>`).join("");
}

function buildSocial() {
  const wrap = document.getElementById("footer-social");
  wrap.innerHTML = Object.entries(CONFIG.social)
    .map(([k, url]) => `<a href="${url}" target="_blank" rel="noopener" aria-label="${k}">${SOCIAL_ICONS[k] || ""}</a>`).join("");
}

function makePetals(host, n) {
  if (!host) return;
  const glyphs = ["❀", "✿", "❁", "🌸", "❋"];
  for (let i = 0; i < n; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.textContent = glyphs[i % glyphs.length];
    p.style.left = Math.random() * 100 + "%";
    p.style.fontSize = 10 + Math.random() * 16 + "px";
    p.style.animationDuration = 7 + Math.random() * 9 + "s";
    p.style.animationDelay = -Math.random() * 10 + "s";
    host.appendChild(p);
  }
}

/* =================================================================
   Media wiring (optional real videos/audio)
   ================================================================= */
function wireMedia() {
  const amb = document.getElementById("ambient-video");
  if (CONFIG.cover_bg_video) { amb.src = CONFIG.cover_bg_video; amb.play().catch(() => {}); }
  const song = document.getElementById("song");
  if (CONFIG.background_music) song.src = CONFIG.background_music;
  const iv = document.getElementById("intro-video");
  if (CONFIG.open_intro_video) iv.src = CONFIG.open_intro_video;
}

/* =================================================================
   Open sequence  (cover → intro → content)
   ================================================================= */
function wireOpen() {
  const btn = document.getElementById("btn-open");
  const cover = document.getElementById("cover");
  const intro = document.getElementById("intro");
  const introVideo = document.getElementById("intro-video");
  const song = document.getElementById("song");
  let finished = false;

  btn.addEventListener("click", () => {
    // user gesture → we may start audio with sound
    if (CONFIG.background_music) song.play().catch(() => {});
    cover.style.transition = "opacity .6s";
    cover.style.opacity = "0";
    setTimeout(() => (cover.style.display = "none"), 600);

    intro.classList.add("show");
    intro.setAttribute("aria-hidden", "false");

    if (CONFIG.open_intro_video) {
      introVideo.play().catch(() => {});
      introVideo.addEventListener("ended", finishIntro, { once: true });
      // safety net if the video never fires "ended"
      setTimeout(finishIntro, 15000);
    } else {
      // CSS cinematic intro — auto-advance
      setTimeout(finishIntro, 4600);
    }
  });

  // tap to skip the intro
  document.getElementById("intro").addEventListener("click", finishIntro);

  function finishIntro() {
    if (finished) return;
    finished = true;
    const introEl = document.getElementById("intro");
    introEl.style.transition = "opacity .5s";
    introEl.style.opacity = "0";
    setTimeout(() => { introEl.classList.remove("show"); introEl.style.display = "none"; }, 500);

    const content = document.getElementById("content");
    const nav = document.getElementById("nav-footer");
    content.hidden = false;
    nav.hidden = false;

    const bg = document.getElementById("ambient-video");
    if (CONFIG.detail_bg_video) { bg.src = CONFIG.detail_bg_video; bg.play().catch(() => {}); }

    initScrollReveal();
    startCountdown();
    initSwipeHint();
    updateAudioIcon();
  }
}

/* =================================================================
   Scroll-reveal  (adds .scrolled to .js-scroll elements in view)
   ================================================================= */
function initScrollReveal() {
  const content = document.getElementById("content");
  const els = content.querySelectorAll(".js-scroll");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("scrolled");
      else e.target.classList.remove("scrolled"); // re-animate on return
    });
  }, { root: content, threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  els.forEach((el) => io.observe(el));
}

/* =================================================================
   Live countdown
   ================================================================= */
function startCountdown() {
  const target = new Date(CONFIG.countdown_target).getTime();
  const grid = document.getElementById("countdown-grid");
  const cells = {
    days: grid.querySelector('[data-cd="days"]'),
    hours: grid.querySelector('[data-cd="hours"]'),
    minutes: grid.querySelector('[data-cd="minutes"]'),
    seconds: grid.querySelector('[data-cd="seconds"]'),
  };
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    const dist = target - Date.now();
    if (dist <= 0) {
      clearInterval(timer);
      grid.classList.add("ended");
      grid.innerHTML = '<div class="cd-ended">Event Ended — Congratulations 🎉</div>';
      return;
    }
    cells.days.textContent = Math.floor(dist / 86400000);
    cells.hours.textContent = pad(Math.floor((dist % 86400000) / 3600000));
    cells.minutes.textContent = pad(Math.floor((dist % 3600000) / 60000));
    cells.seconds.textContent = pad(Math.floor((dist % 60000) / 1000));
  }
  tick();
  const timer = setInterval(tick, 1000);
}

/* =================================================================
   Swipe-up hint
   ================================================================= */
function initSwipeHint() {
  const content = document.getElementById("content");
  const hint = document.getElementById("swipe-hint");
  content.addEventListener("scroll", () => {
    hint.style.opacity = content.scrollTop > 200 ? "0" : "1";
  });
}

/* =================================================================
   Audio toggle
   ================================================================= */
function updateAudioIcon() {
  const song = document.getElementById("song");
  const btn = document.getElementById("audio-toggle");
  btn.classList.toggle("muted", song.paused);
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest("#audio-toggle");
  if (!btn) return;
  const song = document.getElementById("song");
  if (song.paused) song.play().catch(() => {}); else song.pause();
  updateAudioIcon();
});

/* =================================================================
   Lightbox (gallery + map)
   ================================================================= */
function wireLightbox() {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lb-img");
  const cap = document.getElementById("lb-caption");
  const song = document.getElementById("song");
  let items = [], idx = 0, wasPlaying = false;

  function collect() { items = Array.from(document.querySelectorAll(".lightbox-item")); }
  function show(i) {
    idx = (i + items.length) % items.length;
    const a = items[idx];
    img.src = a.getAttribute("href");
    cap.textContent = a.dataset.caption || "";
  }
  function open(i) {
    collect(); show(i);
    lb.hidden = false;
    wasPlaying = !song.paused; if (wasPlaying) { song.pause(); updateAudioIcon(); }
  }
  function close() {
    lb.hidden = true;
    if (wasPlaying) { song.play().catch(() => {}); updateAudioIcon(); }
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest(".lightbox-item");
    if (!a) return;
    e.preventDefault();
    collect();
    open(items.indexOf(a));
  });
  document.getElementById("lb-close").addEventListener("click", close);
  document.getElementById("lb-next").addEventListener("click", () => show(idx + 1));
  document.getElementById("lb-prev").addEventListener("click", () => show(idx - 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(idx + 1);
    if (e.key === "ArrowLeft") show(idx - 1);
  });
}

/* =================================================================
   Bottom-nav smooth scroll
   ================================================================= */
function wireNav() {
  document.querySelectorAll(".nav-links button").forEach((b) => {
    b.addEventListener("click", () => {
      const el = document.getElementById(b.dataset.target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* =================================================================
   Save-the-Date (.ics) + View Location
   ================================================================= */
function wireSaveButtons() {
  document.getElementById("btn-location").addEventListener("click", () => {
    window.open(CONFIG.maps_url, "_blank", "noopener");
  });
  document.getElementById("btn-save-date").addEventListener("click", () => {
    const start = new Date(CONFIG.countdown_target);
    const end = new Date(start.getTime() + 4 * 3600000);
    const fmt = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//wedding//invite//EN", "BEGIN:VEVENT",
      "UID:" + start.getTime() + "@wedding",
      "DTSTART:" + fmt(start), "DTEND:" + fmt(end),
      "SUMMARY:" + CONFIG.couple_short + " — Wedding",
      "LOCATION:" + CONFIG.venue_en.replace(/,?\s*THANK YOU\.?$/i, ""),
      "DESCRIPTION:With love, you are invited.",
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url; a.download = "save-the-date.ics"; a.click();
    URL.revokeObjectURL(url);
  });
}

/* =================================================================
   Wishes wall  (localStorage demo — swap loadWishes/saveWish for a
   real endpoint: POST to action.php then re-render.)
   ================================================================= */
const WISH_KEY = "wedding_wishes_v1";
function loadWishes() { try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; } catch { return []; } }
function persistWishes(list) { localStorage.setItem(WISH_KEY, JSON.stringify(list)); }

function seedWishesIfEmpty() {
  if (loadWishes().length) return;
  persistWishes([
    { name: "Lyka", message: "Two hearts, one beautiful forever. Congratulations on your wedding day! 💕", ts: Date.now() - 5 * 864e5 },
    { name: "Sophea", message: "សូមអោយគូស្នេហ៍ទាំងពីរមានសុភមង្គល ជាអមតៈ 🙏", ts: Date.now() - 2 * 864e5 },
    { name: "David", message: "Wishing you a lifetime of love and laughter. 🎉", ts: Date.now() - 6 * 36e5 },
  ]);
}

function fmtStamp(ts) {
  const d = new Date(ts);
  const p = (n) => String(n).padStart(2, "0");
  let h = d.getHours(); const ap = h >= 12 ? "pm" : "am"; h = h % 12 || 12;
  return `${p(d.getDate())}-${p(d.getMonth() + 1)}-${d.getFullYear()} | ${p(h)}:${p(d.getMinutes())}${ap}`;
}

function renderWishes() {
  const list = loadWishes().slice().sort((a, b) => b.ts - a.ts);
  const wrap = document.getElementById("wish-list");
  wrap.innerHTML = list.map((w) => `
    <div class="wish-item">
      <div class="wish-avatar">${(w.name[0] || "?").toUpperCase()}</div>
      <div class="wish-bubble">
        <div class="wish-who">${escapeHtml(w.name)}</div>
        <div class="wish-text">${escapeHtml(w.message)}</div>
        <div class="wish-time">${fmtStamp(w.ts)}</div>
      </div>
    </div>`).join("");
}

function wireForm() {
  const form = document.getElementById("wish-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("wish-name").value.trim();
    const message = document.getElementById("wish-msg").value.trim();
    if (!name || !message) return;

    // ── Demo persistence (localStorage). For a live wall, replace with:
    //   fetch('action.php', {method:'POST', body:new FormData(form)}).then(...)
    const list = loadWishes();
    list.push({ name, message, ts: Date.now() });
    persistWishes(list);

    form.reset();
    renderWishes();
    const alertEl = document.getElementById("wish-alert");
    alertEl.textContent = "សូមអរគុណ! Your greeting has been sent 💐";
    setTimeout(() => (alertEl.textContent = ""), 3000);
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
