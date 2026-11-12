export const NEWS_CATEGORIES = ["Stories", "Announcements", "Achievements", "Opportunities"] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type Article = {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  /** Plain paragraphs (sample articles). */
  body?: string[];
  /** Rich text from Payload (Lexical JSON). */
  content?: import("@payloadcms/richtext-lexical/lexical").SerializedEditorState;
  featured?: boolean;
  /** True for the built-in sample articles below. */
  sample?: boolean;
};

/** Sample articles: plausible filler text, clearly marked as sample in the UI. */
export const news: Article[] = ([
  {
    slug: "meet-the-new-team",
    title: "Meet the new IKA PBI UII team",
    category: "Announcements",
    date: "2026-11-02",
    author: "Communications & Digital",
    image: "/images/grads-friends.jpg",
    imageAlt: "Friends celebrating graduation",
    excerpt:
      "Twelve alumni, one goal: make sure nobody walks alone after graduation. Here is who we are and what we will do first.",
    featured: true,
    body: [
      "IKA PBI UII has a new team. Twelve alumni from different graduation years have stepped up to run the association for the next period, each with a clear area of responsibility.",
      "We are organised around three values: lean, transparent and fast. That means a small team, simple tools, published finances and decisions made in days rather than months.",
      "Our first 90 days focus on three things: an alumni survey so we understand where everyone is, a simple online hub (the one you are reading now), and our first talkshow.",
      "Every team member has a public role and a one-line promise. You can find all of them on the About page, along with how to reach us.",
      "If you graduated from PBI UII, claim your alumni profile. It takes two minutes and helps us connect you with mentors, jobs and each other.",
    ],
  },
  {
    slug: "first-year-teaching",
    title: "From PBI UII to the classroom: an alumna's first year teaching",
    category: "Stories",
    date: "2026-10-27",
    author: "Documentation & Alumni Stories",
    image: "/images/classroom-learners.jpg",
    imageAlt: "Teacher with learners in a classroom",
    excerpt:
      "Lesson plans that fell apart, students who surprised her, and the mentor who answered at 10 pm. A first year, honestly told.",
    body: [
      "The first week, she says, was mostly about learning names and realising that a 45-minute lesson plan can be finished in 20 minutes.",
      "What helped most was a senior alumna she met through a WhatsApp group. They talked every Sunday evening about what went well and what did not.",
      "By the second term she had built a small routine: a warm-up game, one clear target per lesson, and five minutes at the end for students to ask anything.",
      "Her advice for fresh graduates is simple: ask for help early, keep notes on what works, and do not compare your first year with someone else's fifth.",
      "This story is a sample written for the prototype. Real alumni stories will be published with consent.",
    ],
  },
  {
    slug: "mentoring-pilot-opens",
    title: "Mentoring pilot opens: be a mentor or find one",
    category: "Announcements",
    date: "2026-10-20",
    author: "Mentoring & Wellbeing",
    image: "/images/mentoring-talk.jpg",
    imageAlt: "Two people talking about their career",
    excerpt:
      "We are matching 20 pairs for a three-month pilot. Mentors give two hours a month; mentees bring one clear goal.",
    body: [
      "Our mentoring pilot pairs recent graduates with alumni who are a few years ahead in teaching, corporate, media, tech and freelance careers.",
      "Mentors commit two hours a month for three months. Mentees come with one clear goal, such as landing a first job, preparing for IELTS or switching careers.",
      "Matching is done by the Mentoring & Wellbeing team, based on goals, fields and availability. Sessions can be online or in person.",
      "After the pilot we will publish what worked, what did not, and how we will scale it.",
    ],
  },
  {
    slug: "alumni-job-fair-what-to-expect",
    title: "Alumni job fair: what to expect",
    category: "Opportunities",
    date: "2026-10-14",
    author: "Partnerships & Careers",
    image: "/images/event-conference.jpg",
    imageAlt: "Audience at a conference",
    excerpt:
      "Schools, language centres, media companies and corporates in one hall, plus CV clinics run by alumni recruiters.",
    body: [
      "The first IKA PBI UII job fair is planned for early 2027 in Yogyakarta. We are inviting schools, language centres, EdTech, media companies and corporates.",
      "Alongside employer booths there will be CV clinics and mock interviews run by alumni who work in recruitment.",
      "Bring printed CVs, a short self-introduction in English, and questions for employers. Dress smart casual.",
      "Registration opens on the Events page. Employers interested in a booth can contact the Partnerships & Careers team.",
    ],
  },
  {
    slug: "national-teaching-award",
    title: "Alumnus wins national teaching award",
    category: "Achievements",
    date: "2026-10-06",
    author: "Documentation & Alumni Stories",
    image: "/images/classroom-smile.jpg",
    imageAlt: "Teacher smiling at her students",
    excerpt:
      "Recognised for a reading programme that doubled library visits at a rural school. (Sample story.)",
    body: [
      "This is a sample achievement story for the prototype.",
      "The award recognised a reading programme that turned an unused classroom into a library corner and doubled weekly library visits within a semester.",
      "The programme relied on donated books, student reading ambassadors and a simple sticker chart that the whole school ended up joining.",
      "We will share real alumni achievements here. If you or a classmate has news, send it to the Communications team.",
    ],
  },
  {
    slug: "first-open-ledger",
    title: "How we spend: our first open ledger",
    category: "Announcements",
    date: "2026-09-29",
    author: "Finance & Reporting",
    image: "/images/study-notes.jpg",
    imageAlt: "Student taking notes with a laptop",
    excerpt:
      "Every rupiah in and out, published. Here is how the ledger works and why we do it.",
    body: [
      "Transparency is one of our three values, so we publish every rupiah that comes in and goes out.",
      "The open ledger lists the date, a short description, a category and the amount. Totals are updated whenever a new entry is added.",
      "The first entries are small: member contributions, a sponsor for the talkshow, and costs for hosting and printing.",
      "The numbers in this prototype are samples. The real ledger will go live with the full hub.",
    ],
  },
] satisfies Article[]).map((a) => ({ ...a, sample: true }));

export function getArticle(slug: string) {
  return news.find((a) => a.slug === slug);
}
