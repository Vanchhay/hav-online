# Wedding Invitation

Eight full-screen sections, one per page of the Canva PDF. No framework, no build
step — open `index.html` or run `python3 serve.py`.

Reference renders of the source PDF live in `docs/design/page-1.jpg` … `page-8.jpg`.

## How to fill it in

Every image on the site is a **slot**. While a slot's file is missing it renders as a
dashed box labelled with the exact filename to drop in. Put the file in
`assets/img/` under that name and it appears — no code changes.

| # | Section | Files to drop into `assets/img/` |
|---|---------|----------------------------------|
| 1 | Invitation | `p1-bg.jpg`, `p1-content.png` |
| 2 | Agenda | `p2-bg.jpg`, `p2-content.png` |
| 3 | Location | `p3-bg.jpg`, `p3-content.png` — or the split variant below |
| 4 | Countdown | `p4-bg.jpg`, `p4-photo-1.jpg`, `p4-photo-2.jpg`, `p4-photo-3.jpg`, `p4-tagline.png`, `p4-content.png` |
| 5 | Gallery A | `p5-heading.png`, `p5-photo-1.jpg`, `p5-photo-2.jpg` |
| 6 | Gallery B | `p6-photo-1.jpg` … `p6-photo-5.jpg` |
| 7 | Gallery C | `p7-photo-1.jpg` … `p7-photo-5.jpg` |
| 8 | Thank you | `p8-bg.jpg`, `p8-floral.png`, `p8-content.png` |

Section 3 ships as a single content image. A split variant — separate
`p3-heading.png`, `p3-map.png`, `p3-cta.png` (a link, target set by `MAP_URL`) and
`p3-qr.png` slots — is commented out in `index.html` directly below it; swap the two
blocks to use it.

**Which photo goes where.** Numbering runs the way you read: left to right, top to
bottom. For the two collages:

```
  Section 6            Section 7
  ┌───┬───────┐        ┌──────┬────┐
  │ 1 │       │        │  1   │ 2  │
  ├───┤   3   │        ├────┬─┴────┤
  │ 2 │       │        │ 3  │      │
  ├───┴──┬────┤        ├────┤  5   │
  │  4   │ 5  │        │ 4  │      │
  └──────┴────┘        └────┴──────┘
```

**Extensions don't matter.** The `.jpg`/`.png` in the table is only a suggestion —
if the named file isn't there the page automatically retries the other extension, so
drop in whichever you exported.

Photos use `object-fit: cover`, so any aspect ratio works — the slot crops to centre.
Artwork slots (`*-content.png`, `*-heading.png`, backgrounds) use `contain` and are
never cropped.

## Two settings

Top of `js/app.js`:

```js
const WEDDING_DATE = '2026-11-21T06:00:00+07:00';  // drives the section-4 countdown
const MAP_URL      = '';                            // "Scan for location" link target
```

Leave `MAP_URL` empty and the button is inert.

## Layout notes

- Mobile: each section is exactly one screen (`100dvh`), plain vertical scroll.
- Desktop (≥768px): a centred portrait card in the PDF's 414:582 ratio, sized to
  60% of the window width (20% clear each side). On a window too short for that,
  it shrinks to fit rather than overflow, so a section is never taller than one
  screen. Change `--card-w` in `:root` to use a different share of the width.
- Tuning a section means editing one block in `css/style.css` — they are commented
  `1 · INVITATION` through `8 · THANK YOU`, in order.
