# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

- `npm run dev` — Start Vite dev server (hot reload)
- `npm run build` — Production build via Vite
- `npm run preview` — Preview production build locally
- No test framework is configured; `npm test` is a no-op

## Architecture

React 19 SPA built with Vite 7 (JSX, no TypeScript). The app is a **Master Admin Portal** — a dashboard for managing links to external projects/sites, displayed as a bento grid of cards.

### Data Flow

- **State management**: `useSites` custom hook (`src/hooks/useSites.js`) manages all site CRUD operations with `useState` + `useEffect`
- **Persistence**: localStorage under key `master_admin_portal_sites`. No backend API — everything is client-side
- **Site schema**: `{ id, title, url, description, createdAt }` — IDs generated via `crypto.randomUUID()`

### Component Structure

- `App.jsx` — Root component; owns modal state (add/edit) and delegates CRUD via `useSites`
- `BentoGrid.jsx` — Responsive CSS grid layout (`auto-fill, minmax(320px, 1fr)`) with an "Add New Project" card
- `SiteCard.jsx` — Individual card with screenshot preview (via thum.io API), action menu (edit/delete), and click-to-open
- `ManageSiteModal.jsx` — Form modal for adding/editing sites; auto-prefixes `https://` to URLs

### Styling

- **No CSS framework** — all custom CSS with co-located component stylesheets (`.jsx` + `.css` pairs)
- **Liquid glass design system** defined in `src/index.css`:
  - `.liquid-glass` utility class provides backdrop blur, semi-transparent bg, border, and shine overlay via `::before`
  - CSS custom properties: `--glass-bg`, `--glass-border`, `--glass-reflection`, `--glass-shadow`, `--accent` (`#6ee7b7`), `--text-primary`, `--text-secondary`
- **Dark theme by default** with teal/emerald accent palette — avoid generic purple/blue colors
- Border-radius convention: `24px` for cards/modals, `12px` for inputs/buttons
- Animations use `cubic-bezier(0.175, 0.885, 0.32, 1.275)` for bouncy transitions

### External Dependencies

- `lucide-react` for icons (tree-shakeable, import individual icons)
- Screenshot thumbnails via `https://image.thum.io/get/width/800/crop/800/{url}` (no API key required)

## Deployment (Railway)

- Configured via `railway.toml` — Nixpacks builder, Node >=22.0.0
- Production server: `serve` package serves static `dist/` on Railway's dynamic `$PORT`
- No environment variables required
- Health check on `/`
- If a client-side router is added later, create `serve.json` with a catch-all rewrite to `/index.html`
