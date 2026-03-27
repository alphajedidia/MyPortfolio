# Portfolio — Alpha Jedidia R.

## Overview
Minimalist portfolio website for a UX/UI Designer & Software Engineer. Project-first design — the portfolio showcases ~35 projects as the main feature.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: SASS modules (no Tailwind)
- **Animations**: Framer Motion (subtle, smooth)
- **i18n**: next-intl (English, French, German)
- **Deployment**: Render

## Architecture
- Content is decoupled from components — all text/data lives in `/src/data/` as TypeScript files
- Translations live in `/src/messages/` as JSON (en.json, fr.json, de.json)
- SASS modules are co-located with components
- Theme (light/dark) managed via CSS custom properties + React context

## Sections
1. Hero — name, title, short intro
2. About — profile summary
3. Projects — filterable grid (MAIN FEATURE)
4. Experience — timeline
5. Skills — visual display
6. Education — cards
7. Contact — links only (LinkedIn, GitHub, email)

## Content Editing
To modify content, edit files in:
- `/src/data/projects.ts` — project list
- `/src/data/experience.ts` — work experience
- `/src/data/education.ts` — education entries
- `/src/data/skills.ts` — skills list
- `/src/messages/*.json` — UI translations

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm start` — start production server

## Design Principles
- Minimalist but memorable
- Light theme default, dark mode toggle
- Smooth scroll animations (subtle, not flashy)
- Mobile-first responsive design
- Typography-driven layout
