# Dynamic Invitee Name — Design Spec

**Date:** 2026-07-28
**Branch:** topic/dynamic-invitee-name

## Goal

Replace the hardcoded invitee name (`"PECH ANNIEE"`) on the wedding cover with a name
dynamically resolved from a CSV file using a `?v=<id>` URL query parameter.

## Data File: `data/invitees.csv`

```
id,name
pech-001,PECH ANNIEE
chan-002,CHAN SOKHENG
ly-003,LY NARITH
```

- Two columns: `id` (URL-safe string, lowercase alphanumeric + hyphens), `name` (display name, UTF-8)
- First row is a header and is skipped during parsing
- Located at `data/invitees.csv` relative to `index.html`

## URL Format

```
https://example.com/?v=pech-001
```

- Query parameter key: `v`
- Value: the `id` field from the CSV
- Each guest receives a unique link

## JavaScript Flow

```
DOMContentLoaded (async)
  └─ resolveInviteeName()
       ├─ Read URLSearchParams.get("v")
       ├─ No "v" → skip, use CONFIG.album_display_name as-is
       ├─ fetch("data/invitees.csv") → parse → find row where id === param
       ├─ Found → overwrite CONFIG.album_display_name with name
       ├─ Not found → CONFIG.album_display_name unchanged
       └─ fetch error → CONFIG.album_display_name unchanged (silent)
  └─ populateText(), buildAgenda(), … (existing boot sequence)
```

## Error / Edge Cases

| Situation | Behavior |
|---|---|
| No `?v` in URL | Default `CONFIG.album_display_name` shown |
| `?v` present, ID not in CSV | Default shown |
| CSV fetch fails (404 / network) | Default shown |
| ID matched | CSV `name` shown |
| Malformed CSV row | Row skipped, parsing continues |

No error is ever surfaced to the guest. The invitation always opens normally.

## Files Changed

| File | Action |
|---|---|
| `data/invitees.csv` | Create |
| `js/app.js` | Edit — add `resolveInviteeName()`, make boot `async` |

No changes to `index.html` or `css/style.css`.

## Implementation Steps

1. Create `data/invitees.csv` with header + sample rows
2. Add `async function resolveInviteeName()` to `js/app.js`:
   - Parse `URLSearchParams` for key `v`
   - `fetch("data/invitees.csv")` → `.text()` → split lines → build id→name map
   - Override `CONFIG.album_display_name` if ID found
   - Wrap in `try/catch` for silent failure
3. Make the `DOMContentLoaded` callback `async` and `await resolveInviteeName()` before `populateText()`
4. Test cases:
   - No `?v` → default name
   - `?v=pech-001` → "PECH ANNIEE"
   - `?v=nonexistent` → default name
   - CSV unavailable → default name
