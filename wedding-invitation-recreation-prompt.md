# Master Prompt — Animated Khmer Digital Wedding Invitation (single-page web app)

> Copy everything below the line into your AI coding assistant (or hand to a developer).
> Fill in the `CONFIGURATION` block first — every other section reads from it.
> The default values reproduce the reference invitation (Khemra & Neath); change them to make it yours.

---

## ROLE & GOAL

You are a senior front-end engineer and motion designer. Build a **single-page, mobile-first, animated digital wedding invitation** website — an elegant, romantic, traditional **Khmer (Cambodian)** e-invitation that opens like an envelope with a cinematic video intro, then reveals a vertically-scrolling invitation with reveal-on-scroll animations, a live countdown, a ceremony timeline, a stylized map, a photo-gallery lightbox, and a guest greeting/wishes wall. Everything must be **bilingual (Khmer + English)** and driven by the `CONFIGURATION` block so a non-technical user can re-theme it for any couple by editing variables and swapping assets.

Produce clean, well-commented, production-ready code. Prefer a small, dependency-light stack. Deliver a working build I can host statically (plus one small PHP/serverless endpoint for the wishes form, or a documented no-backend fallback).

---

## CONFIGURATION (edit these — the whole site is generated from them)

```yaml
# ── Couple ──────────────────────────────────────────────
album_display_name: "PECH ANNIEE"        # nickname/album name shown on the cover
groom_name_en: "KIM KHEMRA"
bride_name_en: "SAY SOPHEAKNEATH"
couple_short_en: "Khemra & Neath"        # shown on the hero after opening
groom_name_kh: "គីម ខេមរ៉ា"
bride_name_kh: "សាយ សុភ័ក្រនាថ"

# ── Parents (traditional Khmer invite lists both families) ─
groom_parents:  "Mr. … & Mrs. ROS SAMOUN"
bride_parents:  "Mr. … & Mrs. VONG PHANNY"

# ── Date & time ─────────────────────────────────────────
wedding_date_en: "SUNDAY, 1ST FEBRUARY 2026"
wedding_time_en: "5:00 PM"
wedding_date_kh: "ថ្ងៃអាទិត្យ ១៤ កើត ខែមាឃ ឆ្នាំម្សាញ់ សប្តស័ក ព.ស.២៥៦៩ ត្រូវនឹងថ្ងៃទី១ ខែកុម្ភៈ ឆ្នាំ២០២៦"
countdown_target: "2026-02-01 17:00"     # local time; drives the live countdown

# ── Venue ───────────────────────────────────────────────
venue_en: "AT THE PREMIER CENTER SEN SOK (BUILDING H), PHNOM PENH"
venue_kh: "នៅ ព្រីមៀ សេនធ័រ សែនសុខ (អគារ H) ភ្នំពេញ"
maps_url: "https://maps.google.com/?q=Premier+Center+Sen+Sok+Phnom+Penh"
maps_qr_image: "assets/img/map-qr.png"   # QR that points to maps_url
map_illustration: "assets/img/map.png"   # hand-drawn landmark map (optional)

# ── Ceremony agenda (repeatable rows: time + label + icon) ─
agenda:
  - { time_kh: "០៦:៣០ ព្រឹក", label_kh: "ចូលរួមទទួលភ្ញៀវ / អ្នកចូលរួម",     icon: "guests" }
  - { time_kh: "០៧:០០ ព្រឹក", label_kh: "ពិធីហែជំនូនកំណត់ ចូលរោងជ័យ",        icon: "procession" }
  - { time_kh: "០៧:១៥ ព្រឹក", label_kh: "អញ្ជើញពិសាអាហារពេលព្រឹក",           icon: "meal" }
  - { time_kh: "០៧:៣០ ព្រឹក", label_kh: "ពិធីរៀបចំបំពាក់ចិញ្ចៀន",             icon: "rings" }
  - { time_kh: "០៨:១៥ ព្រឹក", label_kh: "ពិធីសូត្រមន្តជ័យបរិត្ត",              icon: "monk" }
  - { time_kh: "០៩:០០ ព្រឹក", label_kh: "ពិធីកាត់សក់ បង្កគល់ពរ",              icon: "haircut" }
  - { time_kh: "១០:៣៥ ព្រឹក", label_kh: "ពិធីសែនក្រុងពាលី ចងដៃ",               icon: "blessing" }
  - { time_kh: "០៥:០០ ល្ងាច", label_kh: "អញ្ជើញពិសាអាហារពេលល្ងាច",           icon: "reception" }

# ── Gallery (pre-wedding photos, order matters) ─────────
gallery_images: [ "01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","10.jpg" ]

# ── Media assets ───────────────────────────────────────
cover_bg_video:   "assets/video/intro-ambient.mp4"   # looping, muted, behind the cover
open_intro_video: "assets/video/open-intro.mp4"      # plays once when user clicks Open
detail_bg_video:  "assets/video/detail-ambient.mp4"  # looping, muted, behind the content
background_music: "assets/audio/song.mp3"             # loops; starts on Open
favicon:          "assets/img/favicon.png"
cover_frame_png:  "assets/img/cover-frame.png"        # ornate Khmer pinnacle/border art
hero_couple_img:  "assets/img/hero.jpg"

# ── Gratitude & greeting copy ──────────────────────────
gratitude_kh: "យើងខ្ញុំ សូមគោរពថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ ចំពោះវត្តមាន ..."
gratitude_en: "We are extremely thankful for Excellencies, Lok Chum Teav, Neak Okhna, Okhna, ladies and gentlemen for your presence in the upcoming wedding of our children."

# ── Theme (colors & type) ──────────────────────────────
color_primary:   "#a66b44"                # rose-gold / terracotta — titles, text, accents
color_bg:        "#fdf8ef"                # cream / ivory page background
color_panel:     "rgba(255,255,255,0.40)" # translucent white section panels
khmer_title_font: "Moul"                  # traditional Khmer display
khmer_body_font:  "KhmerHUYSAVY, 'Noto Sans Khmer', Battambang"
latin_serif_font: "'Times New Roman', Georgia, serif"
script_name_font: "Parisienne"            # cursive for 'Khemra & Neath'

# ── Footer / contact ───────────────────────────────────
page_title_kh: "សិរីមង្គលអាពាហ៍ពិពាហ៍ — សូមគោរពអញ្ជើញ"
contact_telegram: "081 711 611"
social: { instagram: "#", facebook: "#", tiktok: "#" }
```

---

## TECH STACK

- **HTML5 + CSS3 + vanilla JS (ES6)**, with **jQuery** for DOM/animation glue (the reference uses it; keep it or replace with vanilla — your call, but keep the code readable).
- **Bootstrap 5** grid/utilities (optional, for layout only).
- **A lightbox** for the gallery + map (e.g. VenoBox, GLightbox, or a tiny custom one). Reference uses VenoBox.
- **Font Awesome** (or inline SVG) for the audio toggle + bottom-nav icons.
- Custom web fonts via `@font-face`: Khmer display (`Moul`), Khmer body (`KhmerHUYSAVY`, fallback `Noto Sans Khmer`/`Battambang`), a Latin cursive (`Parisienne`) for the couple's short name, and a Latin serif for body.
- Host large media (videos/audio) on a CDN; reference the config paths.
- **No build step required** — plain files that run from any static host. The only server piece is the wishes form endpoint (below).

---

## GLOBAL LAYOUT & DESIGN SYSTEM

**The "card" frame.** The entire invitation lives in a **fixed-width vertical column of 600px**, horizontally centered. On desktop the area outside the column is the cream page background (`color_bg`) — it reads like a tall phone/greeting-card standing in a soft field. On screens ≤ 640px the column becomes `width: 100%`.

**Scroll model.** The invitation content scrolls **inside an inner container** (`.content`), not the window — the window itself stays pinned. Give `.content` `height: 100vh; overflow-y: auto` and drive the scroll-reveal off *its* scroll events. `html { scroll-behavior: smooth }`.

**Palette.** Romantic, warm, traditional:
- Primary/ink: `color_primary` `#a66b44` (rose-gold terracotta) — used for all titles, body text, borders, icons.
- Page: `color_bg` cream/ivory `#fdf8ef`.
- Section panels: `color_panel` translucent white `rgba(255,255,255,.40)` layered over soft watercolor-floral / blush-pink backgrounds and the looping ambient video.
- Accent gilding: soft gold gradients on the ornate Khmer frame art.

**Typography.**
- Khmer titles → `Moul` (bold, ceremonial). Khmer body → `KhmerHUYSAVY` / `Noto Sans Khmer` / `Battambang`.
- English titles use a refined serif, letter-spaced, often small-caps feel.
- The couple's short name (`Khemra & Neath`) is a large **cursive script** (`Parisienne`/Boss-Signature style).
- **Bilingual title pattern** used on every section header: a short decorative line, then `ខ្មែរ  /  ENGLISH`, e.g. `សារជូនពរ  /  GREETING MESSAGE`.

**CSS variables** — expose the theme as custom properties so re-theming is one edit:
```css
:root{
  --main-color:#a66b44; --title-color:#a66b44;
  --bg-color:#fdf8ef; --panel-bg:rgba(255,255,255,.40);
  --font-khmer:'KhmerHUYSAVY','Noto Sans Khmer','Battambang',sans-serif;
  --font-khmer-title:'Moul',serif; --font-serif:'Times New Roman',serif;
}
```

**Decorative motifs.** Ornate Khmer temple-pinnacle / filigree borders framing the cover; small gold divider ornaments between blocks; hand-drawn landmark map; photos shown inside carved Khmer frames.

---

## PAGE STRUCTURE & SECTIONS (top → bottom)

Build these in order. Everything after the cover lives inside `article.display` and is **hidden until the invitation is opened**.

### 0. Ambient background layer
- A muted, looping, `playsinline` `<video>` (`cover_bg_video`) fills the card behind the cover, with a static poster image fallback. A second looping ambient video (`detail_bg_video`) sits behind the scrolling content and starts after opening.

### 1. Cover / "Envelope" (`.culture-section`) — visible on load
- Ornate Khmer frame art (`cover_frame_png`) centered.
- A title image/text: `សិរីមង្គលអាពាហ៍ពិពាហ៍` (Auspicious Wedding) + `សូមគោរពអញ្ជើញ` (We respectfully invite you).
- `album_display_name` ("PECH ANNIEE") in a serif.
- A pulsing **"Open" button** at the bottom: label `សូមចុចបើកសំបុត្រ` / `Click to Open The Invitation`, wrapped in `.zoom-in-out-box` (see animations). Page scroll is **locked** while the cover is up.

### 2. Open transition (interaction, not a visible section)
On clicking the Open button:
1. Play `open_intro_video` (`open-intro.mp4`) **fullscreen, once** — a cinematic couple reveal ending on `Khemra & Neath · 01ST FEBRUARY 2026`.
2. Start `background_music` (looping).
3. Hide the cover.
4. **On the intro video's `ended` event:** fade the intro out (~500ms), reveal `article.display`, start `detail_bg_video`, **unlock scroll**, and show the "swipe up" hint (`អូសឡើងទៅលើ`).

### 3. Invitation detail (`#event`)
- Hero: couple photo + `couple_short_en` in cursive + `wedding_date_en`.
- Formal invitation card (this block is traditionally an image with baked-in fancy Khmer type — you may render it as real text instead, styled to match):
  - Both families' parents (`groom_parents`, `bride_parents`).
  - `WEDDING INVITATION` heading + the request line: *"cordially request the honor of your presence on the auspicious occasion of the wedding of our children."*
  - `GROOM'S` → `groom_name_en`  ·  `BRIDE'S` → `bride_name_en`.
  - `ON {wedding_date_en}, AT {wedding_time_en}. {venue_en}. THANK YOU.`
  - A **"Save the Date"** button (`ចុចរក្សាទុកថ្ងៃកម្មវិធី` / `Click to Save The Date`) that downloads an `.ics` calendar event built from `countdown_target` + `venue_en`.

### 4. Live Countdown (`#countdown`)
- Bilingual header `ចំនួនថ្ងៃរាប់ថយក្រោយ  /  EVENT COUNTDOWN` with a small `decorative-line` ornament under the Khmer line.
- JS counts down to `countdown_target`, rendering four cells — **Days / Hours / Minutes / Seconds** (each a number over a small label). Update every 1s.
- When the target has passed, replace the timer with `Event End — Congratulations`.
- Set over a background hero image (the reference uses an Angkor-temple pre-wedding shot).

### 5. Event Agenda (`#agenda`)
- Bilingual header `របៀបវារៈកម្មវិធី  /  EVENT AGENDA`.
- The Khmer lunar date line (`wedding_date_kh`).
- A **vertical timeline**: for each `agenda` row, an icon on the left, a connector dot/line, then the Khmer time (`time_kh`) above the Khmer description (`label_kh`). Each row fades/slides in on scroll.

### 6. Location (`#location`)
- Bilingual header `ទីតាំងកម្មវិធី  /  LOCATION`.
- Venue name (`venue_kh` + `venue_en`).
- `map_illustration` (stylized hand-drawn landmark map) — tap to open larger in the lightbox.
- `maps_qr_image` QR code labelled `ស្កេនបញ្ជាក់ទីតាំង / GOOGLE MAPS`.
- A **"View Location" button** (`បើកមើលទីតាំង` / `Click to View Location`) linking to `maps_url` (new tab).

### 7. Photo Gallery (`#gallery`)
- Bilingual header `វិចិត្រសាល  /  PHOTO GALLERY`.
- A **masonry/mosaic grid** of `gallery_images`, each in a carved Khmer photo frame; clicking any opens a **swipeable lightbox** (VenoBox/GLightbox) galleried across all images.
- Each tile fades-in-from-bottom on scroll; images animate `scale-in` (width 0→100%).

### 8. Gratitude
- Header `សេចក្តីថ្លែងអំណរគុណ` + `OUR GRATITUDE`, decorative divider between.
- `gratitude_kh` paragraph, then `gratitude_en` paragraph.

### 9. Greeting / Wishes wall (`#wish`)
- Bilingual header `សារជូនពរ  /  GREETING MESSAGE`.
- A form: **Name** input + **Comment** textarea + submit button (`ចុចផ្ញើសារជូនពរ` / `Click to Send Greeting Message`). Submit via AJAX (no page reload).
- Below the form, a **scrollable guestbook list** of submitted wishes: round avatar, name (bold), message in quotes, and a `DD-MM-YYYY | hh:mmam/pm` timestamp. Newest first; refresh after a successful submit; show a success alert that auto-clears after ~3s.
- **Backend:** a tiny `action.php` (POST → append to JSON/SQLite → return `{message}`) plus a `GET` that returns the list. If no server is available, fall back to `localStorage` and clearly comment how to swap in a real endpoint (PHP, Firebase, or a serverless function).

### 10. Footer
- `E-Invitation by {your brand}` + `{page_title}` credit line, `contact_telegram`, and `social` icons (Instagram / Facebook / TikTok).

### 11. Fixed bottom nav (`.nav-footer`) — persistent after opening
- Left: **audio toggle** (mute/unmute) that pauses/plays `background_music`.
- Four **anchor icons** that smooth-scroll the `.content` to sections: **Agenda/Calendar → Location → Gallery → Greeting**.
- A floating **"swipe up" hint** (`អូសឡើងទៅលើ`) that is visible near the top and fades out once scrolled > ~200px.

---

## ANIMATIONS & MOTION (match these exactly)

Implement as CSS keyframes + a scroll observer. Names/values from the reference:

```css
/* pulsing CTA buttons */
.zoom-in-out-box{ animation: zoom-in-zoom-out 2s ease infinite; }
@keyframes zoom-in-zoom-out{ 0%{transform:scale(.9)} 50%{transform:scale(1)} 100%{transform:scale(.9)} }

/* image grow-in */
.pic img{ animation: scale-in .4s; }
@keyframes scale-in{ 0%{width:0%} 100%{width:100%} }

/* section reveal-on-scroll */
.js-scroll{ opacity:0; transition:opacity .5s; }
.js-scroll.scrolled{ opacity:1; }
.scrolled.fade-in-bottom{ animation: fade-in-bottom 1s ease-in-out both; }
.scrolled.slide-left { animation: slide-in-left 1s ease-in-out both; }
.scrolled.slide-right{ animation: slide-in-right 1s ease-in-out both; }
@keyframes fade-in-bottom{ 0%{transform:translateY(50px);opacity:0} 100%{transform:translateY(0);opacity:1} }
@keyframes slide-in-left { 0%{transform:translateX(-100px);opacity:0} 100%{transform:translateX(0);opacity:1} }
@keyframes slide-in-right{ 0%{transform:translateX(100px);opacity:0}  100%{transform:translateX(0);opacity:1} }

/* general opacity fade */
.fadeIns{ animation: fadeIns 2s ease forwards; }
@keyframes fadeIns{ from{opacity:0} to{opacity:1} }
```

**Scroll-reveal logic:** listen to `.content`'s scroll; for each `.js-scroll` element, if `getBoundingClientRect().top` is within the viewport (with a ~1.25 divisor look-ahead) add `.scrolled`; if it goes below the viewport, remove it (so it re-animates). (An `IntersectionObserver` is a cleaner modern equivalent — either is fine.)

**Motion feel:** gentle, unhurried, celebratory. Ambient videos loop softly behind translucent panels; titles and rows drift up as they enter; CTAs breathe.

---

## BEHAVIOR / JS LOGIC CHECKLIST

1. **On load:** show cover, hide `.display` and the intro-video layer, **lock scroll**, play `cover_bg_video`, pause the intro video, detail video, and music.
2. **Open button** → play intro video + music, hide cover; on intro `ended` → reveal content, fade intro out, play detail bg video, unlock scroll, show swipe hint.
3. **Audio:** starts on open; a toggle button flips a mute/unmute icon and pauses/plays `background_music`. When any gallery/YouTube video plays, **pause the music**; resume when it ends/closes.
4. **Countdown:** `setInterval` 1s → Days/Hours/Minutes/Seconds → "Event End — Congratulations" past target.
5. **Scroll hint** fades out after ~200px of scroll.
6. **Gallery** opens in a galleried lightbox; **Save the Date** emits an `.ics`; **View Location** opens `maps_url`.
7. **Wishes form** posts via AJAX, resets on success, re-renders the list, shows a 3s success alert.
8. **Bottom-nav icons** smooth-scroll `.content` to the matching section.
9. Respect `prefers-reduced-motion`: disable the looping breathing/reveal animations when set.

---

## RESPONSIVE

- Base design = the 600px card. `@media (max-width:640px)`: card → full width; scale type down slightly; keep the fixed bottom nav thumb-reachable; ensure videos `object-fit:cover`.
- Test at 375×812 (mobile) and on desktop (centered card on cream field).

---

## ACCESSIBILITY & PERF

- All Khmer + English text should be **real, selectable text** wherever feasible (the reference bakes some into PNGs — prefer live text for a11y/SEO; keep PNG fallback only for the most ornate title art).
- `alt` text on every image; labelled buttons; visible focus states; keyboard-operable lightbox and form.
- Lazy-load gallery images; preload the cover + intro video poster; compress media; total cover-to-interactive should feel instant.
- `<title>` = `page_title_kh`; set the `favicon`; add Open Graph tags (couple names, date, hero image) so it previews nicely when shared on Messenger/Telegram.

---

## DELIVERABLES

1. `index.html`, `css/style.css` (+ theme variables), `js/app.js`.
2. `@font-face` setup + the font files.
3. `action.php` (or serverless) for the wishes wall **and** a `localStorage` fallback path, documented.
4. A short `README` explaining exactly which `CONFIGURATION` values and which files in `assets/` to change to reskin it for a new couple.
5. Everything driven by the `CONFIGURATION` block — no hard-coded couple data anywhere else.

**Acceptance:** opening the page shows the framed cover with a breathing "Open" button; clicking it plays the intro video with music, then reveals a smooth, bilingual, reveal-on-scroll invitation with a working live countdown, ceremony timeline, mapped location, lightbox gallery, and a functioning wishes wall — all re-themeable by editing the config and swapping assets.
