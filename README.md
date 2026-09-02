# IndiQuant — marketing site

The public marketing site at **[indiquantresearch.in](https://indiquantresearch.in)**.

This is **not** the participant portal. Contributors download datasets, build models and
submit predictions on `platform-frontend/`, which deploys separately to
`platform.indiquantresearch.in`. This repository explains the fund and sends people
there; the two swapped roles early on and the names never caught up.

## Stack

- **TanStack Start** (React 19, file-based routing in `src/routes/`) on **Vite 8**
- **Tailwind v4, CSS-first** — there is no `tailwind.config.js`; the theme lives in
  `src/styles.css` under `@theme inline` and `:root`
- **shadcn/ui** ("new-york") in `src/components/ui/`, largely unused — the marketing
  pages are built from the bespoke primitives in `src/components/site/`
- **three.js** for the globe (`GlobeScene`), **framer-motion** for reveals
- **bun** as the package manager

## Commands

```bash
bun install
bun run dev          # local dev server
bun run test         # node --test over src/**/*.test.ts
bun run lint         # eslint
bun run format       # prettier --write
bun run build        # SSR build (nitro)
bun run build:pages  # static build for GitHub Pages
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy-pages.yml`, which runs
`bun run build:pages` and publishes `dist/client` to GitHub Pages. The custom domain
comes from `public/CNAME`.

`build:pages` sets `GITHUB_PAGES=true`, which disables nitro and turns on prerendering
with `crawlLinks` and **`failOnError`** — a broken link or a missing asset fails the
build rather than shipping quietly. Run it locally before pushing anything that adds a
route or a file under `public/`.

## Conventions

- **Static assets** live in `public/` and are referenced by absolute path
  (`/badges/…`, `/earth/…`, `/models/…`), not by bundler import. The one exception is
  the favicon, imported with Vite's `?url` suffix in `src/routes/__root.tsx`.
- **Images** carry their intrinsic `width` and `height` as attributes so the box is
  reserved before decode, plus `loading="lazy"`, `decoding="async"` and real `alt` text.
  See `src/components/site/AwardBadge.tsx` for the reference implementation.
- **External links** always use `target="_blank" rel="noopener noreferrer"`.
- The site is **permanently dark**. There is no theme toggle and no `.dark` class is
  ever applied — the `@custom-variant dark` in `src/styles.css` is shadcn boilerplate.
  Anything placed on the ink ground needs to work there without a light variant.
- Motion respects `prefers-reduced-motion`, in CSS (`iq-marquee`) and in JS
  (`Reveal` bails out via `useReducedMotion`).

See `CLAUDE.md` for the architectural guardrails — chiefly that this layer renders
backend-supplied state and never becomes a second source of truth.
