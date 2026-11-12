# stack.md — IKA PBI UII Alumni Hub (prototype)

Scope: front-end prototype with **mock data and fake login** (no real authorization, no database). It must run locally and deploy to Vercel in minutes.

## Core
| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | Already created. Use server components by default; `"use client"` only for interactive parts. |
| Styling | Tailwind CSS (version from `create-next-app`) | Design tokens in `globals.css`, see `design.md`. |
| Components | shadcn/ui | `npx shadcn@latest init`, then add components as needed. |
| Special effects | Aceternity UI | Copy-paste components, only the ones listed in `design.md`. |
| Animation | `motion` | Required by many Aceternity components. |
| Icons | `lucide-react` | |
| Forms | `react-hook-form` + `zod` + shadcn `Form` | Validation for login, profile, post-a-job. |
| Toasts | `sonner` | "Job posted", "Profile saved" feedback. |
| Utilities | `clsx`, `tailwind-merge` | Installed by shadcn; also needed by Aceternity (`cn` helper). |
| Fonts | `next/font/google` | Plus Jakarta Sans, Inter. |

## Install
```bash
npx shadcn@latest init
npx shadcn@latest add button card badge input textarea select tabs dialog sheet avatar dropdown-menu table skeleton sonner form label separator
npm i motion lucide-react react-hook-form zod @hookform/resolvers
```
Aceternity components are copied from their docs into `components/ui/aceternity/` (check each component page for extra dependencies, usually `motion` and `clsx`/`tailwind-merge`).

## Folder structure
```
app/
  (site)/                # public pages, shared navbar + footer
    page.tsx             # home
    about/page.tsx       # team + values
    programs/page.tsx
    jobs/page.tsx
    jobs/[id]/page.tsx
    news/page.tsx
    news/[slug]/page.tsx
    events/page.tsx
    transparency/page.tsx
    login/page.tsx
  dashboard/             # alumni area, guarded by mock auth
    layout.tsx           # sidebar + header
    page.tsx             # overview
    profile/page.tsx
    jobs/page.tsx        # my posted jobs + post new
    mentoring/page.tsx
    events/page.tsx
components/
  ui/                    # shadcn
  ui/aceternity/         # copied effects
  site/                  # Navbar, Footer, Hero, ProgramCard, JobCard, ...
  dashboard/             # Sidebar, StatCard, forms
data/                    # mock content (TypeScript files)
  team.ts  programs.ts  jobs.ts  news.ts  events.ts  alumni.ts  ledger.ts
lib/
  auth.tsx               # mock auth context + hooks
  utils.ts               # cn()
public/
  images/                # local copies of photos (see assets.md)
```

## Mock auth (no authorization)
- Goal: a believable login flow for the demo, nothing secure.
- `lib/auth.tsx`: React context + `localStorage` key `ika-demo-user`.
  - `login(email)`: accepts **any** email/password (or a "Continue as demo alumni" button), stores a fixed demo profile.
  - `logout()`: clears it.
  - `useAuth()` returns `{ user, login, logout, ready }`.
- `app/dashboard/layout.tsx` (client): if `ready && !user` → `router.replace("/login")`. Show a skeleton while `ready` is false to avoid flicker.
- Navbar shows "Alumni Login" when logged out and an avatar menu (Dashboard, Logout) when logged in.
- Add a visible "Prototype: any login works" hint on the login page.

## Mock data
- Plain typed arrays in `/data`. Create/edit actions (post job, update profile, RSVP) update **client state only** (React state, optionally persisted to `localStorage`) and show a toast. Resets on reload is acceptable.
- Keep the data model small and typed (`type Job = {...}`) so a real API can replace it later without changing components.

## Images
- Use `next/image`. Add to `next.config.ts`:
  ```ts
  images: { remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }] }
  ```
- For the demo, download the chosen photos into `public/images/` so they work offline (see `assets.md`).

## Quality and deployment
- `npm run lint` and `npm run build` must pass before the demo.
- Deploy to Vercel (free tier) from GitHub; share the URL for the presentation. Also test the app on a phone and keep a local `npm run build && npm start` as a fallback if the venue Wi-Fi fails.
- No env vars needed for the prototype.

## Out of scope for the prototype
Real authentication, database, file uploads, payments, email/WhatsApp sending, admin panel, i18n. Mention them as "next phase" in the presentation.
