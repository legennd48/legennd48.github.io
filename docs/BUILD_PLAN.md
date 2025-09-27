# Abdulrazzaq A. Liasu — Portfolio Rebuild Plan

This document outlines the phased plan to build a modern, performant portfolio site with two modes: Normal (default) and Terminal. Tech stack: Next.js (App Router) + TypeScript + TailwindCSS. All content will be driven from a single JSON/Markdown config for easy updates.

## Goals Recap
- Professional, minimalist portfolio with Normal mode and Terminal mode (toggle).
- Commands: `help`, `projects`, `backend`, `security`, `resume`, `contact`, `chess` with autocomplete + history.
- Content sourced from a single config file (JSON/MD) using the provided CV.
- Lightweight, fast, responsive, and accessible. Dark/Light theme toggle.

---

## Phase 0 — Repo Prep (DONE when this plan is committed)
- Keep current repo clean and ready for Next.js app scaffold.
- Record CV as `Base_Resume.md` (already present) for reference.

Deliverables
- docs/BUILD_PLAN.md (this file)

Acceptance Criteria
- Plan reviewed and approved.

---

## Phase 1 — Project Scaffold
- Initialize Next.js (App Router) with TypeScript.
- Add TailwindCSS, PostCSS, Autoprefixer.
- Base structure with minimal dependencies (avoid heavy UI libs).
- Add ESlint + Prettier config.

Artifacts
- `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.js`, `tailwind.config.ts`.
- `app/` directory with layout, page, and shared components folder.

Acceptance Criteria
- `npm run dev` starts app; base page renders.
- Lint passes; project builds with `npm run build`.

---

## Phase 2 — Content Model (Single Source of Truth)
- Create `content/site.json` to store all data: hero, contacts, skills, projects, experience, education, awards/certs.
- Keep `content/cv.md` (optional) for inline resume content; link to downloadable PDF when provided.
- Define TypeScript types and Zod schemas for validation at build-time.

Artifacts
- `content/site.json`, `content/types.ts`, `content/schema.ts`.

Acceptance Criteria
- Importing `site.json` renders example content in UI without hardcoding.
- Build fails if `site.json` violates schema (guard rails).

---

## Phase 3 — Normal Mode UI
- Components: Header (mode + theme toggles), Hero, Skills, Projects (cards), Experience (timeline/list), Education, Contact, Footer.
- Smooth, subtle animations (Tailwind transitions + minimal framer-motion for reveals).
- Download CV button (links to `/resume.pdf` placeholder until actual provided).

Artifacts
- `app/(site)/` route composing the sections.
- `components/` for reusable parts (Section, Card, Badge, IconRow, ThemeToggle, ModeToggle).
- `public/` for favicon, social image, optional `resume.pdf`.

Acceptance Criteria
- Responsive layout (mobile-first), Lighthouse Performance ≥ 95, Accessibility ≥ 95.
- Dark/Light theme toggle persists via localStorage (next-themes).

---

## Phase 4 — Terminal Mode UI/UX
- Terminal component with:
  - Input prompt, scrollback output, monospace styling.
  - Commands map: `help`, `projects`, `backend`, `security`, `resume`, `contact`, `chess`.
  - Autocomplete (Tab) + History (Arrow Up/Down).
  - Output pulls from `content/site.json` with filters (e.g., backend/security tags).
- Mode toggle button (top-right) to switch Normal ⇄ Terminal without navigation.

Artifacts
- `components/terminal/Terminal.tsx`, `components/terminal/commands.ts`.
- Shared utilities: `lib/terminal/*` for tokenizer, history, completion, formatter.

Acceptance Criteria
- All commands respond correctly; unknown commands show friendly help.
- Autocomplete cycles through matches; history recalls previous commands.
- Terminal works well on mobile (focus, keyboard, scroll).

---

## Phase 5 — Theming, SEO, and Polish
- Theming via Tailwind + CSS variables with `next-themes` (system default respected).
- SEO: metadata, OpenGraph, Twitter cards, `sitemap.xml`, `robots.txt`.
- Accessibility pass (landmarks, color contrast, focus states, ARIA where needed).

Artifacts
- `app/layout.tsx` metadata, `app/opengraph-image.tsx` (optional), `next-sitemap` config.

Acceptance Criteria
- Lighthouse SEO ≥ 90, A11y ≥ 95. Proper OG/Twitter previews.

---

## Phase 6 — Performance & Build
- Audit bundle size (analyze) and trim dependencies.
- Ensure static export compatibility (`next export`) for GitHub Pages.
- Optimize images with Next/Image and SVG where possible.

Artifacts
- `next.config.ts` tuned for static export.
- `public/` optimized assets.

Acceptance Criteria
- `npm run build && npm run export` produces `/out` for Pages.
- Lighthouse Perf ≥ 95 on key pages.

---

## Phase 7 — Deployment (GitHub Pages)
- For a user site repo (legennd48.github.io): deploy at root.
- Add GitHub Actions workflow to build and export Next.js to `out/` and publish to `gh-pages` or root (for user site, pages can serve from root `main` if desired). Safer approach: deploy from `gh-pages` branch.

Artifacts
- `.github/workflows/deploy.yml` (build + export + deploy to Pages).

Acceptance Criteria
- Automatic deploy on push to `main` (or dedicated branch) with working site at https://legennd48.github.io.

---

## Phase 8 — Content Integration (from CV)
- Parse `Base_Resume.md` and populate `content/site.json` (skills, projects, experience, education, certs, contact).
- Tag projects with `backend` / `security` as needed for terminal filters.

Acceptance Criteria
- All sections reflect the CV; links validated; typos corrected if found.

---

## Phase 9 — QA, UAT, and Handover
- Cross-browser checks (Chrome, Firefox, Safari), devices (mobile/desktop).
- Verify terminal command UX, autocomplete, history, unknown command handling.
- Final README with editing instructions (update `content/site.json` only) and local dev steps.

Artifacts
- `README.md` with maintenance guide.

Acceptance Criteria
- Sign-off after review; issues tracked and resolved.

---

## Tracking & Checkpoints
- M1: Phase 1 scaffold complete.
- M2: Phase 2 content model wired.
- M3: Phase 3 Normal mode feature-complete.
- M4: Phase 4 Terminal mode feature-complete.
- M5: Phases 5–6 polish + export ready.
- M6: Phase 7 deployed to GitHub Pages.
- M7: Phase 8 content integrated; QA done; handover.

---

## Risks & Mitigations
- GitHub Pages with Next.js: prefer static export (`next export`) and avoid server-only features.
- Mobile terminal usability: dedicate time for focus, viewport, and keyboard behavior testing.
- Data consistency: enforce schema (Zod) to prevent runtime surprises.

---

## Inputs Needed (Optional Preferences)
- Brand preferences: accent color, font pair (system defaults are fine).
- Profile photo for hero.
- Final `resume.pdf` (or we export from site’s print stylesheet later).
- Social links: confirm LinkedIn, GitHub, email (provided in CV).

---

## Notes
- CV already recorded as `Base_Resume.md` at repo root. We will convert its data into `content/site.json` during Phase 8.
- All future content edits: update `content/site.json` only; no code changes needed.
