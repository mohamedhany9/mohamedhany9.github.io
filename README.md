# Mohamed Hany — Portfolio

A responsive personal portfolio for Mohamed Hany, Senior Flutter Developer.

## Run locally

You can open `index.html` directly, or use a local server:

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500`.

## Deploy to GitHub Pages

1. Create a new GitHub repository, for example `mohamedhany9.github.io`.
2. Upload the contents of this folder to the repository root.
3. Push to the `main` branch.
4. In GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions** or choose **Deploy from a branch** and select `main` / `/root`.
5. Your site will be available at:
   `https://mohamedhany9.github.io/`

The portfolio content is based on the supplied CV.


## Project links

The Google Play and App Store links in the Projects section were extracted from the clickable links embedded in the supplied CV PDF.


## Supplied images

- `assets/mohamed-hany-profile.jpeg` — profile photo supplied in the conversation.
- `assets/autolina-showcase.webp` — Autolina project image supplied in the conversation.

- `assets/autolina/` — 15 Autolina app screenshots (phone, iPad 13″, iPad 11″; 5 screens each), shown in the gallery inside the Autolina project card with a lightbox viewer.
- `assets/eva/` — 8 Eva Cosmetics app screenshots (5 phone, 3 iPad), shown in the gallery inside the Eva Cosmetics project card.
- `assets/vartur/` — 6 Vartur app screenshots (phone), shown in the gallery inside the Vartur project card. Source images were 300×649, upscaled 2× for the viewer; replace with higher-res App Store screenshots when available.
- `assets/neomrs/` — 9 Neomrs app screenshots (phone), shown in the gallery inside the Neomrs project card. Source images were 300×650, upscaled 2× for the viewer; replace with higher-res App Store screenshots when available.
- `assets/jadeer/` — 5 Jadeer (Gader) app screenshots (phone), shown in the gallery inside the Jadeer project card.
- `assets/acig/` — 5 ACIG Online app screenshots (iOS), shown in the gallery inside the ACIG Online project card. Source images were 300×650, upscaled 2× for the viewer; replace with higher-res App Store screenshots when available.
- `assets/felbasket/` — 4 Fel Basket app screenshots (phone), shown in the gallery inside the Fel Basket project card. Source images were 300×650, upscaled 2× for the viewer; replace with higher-res App Store screenshots when available.
- `assets/ourchildren/` — 8 Our Children app screenshots (landscape app). The supplied images were stored sideways (300×533), so they were rotated 90° and upscaled 2×; replace with higher-res landscape screenshots when available.

## Project screenshot carousels

Each project card has a carousel (centre image, dimmed neighbours, arrows, counter, dots, swipe and ←/→ keys).
Click the main image, the ⤢ button or the card itself to open the larger project dialog.
Slides live in the `<script type="application/json" class="gallery-data">` block inside each card in `index.html`
(`sets` → one tab per device; `items` → `src`, `alt`, `cap`). The accent colour per project is `--project-accent` on the `<article>`.

## Typography

Font sizes, weights, line-heights and letter-spacing follow the scale used on sayedabdo.github.io
(see the "Typography scale" block at the end of `style.css`). Fonts are still Inter + JetBrains Mono.

## Project icons

`assets/icons/*.webp` (128×128) are shown beside each project title (and inside the project dialog).
To swap one, replace the file with a square image of the same name.

## Company logos

`assets/companies/*.webp` (160×160, white tile) are shown beside each role in the Experience timeline.
