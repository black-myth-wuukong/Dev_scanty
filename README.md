# Scanty — Developer Portfolio

A single-page, theme-switching developer portfolio. No frameworks, no build step — plain HTML, CSS, and JavaScript.

## Files

```
index.html               markup — links to the two files below
scanty-portfolio.css     all styling: layout, animations, 6 color themes
scanty-portfolio.js      theme switcher, particle background, typewriter
                          effect, card tilt, scroll-reveal animations
```

Keep all three files in the same folder — `index.html` loads the other two by relative filename.

## Running it locally

No install needed. Either:

- Double-click `index.html` to open it directly in a browser, or
- Serve it properly (recommended, avoids some browser file:// restrictions):
  ```
  npx serve .
  ```
  then open the URL it prints (usually `http://localhost:3000`).

## Deploying it

This is a static site — it works as-is on any static host:

- **GitHub Pages**: push the folder to a repo, enable Pages in repo settings, point it at the branch/root.
- **Netlify / Vercel**: drag-and-drop the folder onto their dashboard, or connect the repo.

No build command or output directory needed — just serve the folder root.

## Customizing

**Your real contact info** — in `scanty-portfolio.js`, find the `CONTACTS` array near the bottom and replace the placeholder email/Telegram/TikTok/GitHub handles and links.

**Skill levels** — same file, the `SKILLS` array. Each entry has a `level` (0–100) that drives its progress bar.

**Projects** — the `PROJECTS` array, same file. Add, remove, or edit entries; each renders as a card automatically.

**Themes** — in `scanty-portfolio.css`, each theme is a block of CSS custom properties at the top (`:root[data-theme="..."]`). Edit the color values there, or duplicate a block and give it a new theme name to add a 7th theme (then add a matching swatch button in `index.html`'s `.theme-dock`).

**Default theme** — `index.html`'s opening `<html data-theme="spooky">` tag sets the theme shown before a visitor picks one (or before their saved choice loads from `localStorage`).

## Notes

- Theme choice is remembered per-visitor via `localStorage` — it won't reset on refresh, but it's local to each browser, not shared across devices.
- The cursor-follow glow effect is automatically disabled on touch devices.
