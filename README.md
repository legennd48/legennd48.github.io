# Abdulrazzaq A. Liasu — Portfolio

Next.js (App Router) + TailwindCSS project for a personal portfolio with Normal mode and Terminal mode.

## Requirements
- Node.js 20 LTS recommended
- npm v9+

## Scripts
- `npm run dev` — start dev server
- `npm run build` — build production
- `npm run start` — start production server (not used for Pages)

## Notes
- Static export is enabled via `next.config.mjs` (`output: 'export'`). After `npm run build`, static files are emitted to `out/` automatically.
- Images are unoptimized and trailing slashes are enabled for Pages compatibility.

## Next Steps
- Phase 2: Create `content/site.json`, types, and schema; render content.
- Phase 3: Build Normal mode UI.
- Phase 4: Build Terminal mode with commands, autocomplete, and history.