# Contributing to Legacy

This guide keeps three people building in one consistent shape.
Read it once; refer back when unsure.

## Tech Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- Motion (animation) — imported from `motion/react`
- Lucide (icons) — imported from `lucide-react`

Do not add new dependencies without team agreement. Every dependency
is something all three of us must learn and maintain.

## Folder Structure

- `src/app/` — routes, layouts, pages (Next.js App Router)
- `src/components/ui/` — small reusable building blocks (GlassCard, Button)
- `src/components/layout/` — structural pieces (Sidebar, DashboardShell)
- `src/features/` — self-contained feature modules (upload, qa, summary)
- `src/lib/` — framework-agnostic helpers and utilities
- `src/config/` — app-wide config data (nav items, feature flags)
- `src/styles/` — design tokens and shared style layers

When adding a new feature, create a folder under `src/features/`
and keep that feature's components, logic, and types inside it.

## Branching

- `main` is protected. Never commit to it directly.
- Branch off `main` for every piece of work.
- Branch naming: `type/short-description`
  - `feat/animated-intro`
  - `fix/sidebar-hover-glitch`
  - `chore/update-deps`

## Commits

We use Conventional Commits. Format: `type: description`

- `feat:` a new feature
- `fix:` a bug fix
- `style:` formatting/visual changes (no logic change)
- `refactor:` code change that isn't a feature or fix
- `chore:` tooling, config, dependencies
- `docs:` documentation

Example: `feat: add glassmorphic upload zone`

Why: consistent commit history is readable at a glance and lets us
understand project evolution without opening every diff.

## Pull Requests

1. Push your branch and open a PR into `main`.
2. CI must pass (lint, type-check, build) — it runs automatically.
3. Vercel posts a preview URL on the PR — check the UI there.
4. At least one other person reviews and approves.
5. Squash-merge into `main`.

Why we protect `main`: it must always be deployable. Everything
reaching `main` has passed CI and human review, so `main` is never broken.

## Before You Push

- Code is formatted (Prettier runs on save, or run `npm run format`).
- `npm run lint` passes.
- `npm run build` succeeds locally.
