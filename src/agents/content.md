# content.md — IKA PBI UII Alumni Hub (prototype)

All copy and sample data for the prototype. Everything marked **(sample)** is placeholder and must be labelled as sample data in the UI. Language: English (Indonesian toggle is out of scope).

**Org:** IKA PBI UII, the alumni association of English Education (Pendidikan Bahasa Inggris), Universitas Islam Indonesia.
**Tagline:** *Nobody walks alone after graduation.*
**Values:** Lean · Transparent · Fast

## Priorities
- **P0 (must have for tomorrow):** Home, Programs, About/Team, Jobs (list + detail), News (list), Login, Dashboard overview + Post a job + Profile.
- **P1:** Events, Transparency, News detail, Dashboard Mentoring + Events.
- **P2:** Dashboard extras (saved jobs, notifications), search.

## Navigation
- Public navbar: Programs · Jobs · News · Events · About · **Alumni Login** (button).
- Footer: org name, short description, links (Transparency, About), contact placeholder (`hello@ikapbi-uii.example`), "Prototype · sample data".
- Dashboard sidebar: Overview · My Profile · Jobs · Mentoring · Events · Log out.

---

## 1. Home `/`
1. **Hero** (dark): headline *"Your alumni network, in one place."* Sub: *"Mentoring, jobs, events and stories from IKA PBI UII. Built lean, run transparently, moving fast."* Buttons: **Join as alumni** (→ `/login`), **See programs** (→ `/programs`).
2. **The problem** (3 cards, sourced figures):
   - *7.2M* Indonesians unemployed in May 2026 (BPS).
   - *14%* of the unemployed are graduates (BPS data via CNBC Indonesia).
   - *#80* Indonesia's global rank in English proficiency (EF EPI).
   Caption: *"Graduates need guidance, connections and better English. Alumni already have the answers."*
3. **Five pillars** (bento grid, links to `/programs`): Grow, Earn, Connect, Give, Represent.
4. **One-stop hub** (feature preview): Directory · Mentoring · Job board · Events · Newsroom · Open ledger. One line each.
5. **Latest** (3 jobs, 3 news, next event).
6. **Stats band** (dark, count-up, **sample**): 1,200 alumni profiles · 85 mentors · 40 job posts · 12 events a year.
7. **Values**: Lean, Transparent, Fast with one sentence each.
8. **CTA**: *"Graduated from PBI UII? Claim your alumni profile."* Button → `/login`.

## 2. Programs `/programs`
Intro: *"Five pillars that follow an alumnus's whole journey."*

| Pillar | One-liner | Example activities |
|---|---|---|
| **Grow** | Learn and be guided. | Mentor matching, alumni office hours, English-for-work workshops, wellbeing talks |
| **Earn** | Find work and income. | Job board, job fair, employer partnerships, CV and interview clinics |
| **Connect** | Stay in the community. | Reunions, talkshows, regional meetups, newsroom stories |
| **Give** | Give back. | Volunteering, teaching sessions, small scholarship fund (future) |
| **Represent** | Be the voice and be accountable. | Open ledger, impact reports, alumni voice in the department |

Each pillar card: icon, one-liner, 3 bullets, "Related" link (e.g. Earn → `/jobs`).
Below: **Problem → Program** table: fresh grads lack mentoring → Mentoring; unemployment → Careers & Partnerships; English needed in every sector → English for Work; isolation after graduation → Connect & Give.

## 3. About / Team `/about`
- **Mission:** *"Connect every PBI UII alumnus with guidance, opportunity and each other."*
- **Values** (3 cards): Lean (small team, simple tools, no waste); Transparent (income and spending published); Fast (decide quickly, ship small).
- **Team** (cards with initials avatar, name, position, one line). Positions use the blueprint titles:

| Name | Position | Line |
|---|---|---|
| Dea | Lead | Sets direction and keeps results visible. |
| Yayak | Program Master of Operations | Keeps programs fast, tidy and on time. |
| Andi | Program Master of Documentation & Alumni Stories | Records our work and tells alumni stories. |
| Chintya | Program Master of Finance & Reporting | Publishes every rupiah in and out. |
| Hanif | Program Master of Partnerships & Careers | Builds partnerships and runs the job fair. |
| Izam | Program Master of Data & Tech | Builds the hub and looks after alumni data. |
| Fiqri | Program Master of Communications & Digital | The voice of IKA PBI UII online. |
| Vika | Program Master of Mentoring & Wellbeing | Leads mentoring and wellbeing talks. |
| Aufa | Project Manager of Events & Community | Plans reunions, talkshows and meetups. |
| Naufal | Squad Member, Data & Research | Cleans data and prepares simple analytics. |
| Aura | Squad Member, Communications & Digital | Creates content and documents events. |
| Aul | Squad Member, Mentoring & Wellbeing | Helps design mentoring and consultations. |

- Optional section: *"Roles and positions"*: fixed vs rotating (small diagram or two columns).
- Timeline strip: **First 90 days** (alumni survey, simple hub, first talkshow) → **Year 1** (mentoring pilot, job fair, English-for-work) → **Year 2** (platform) → **Year 3** (independence).

## 4. Jobs `/jobs` and `/jobs/[id]`
- **List:** search box; filters: type (Full-time, Part-time, Internship, Freelance), field (Education, Corporate, Tech, Media, Other), location (Yogyakarta, Jakarta, Remote, Other). Job card: title, company, location, type badge, posted date, "Posted by alumnus" badge when relevant. Empty state: *"No jobs match your filters."*
- **Detail:** title, company, meta row, description, requirements (bullets), how to apply (external link or email placeholder), poster card, **Apply** button (opens dialog with toast "Prototype: application not sent"), Share.
- **Sample jobs (10):**

| Title | Company | Location | Type | Field |
|---|---|---|---|---|
| English Teacher | Bright Minds Language Centre (sample) | Yogyakarta | Full-time | Education |
| Curriculum Developer | EduSpark (sample) | Remote | Full-time | Education |
| Content Writer (English) | Lumina Media (sample) | Jakarta | Full-time | Media |
| Customer Support, English | Nusa Tech (sample) | Remote | Part-time | Tech |
| Teaching Assistant | Garuda International School (sample) | Sleman | Internship | Education |
| Translator / Editor | Kata Studio (sample) | Remote | Freelance | Media |
| HR Trainee | Samudra Group (sample) | Jakarta | Internship | Corporate |
| IELTS Instructor | PrepPoint (sample) | Bandung | Part-time | Education |
| Social Media Specialist | Kopi Cerita (sample) | Yogyakarta | Full-time | Media |
| Program Officer | Beasiswa Nusantara (sample) | Jakarta | Full-time | Other |

Write a 3-sentence description and 4 requirement bullets for each (generic, no real companies).

## 5. News `/news` and `/news/[slug]`
- **List:** featured story on top, then a grid; category filter: Stories, Announcements, Achievements, Opportunities.
- **Detail:** hero image, title, date, author, category, 4–6 short paragraphs, "Related" cards.
- **Sample articles (6):**
  1. *Meet the new IKA PBI UII team* (Announcement)
  2. *From PBI UII to the classroom: an alumna's first year teaching* (Story)
  3. *Mentoring pilot opens: be a mentor or find one* (Announcement)
  4. *Alumni job fair: what to expect* (Opportunities)
  5. *Alumnus wins national teaching award* (Achievement, **sample**)
  6. *How we spend: our first open ledger* (Announcement)
  Use plausible filler text, clearly sample.

## 6. Events `/events`
- Tabs: **Upcoming** / **Past**. Card: date block, title, type badge (Talkshow, Job Fair, Workshop, Reunion, Mentoring), location (online or city), RSVP button (toast + button changes to "You're going").
- **Sample events:** Alumni Talkshow: Teaching Abroad (online); Job Fair 2027 (Yogyakarta); English-for-Work Workshop: Interview English (online); Reunion Night (Yogyakarta); Mentor Meet & Greet (online). Past: Team Introduction Conference.

## 7. Transparency `/transparency` (P1)
- *"Every rupiah, in the open."* Summary cards (sample): income, spending, balance. A simple table: date · description · category · amount · type. Note: *"Sample numbers for the prototype."* Optional bar chart by category (shadcn charts or a simple CSS bar).

## 8. Login `/login`
- Split layout: left brand panel with photo and tagline; right form.
- Fields: email, password, "Remember me". Buttons: **Log in** and **Continue as demo alumni**.
- Hint text: *"Prototype: any email and password works."*
- On success → `/dashboard` with toast "Welcome back, Sari".
- Links "Forgot password" and "Create account" are visible but non-functional (toast "Coming soon").

## 9. Alumni dashboard `/dashboard/*`
Demo user: **Sari Wulandari**, PBI UII class of 2021, English Teacher at Bright Minds (sample), Yogyakarta. Mentor: yes.

- **Overview:** greeting; profile completeness bar (e.g. 70%) with "Complete profile" button; quick actions (Post a job, Find a mentor, Browse events); cards: *Recommended jobs* (3), *Upcoming events you can join* (2), *Mentoring status*, *Latest news* (2); activity list (sample).
- **My Profile:** form with photo placeholder, full name, nickname, graduation year, current job, company, city, short bio, skills (tag input), LinkedIn URL, privacy toggles (show in directory, show email, open to mentor, open to be mentored, open to hire). Save → toast.
- **Jobs:** tabs *My posts* / *Saved*; **Post a job** button → dialog or page form (title, company, location, type, field, description, requirements, apply link, deadline); new posts appear instantly in "My posts" and in `/jobs` (client state). Status badge (Active / Closed), Close and Delete actions.
- **Mentoring:** tabs *Find a mentor* / *Become a mentor* / *My sessions*. Mentor cards (name, field, skills, availability, "Request" button). "Become a mentor" form: focus areas, hours per month, languages. Sample sessions list.
- **Events:** RSVPs list, "Submit an event idea" form.
- *(P2 ideas)* Alumni directory search; notifications; share story submission ("Tell your story" → feeds the newsroom).

## 10. Sample alumni and mentors (data/alumni.ts)
Create ~12 fictional alumni with names, graduation year (2015–2025), job title, city, skills and a flag `isMentor`. Use obviously fictional names and **do not** use the real team's data or any real person's details.

## Microcopy
- Buttons: *Join as alumni, See programs, Post a job, Request a mentor, RSVP, Save changes.*
- Toasts: *"Profile saved", "Job posted", "You're going", "Prototype: not sent".*
- Empty states: short, friendly, with an action.
- Footer note on every page: *Prototype · sample data.*

## Sources for the figures on the home page
- [BPS press release, 5 Aug 2026: unemployment 4.65% in May 2026](https://www.bps.go.id/en/pressrelease/2026/08/05/2606/unemployment-rate-was-4-65-percent---the-average-wage-of-employees-was-3-39-million-rupiah-.html)
- [CNBC Indonesia, 6 Aug 2026: graduates' share of the unemployed](https://www.cnbcindonesia.com/news/20260806141512-4-757138/pengangguran-ri-terbanyak-lulusan-sma-tapi-porsi-sarjana-terus-naik/amp)
- [EF English Proficiency Index: Indonesia](https://www.ef.com/saen/epi/regions/asia/indonesia/)

Note: "7.2M" is CNBC's reading of the BPS data; "14%" means graduates make up 14% of the unemployed (not 14% of graduates).
