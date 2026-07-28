# Khmer Animated Wedding Invitation — Sample

An elegant, mobile‑first, single‑page **Khmer/English digital wedding invitation** that opens
like an envelope with a cinematic intro, then reveals a scrolling invitation with reveal‑on‑scroll
animations, a **live countdown**, a **ceremony timeline**, a **stylized map + QR**, a **photo‑gallery
lightbox**, and a **guest wishes wall**. Built with plain HTML/CSS/JS — no build step.

Default content reproduces the reference design (**Khemra & Neath**). Everything is driven by one
`CONFIG` object so you can re‑theme it for any couple.

---

## Run it

Any static server works. Two easy options:

```bash
# option A — the bundled helper
python3 serve.py            # → http://127.0.0.1:8781

# option B — one-liner
python3 -m http.server 8000 # → http://localhost:8000
```

Then open the URL. (Opening `index.html` via `file://` mostly works too, but a local server is
recommended so the fonts, SVGs, and the Save‑the‑Date download behave correctly.)

---

## Make it yours — edit **`js/app.js`** → `CONFIG`

Everything on the page is generated from the `CONFIG` object at the top of [`js/app.js`](js/app.js):

| Field | What it controls |
|---|---|
| `album_display_name` | Nickname on the cover |
| `groom_name_en/kh`, `bride_name_en/kh`, `couple_short` | Names (Latin + Khmer) |
| `groom_parents`, `bride_parents` | Both families |
| `wedding_date_en/kh`, `wedding_time_en` | Displayed date/time |
| `countdown_target` | ISO datetime the live countdown ticks to |
| `venue_kh/en`, `maps_url` | Location text + Google Maps link |
| `agenda[]` | Ceremony timeline rows (`time`, `label`, `icon`) |
| `gallery[]` | Photo filenames in `assets/img/` |
| `gratitude_kh/en` | Thank‑you copy |
| `telegram`, `social` | Footer contact + social links |
| `background_music`, `*_video` | Optional media (see below) |

### Colors & fonts
Edit the CSS variables in [`css/style.css`](css/style.css) `:root` — `--main-color` (default rose‑gold
`#a66b44`), `--bg-color`, `--panel-bg`, and the font stacks. Khmer/Latin fonts load from Google Fonts
(`Moul`, `Battambang`, `Noto Serif Khmer`, `Parisienne`); swap for local `@font-face` files to run
fully offline.

### Photos & assets — drop files in `assets/`
- **Photos:** replace `assets/img/01.svg …` with your JPGs and list the new filenames in `CONFIG.gallery`
  (also swap `assets/img/hero.svg`). The included SVGs are romantic placeholders.
- **Map / QR:** replace `assets/img/map.svg` and `assets/img/map-qr.svg` (make the QR point at `maps_url`).
- **Videos (optional):** set `CONFIG.cover_bg_video`, `open_intro_video`, `detail_bg_video` to files in
  `assets/video/`. Leave them `""` to use the built‑in CSS gradient + cinematic name intro.
- **Music:** drop an mp3 at `assets/audio/song.mp3` (path in `CONFIG.background_music`). It starts on
  “Open”, and the ♪ button in the bottom nav toggles it.

> **Note:** the demo `countdown_target` is a **future** date (Feb 2027) so the countdown ticks live.
> Set it to your real wedding datetime for production.

---

## Wishes wall (guestbook)

The greeting form persists to **`localStorage`** for this offline demo (three sample wishes are seeded).
To make it a real shared wall, replace the marked block in `wireForm()` (in `js/app.js`) with a POST to
your backend and re‑render from a GET — e.g. a tiny `action.php`, a serverless function, or Firebase.

---

## Files

```
index.html          markup: cover, intro, all sections, bottom nav, lightbox
css/style.css        theme variables, layout, keyframe animations, responsive
js/app.js            CONFIG + all behavior (open, scroll‑reveal, countdown, gallery, wishes, ICS)
assets/img/          SVG placeholders (photos, hero, map, QR, favicon)
assets/video|audio/  drop real media here (optional)
serve.py             convenience static server
wedding-invitation-recreation-prompt.md   the reusable master prompt this sample was built from
```

Verified working: cover → intro → invitation → live countdown → agenda → map → gallery lightbox →
gratitude → wishes wall, with the audio toggle and bottom‑nav anchors. Respects
`prefers-reduced-motion`.
