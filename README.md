# Vitor Paz — Portfolio

A sleek, interactive portfolio. Dark, animated, and built to grow as Vitor ships
more work.

**Live:** https://vitorluizpaz.github.io/portfolio/

**Stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · Motion

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build → dist/
```

## Deploy

Pushing to `main` deploys to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The site is a
*project* page, so the production build uses `base: "/portfolio/"`
(see `vite.config.ts`); image paths are rebased through `src/lib/asset.ts`.

## ✨ Adding a new project

Everything in the gallery — the cards, the project count, the per-card theming —
is generated from a single array. To add a project, open
[`src/data/projects.ts`](src/data/projects.ts) and append one object:

```ts
{
  slug: "my-new-app",                       // also used as the card's id
  title: "My New App",
  tagline: "A one-line hook",
  description: "A paragraph for the card body.",
  year: "2026",
  status: "live",                           // "live" | "wip" | "archived"
  emoji: "🎯",                              // small badge on the card
  accent: ["#7c5cff", "#22d3ee"],           // two hex colors that theme the card
  tech: ["React", "TypeScript", "Tailwind"],
  highlights: ["Thing one", "Thing two"],   // 2–4 bullets
  gallery: [                                 // screenshots — 1st is the card preview,
    { src: "/shots/my-app-1.png", caption: "Landing screen" },   // all open in the
    { src: "/shots/my-app-2.png", caption: "The main feature" }, // click-to-zoom lightbox
  ],
  live: "https://...",                       // optional — adds an "Open" button
  repo: "https://github.com/...",            // optional — adds a source link
}
```

That's it. No other file needs to change. Drop the screenshots in
`public/shots/`. With no `gallery`, the card falls back to the big emoji.

### Capturing screenshots

`scripts/shoot.mjs` drives headless Chrome (via the DevTools Protocol) to
screenshot a running app — including interactive states. Start the target app's
dev server, then `node scripts/shoot.mjs`. Edit the job list at the bottom of the
script to point at your URLs and output names.

## Structure

```
src/
  data/projects.ts      ← the only file you edit to add work
  components/
    Background.tsx       mesh gradient + pointer spotlight + grid
    Cursor.tsx           custom two-part cursor (desktop only)
    Nav.tsx  Hero.tsx  Marquee.tsx
    Work.tsx  ProjectCard.tsx   ← tilting, themed project cards
    About.tsx  Contact.tsx  Footer.tsx
  App.tsx                page shell + scroll progress bar
  index.css              Tailwind theme tokens + custom utilities
```

## Notes

- Contact links in `src/components/Contact.tsx` are placeholders
  (`hello@vitorpaz.dev`, generic GitHub/LinkedIn) — swap in the real ones.
- Respects `prefers-reduced-motion` and hides the custom cursor on touch devices.
