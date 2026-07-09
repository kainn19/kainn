# KAINN — Portfolio

Zero-build static site. No npm, no framework, no server needed.

## Deploy to GitHub Pages
1. Create a new GitHub repo (e.g. `kainn-portfolio`).
2. Upload **everything in this folder** (`index.html`, `styles.css`, `script.js`, and the whole `assets/` folder) to the repo root — keep the folder structure exactly as-is.
3. Go to **Settings → Pages** → set Source to `main` branch, `/ (root)`.
4. Your site goes live at `https://<your-username>.github.io/<repo-name>/`.

That's it — no build step, no install, no config.

## Add a new project later
Open `script.js` and find the `PROJECTS` array at the top.

1. Put your new images in a new folder inside `assets/`, e.g. `assets/mynewdrop/01.jpg`, `02.jpg`...
2. Copy one existing project object in the `PROJECTS` array and edit it:
```js
{
  id: 'mynewdrop',
  category: 'Streetwear Campaign', // or 'AI Video'
  title: 'My New Drop',
  place: 'Wherever',
  tagline: 'One sentence about the concept.',
  type: 'gallery', // or 'video'
  folder: 'assets/mynewdrop/',
  images: ['01.jpg','02.jpg','03.jpg']
}
```
3. Save. The page, filters, and gallery build themselves from this list automatically — no other file needs to change.

To add a text-only "in development" entry instead, edit the `IN_DEVELOPMENT` array the same way.

## Structure
```
index.html      → page structure & copy
styles.css       → design system (colors, type, layout, motion)
script.js        → PROJECTS data + all interactions (filters, gallery, lightbox, cursor, reveals)
assets/          → all images & the STND BY video, organized by project
```
