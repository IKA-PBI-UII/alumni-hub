# assets.md — IKA PBI UII Alumni Hub (prototype)

We have no photos or videos yet. For the prototype, use free stock photos from Pexels (and Unsplash if more are needed). Replace them with real photos later; keep the file names so the swap is one step.

## Licence
- Pexels and Unsplash photos are free to use, including commercially, without attribution. Do not use them as a standalone file for resale, and do not imply the people shown endorse us.
- Credit the photographers on an "Image credits" line in the footer if there is time (nice to have).
- **Verification note:** these picks come from search results (titles and page URLs only). The photos were not previewed, so open each page and check that the photo suits its slot before the demo. Swap any that do not fit using the search links at the bottom.

## Rules
1. Download into `public/images/` and reference them locally (`/images/hero.jpg`), so the demo does not depend on Wi-Fi.
2. Resize to 1600px wide maximum; target under 300 KB each. Use `next/image` with `sizes`.
3. No faces of identifiable alumni or students except these stock photos; always label the site "Prototype · sample data".
4. Every image gets meaningful `alt` text (written in the table).
5. Prefer natural, warm photos with Southeast Asian or diverse people when available. Avoid stiff corporate stock.

## Image map
Page URL pattern: `https://www.pexels.com/photo/<slug>-<id>/` (the page links below work as given).
Direct file pattern: `https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=1600`

| Slot (save as) | Used on | Pexels photo (ID) | Alt text |
|---|---|---|---|
| `hero.jpg` | Home hero (behind dark overlay) | [Graduates celebrating with caps in the air (29229903)](https://www.pexels.com/photo/graduates-celebrating-with-caps-in-the-air-29229903/) | Graduates throwing their caps in the air |
| `hero-alt.jpg` | Hero alternative / About header | [People throwing graduating hats in the air (8358877)](https://www.pexels.com/photo/people-throwing-graduating-hats-in-the-air-8358877/) | Graduating students throwing their hats |
| `grads-group.jpg` | Home CTA / Login panel | [Group in black academic dress throwing caps (7942466)](https://www.pexels.com/photo/group-of-people-wearing-black-academic-dress-throwing-academic-caps-7942466/) | Group of graduates celebrating together |
| `grads-friends.jpg` | News article "Meet the new team" | [Young girls celebrating their graduation (8106555)](https://www.pexels.com/photo/young-girls-celebrating-their-graduation-8106555/) | Friends celebrating graduation |
| `grads-lawn.jpg` | Alumni / Connect card | [People in blue academic dress on green grass (5227311)](https://www.pexels.com/photo/people-in-blue-academic-dress-sitting-on-green-grass-field-5227311/) | Graduates sitting together on a lawn |
| `classroom-teacher.jpg` | Programs → Grow | [Woman teaching English in class (5427868)](https://www.pexels.com/photo/woman-teaching-english-in-class-5427868/) | Teacher leading an English class |
| `classroom-students.jpg` | Programs → English for Work | [Group of students sitting inside a classroom (5211437)](https://www.pexels.com/photo/group-of-students-sitting-inside-a-classroom-5211437/) | Students learning in a classroom |
| `classroom-smile.jpg` | About / Mission | [Teacher smiling at her students (5427998)](https://www.pexels.com/photo/teacher-smiling-at-her-students-5427998/) | Teacher smiling at her students |
| `classroom-learners.jpg` | News story: first year teaching | [Teacher with learners in classroom (18395403)](https://www.pexels.com/photo/teacher-with-learners-in-classroom-18395403/) | Teacher with learners in a classroom |
| `mentoring-talk.jpg` | Programs → Mentoring, dashboard mentoring | [Photo of men having conversation (935949)](https://www.pexels.com/photo/photo-of-men-having-conversation-935949/) | Two people talking about their career |
| `mentoring-group.jpg` | Mentoring news / event card | [Group of men having a business discussion (8344700)](https://www.pexels.com/photo/group-of-men-having-a-business-discussion-8344700/) | Small group discussing career plans |
| `event-conference.jpg` | Events header, Job fair | [Conference event meeting seminar (260920)](https://www.pexels.com/photo/conference-event-meeting-seminar-260920/) | Audience at a conference |
| `volunteers.jpg` | Programs → Give | [People volunteering (6646949)](https://www.pexels.com/photo/people-volunteering-6646949/) | Volunteers working together |
| `volunteers-group.jpg` | Give card alternative | [Volunteers sorting clothes, posing together (6995106)](https://www.pexels.com/photo/a-group-of-volunteers-sorting-clothes-into-containers-posing-together-6995106/) | Group of volunteers posing together |
| `community.jpg` | Programs → Connect, Footer CTA | [Joyful group smiling together outdoors (36851555)](https://www.pexels.com/photo/joyful-group-of-people-smiling-together-outdoors-36851555/) | A joyful group of friends outdoors |
| `jobs-laptop.jpg` | Jobs header, Programs → Earn | [Woman in a hijab working on her laptop (8154764)](https://www.pexels.com/photo/a-woman-in-a-hijab-working-on-her-laptop-8154764/) | Young professional searching for jobs on a laptop |
| `jobs-laptop-2.jpg` | Dashboard overview banner | [Woman in a hijab using a laptop and a smartphone (5206297)](https://www.pexels.com/photo/woman-in-a-hijab-using-a-laptop-and-a-smartphone-5206297/) | Alumna using a laptop and phone |
| `office-desk.jpg` | Job detail header | [Young woman in gray hijab at office desk (10347153)](https://www.pexels.com/photo/young-woman-in-gray-hijab-sitting-at-office-desk-and-looking-away-10347153/) | Young woman at an office desk |
| `study-notes.jpg` | News / Transparency header | [Young Muslim lady taking notes with laptop in garden (6084045)](https://www.pexels.com/photo/young-muslim-lady-taking-notes-on-paper-sitting-with-laptop-in-garden-6084045/) | Student taking notes with a laptop |
| `computer-class.jpg` | Data & Tech / workshops | [Young woman in a computer classroom (16007661)](https://www.pexels.com/photo/young-woman-sitting-in-a-computer-classroom-and-using-a-laptop-16007661/) | Young woman using a laptop in a classroom |

Not from photos:
- **Team and alumni avatars:** initials in a coloured circle (shadcn `Avatar` fallback). No real people's photos until the team provides them.
- **Logo:** text wordmark "IKA PBI UII" in Plus Jakarta Sans plus a simple mark (a circle or speech-bubble shape in `--terra`). Replace with the official logo later.
- **Company logos in jobs:** none; use a letter badge.
- **Videos:** none for the prototype. Hero uses a still photo. If a short loop is wanted later, use Pexels videos (`https://www.pexels.com/videos/`), muted, under 5 MB, with a poster image.

## Download helper (run on your machine, inside the project)
```bash
mkdir -p public/images && cd public/images
dl() { curl -L -o "$1" "https://images.pexels.com/photos/$2/pexels-photo-$2.jpeg?auto=compress&cs=tinysrgb&w=1600"; }
dl hero.jpg 29229903
dl hero-alt.jpg 8358877
dl grads-group.jpg 7942466
dl grads-friends.jpg 8106555
dl grads-lawn.jpg 5227311
dl classroom-teacher.jpg 5427868
dl classroom-students.jpg 5211437
dl classroom-smile.jpg 5427998
dl classroom-learners.jpg 18395403
dl mentoring-talk.jpg 935949
dl mentoring-group.jpg 8344700
dl event-conference.jpg 260920
dl volunteers.jpg 6646949
dl volunteers-group.jpg 6995106
dl community.jpg 36851555
dl jobs-laptop.jpg 8154764
dl jobs-laptop-2.jpg 5206297
dl office-desk.jpg 10347153
dl study-notes.jpg 6084045
dl computer-class.jpg 16007661
```
If a download returns a tiny or HTML file, open the photo's page above and download it manually, then rename it to the slot name.

## Where to find replacements
- Pexels: [graduation](https://www.pexels.com/search/graduation%20cap/), [English class](https://www.pexels.com/search/english%20class/), [mentoring](https://www.pexels.com/search/mentoring/), [career fair](https://www.pexels.com/search/career%20fair/), [networking event](https://www.pexels.com/search/networking%20event/), [volunteering](https://www.pexels.com/search/volunteering/)
- Unsplash: [graduates](https://unsplash.com/s/photos/graduates), [English class](https://unsplash.com/s/photos/english-class), [language learning](https://unsplash.com/s/photos/language-learning), [young professionals](https://unsplash.com/s/photos/young-professionals), [office meeting](https://unsplash.com/s/photos/office-meeting). Avoid photos labelled "Unsplash+"; those are not free.

## Later (after the prototype)
Replace stock with real photos of PBI UII events, alumni (with written consent), and the department. Keep the same file names so no code changes are needed. Store originals in a shared drive, not in the repo.
