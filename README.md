# ISO Training Portal

A private onboarding & training portal for new receptionists at ISO Skin
Cancer & Laser Clinic — 8 self-paced modules built from the clinic's
training manual, each ending in a quiz, with progress tracking and private
notes.

**New here?** Start with [SETUP.md](SETUP.md) — a non-technical, step-by-step
guide to getting this running with your own Supabase project.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS
- [Supabase](https://supabase.com) — auth, Postgres database, row-level
  security
- Branding tokens and logo lockups in [`brand/`](brand/)

## Local development

```bash
npm install
npm run dev
```

Requires a `.env.local` with your Supabase project's URL and anon key — see
[SETUP.md](SETUP.md).

## Project structure

- `src/app/(app)/modules` — module list, module reading pages, quizzes
- `src/app/(app)/progress` — a staff member's own progress & notes
- `src/app/(app)/admin` — admin dashboard (staff progress) & content editor
- `src/content/modules` — the source markdown seeded into the database
- `supabase/migrations` — database schema
- `scripts/seed.mjs` — loads the module content & starter quizzes
