# design.md — IKA PBI UII Alumni Hub (prototype)

Goal: a demo-able prototype for tomorrow's presentation. It should look finished, feel modern and calm, and have a few moments that make people say "oh, nice". Clarity beats decoration.

## Principles
1. **Minimal first, flair second.** White space, one accent colour, big type. Add motion/effects only in 3 places: hero, programs, stats.
2. **Lean, Transparent, Fast** (our values) shape the UI: few elements per screen, honest numbers, instant-feeling interactions.
3. **Mobile first.** Many alumni will open this on a phone. Every page must work at 390px wide.
4. **Always label demo data.** A small "Prototype · sample data" tag sits in the footer and dashboard header.

## Colour (reuse the deck palette)
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#16231F` | text, dark sections, primary buttons |
| `--paper` | `#F6F3EC` | page background |
| `--sand` | `#ECE7DB` | cards, subtle sections |
| `--terra` | `#B8451A` | accent: links, highlights, key buttons |
| `--line` | `#D3CBB8` | borders |
| `--muted` | `#5E6862` | secondary text |
| `--success` | `#2F7D5B` | positive status |

- Light mode default. Dark sections (`--ink` background) allowed for hero and the stats band only. No full dark mode in the prototype.
- Accent `--terra` used sparingly: one primary CTA per screen, small highlights, hover states.
- Map tokens to shadcn CSS variables (`--background`, `--foreground`, `--primary`, `--accent`, `--border`, `--muted`) in `globals.css`.

## Typography
- Headings: **Plus Jakarta Sans** (600–800), tight tracking (`-0.02em`).
- Body/UI: **Inter** (400–600).
- Load both with `next/font/google`. No other fonts.
- Scale: hero `text-5xl md:text-7xl`, section title `text-3xl md:text-5xl`, body `text-base md:text-lg`, caption `text-sm`.

## Layout
- Container `max-w-6xl`, `px-5 md:px-8`. Section padding `py-20 md:py-28`.
- 12-column grid on desktop, single column on mobile.
- Radius: `rounded-2xl` for cards, `rounded-full` for buttons/pills. Borders 1px `--line`; shadows very soft or none.
- Sticky top navbar, translucent with backdrop blur, becomes solid after scroll.

## Responsive (mobile-first)
Write the base classes for a 390px phone, then add `sm:` / `md:` / `lg:` to scale up. Never design desktop first and patch mobile afterwards.
- **No horizontal page scroll** at 390px. Only intentional scrollers (e.g. a category chip row) may scroll sideways, and they bleed to the screen edge with `-mx-5 px-5` and hide the scrollbar.
- **Touch targets ≥ 44px** on mobile (`h-11` / `size-11`); they may shrink to 40px from `md` up.
- **Form fields use 16px text on mobile** (`text-base md:text-sm`) so iOS Safari doesn't zoom in on focus.
- **Stack, then row.** Filter bars, forms and button groups stack full-width on mobile and go side by side from `md`. Paired fields (e.g. From / To dates) sit in a 2-column grid on mobile.
- **Condense, don't cram.** If a row can't fit 390px at its worst case, show a shorter mobile version. Example: pagination is prev / "Page 2 of 9" / next on mobile, with numbered pages from `sm`.
- **Popovers and menus stay on screen.** Align to the trigger's outer edge (left control `align="start"`, right control `align="end"`) and set `collisionPadding={16}`.
- **Check at 390px, 768px and 1280px** before calling a page done.

## Components
- **shadcn/ui** for: Button, Card, Badge, Input, Textarea, Select, Tabs, Dialog, Sheet (mobile menu), Avatar, DropdownMenu, Table, Skeleton, Sonner (toasts), Form.
- **Aceternity UI**, only where noted (copy components into `components/ui/aceternity/`):
  - Hero: `Background Beams` or `Spotlight` behind the headline (subtle, low opacity).
  - Programs: `Hover Effect` cards or `Bento Grid`.
  - Stats: `Number Ticker`-style count-up (or Aceternity `Text Generate Effect` for the headline).
  - Optional: `Infinite Moving Cards` for partner/testimonial strip.
- Icons: `lucide-react` only, 1.5px stroke.

## Motion
- Library: `motion` (framer-motion). Keep durations 200–500ms, ease-out.
- Scroll reveal: fade + 12px rise, once per element.
- Respect `prefers-reduced-motion`: disable beams, tickers and reveals.
- No auto-playing video, no parallax, no carousels that move on their own except the optional logo strip.

## Imagery
- Photos are warm, natural, people-focused (see `assets.md`). Round corners, no heavy filters.
- Apply a consistent treatment: `object-cover`, 4:3 or 16:9 crops, subtle `ink` gradient overlay (20–40%) when text sits on top.
- Team members: initials avatars until real photos exist.

## Page-by-page feel
- **Home:** dark hero with one sentence + two buttons; light sections below; stats band in dark; ends with a strong CTA.
- **Programs:** bento grid, one card per pillar, each with icon, one line, example activity.
- **Jobs / News / Events:** clean lists with filters; cards with generous spacing.
- **Dashboard:** quiet, tool-like. Left sidebar (collapses to a sheet on mobile), light surface, tables and forms with minimal ornament.

## Accessibility and quality bar
- Contrast AA minimum (check `--terra` on `--paper` for text; use `--ink` for body text).
- Visible focus rings, semantic HTML, alt text on every image, keyboard-usable dialogs.
- Lighthouse performance 90+ on home; use `next/image` with sizes and priority on the hero image only.
