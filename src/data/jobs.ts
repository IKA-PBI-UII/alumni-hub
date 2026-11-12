export const JOB_TYPES = ["Full-time", "Part-time", "Internship", "Freelance"] as const;
export const JOB_FIELDS = ["Education", "Corporate", "Tech", "Media", "Other"] as const;
export const JOB_LOCATIONS = ["Yogyakarta", "Jakarta", "Remote", "Other"] as const;

export type JobType = (typeof JOB_TYPES)[number];
export type JobField = (typeof JOB_FIELDS)[number];

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  field: JobField;
  postedAt: string; // ISO date
  deadline?: string;
  description: string;
  requirements: string[];
  apply: { kind: "email" | "link"; value: string };
  postedBy?: { name: string; classOf: number };
  status: "Active" | "Closed";
};

/** Maps a job location to the filter bucket. */
export function locationBucket(location: string) {
  return (JOB_LOCATIONS as readonly string[]).includes(location) ? location : "Other";
}

/** Sample jobs. Fictional companies only. */
export const jobs: Job[] = [
  {
    id: "english-teacher-bright-minds",
    title: "English Teacher",
    company: "Bright Minds Language Centre",
    location: "Yogyakarta",
    type: "Full-time",
    field: "Education",
    postedAt: "2026-11-03",
    deadline: "2026-11-30",
    description:
      "Bright Minds is looking for an English teacher for teen and adult classes at our Kotabaru branch. You will plan lessons, run small classes of up to 12 learners, and track progress with simple monthly reports. The team is friendly, the materials are ready, and there is a clear path to senior teacher.",
    requirements: [
      "S.Pd. in English Education or equivalent",
      "Confident spoken English (B2+ / IELTS 6.5 or similar)",
      "Comfortable teaching evenings and Saturdays",
      "Fresh graduates welcome; teaching practice counts",
    ],
    apply: { kind: "email", value: "careers@brightminds.example" },
    postedBy: { name: "Rina Kusumawati", classOf: 2016 },
    status: "Active",
  },
  {
    id: "curriculum-developer-eduspark",
    title: "Curriculum Developer",
    company: "EduSpark",
    location: "Remote",
    type: "Full-time",
    field: "Education",
    postedAt: "2026-11-01",
    deadline: "2026-12-05",
    description:
      "EduSpark builds short English courses for working adults across Indonesia. You will write unit outlines, design practice activities and review recorded lessons with our video team. You will work remotely with a small, async-first team.",
    requirements: [
      "2+ years teaching or materials writing",
      "Strong written English and attention to detail",
      "Familiar with CEFR levels",
      "Portfolio of lesson plans or materials",
    ],
    apply: { kind: "link", value: "https://eduspark.example/careers" },
    postedBy: { name: "Maya Larasati", classOf: 2020 },
    status: "Active",
  },
  {
    id: "content-writer-lumina",
    title: "Content Writer (English)",
    company: "Lumina Media",
    location: "Jakarta",
    type: "Full-time",
    field: "Media",
    postedAt: "2026-10-30",
    description:
      "Lumina Media publishes lifestyle and business stories for regional brands. You will write and edit English articles, newsletters and social captions on a weekly schedule. Editors give fast feedback, and you will learn SEO along the way.",
    requirements: [
      "Excellent written English",
      "Two or three writing samples",
      "Able to meet weekly deadlines",
      "Basic knowledge of SEO is a plus",
    ],
    apply: { kind: "email", value: "jobs@lumina.example" },
    postedBy: { name: "Bagas Pratama", classOf: 2018 },
    status: "Active",
  },
  {
    id: "customer-support-nusa-tech",
    title: "Customer Support, English",
    company: "Nusa Tech",
    location: "Remote",
    type: "Part-time",
    field: "Tech",
    postedAt: "2026-10-28",
    description:
      "Nusa Tech supports small online sellers using our payments app. You will answer English chat and email tickets from international customers in four-hour shifts. Training is provided, and strong agents move to full-time roles.",
    requirements: [
      "Clear, polite written English",
      "Stable internet and a laptop",
      "Available for four-hour shifts, five days a week",
      "Patience and a problem-solving mindset",
    ],
    apply: { kind: "link", value: "https://nusatech.example/jobs" },
    status: "Active",
  },
  {
    id: "teaching-assistant-garuda",
    title: "Teaching Assistant",
    company: "Garuda International School",
    location: "Sleman",
    type: "Internship",
    field: "Education",
    postedAt: "2026-10-25",
    deadline: "2026-11-20",
    description:
      "Garuda International School offers a six-month teaching assistant internship in our primary years programme. You will support lead teachers, run small reading groups and help prepare classroom materials. Interns receive a monthly stipend and a reference letter.",
    requirements: [
      "Final-year student or recent PBI graduate",
      "Enjoys working with children aged 6–11",
      "Good spoken English",
      "Available Monday to Friday, 7:30–15:00",
    ],
    apply: { kind: "email", value: "hr@garuda-school.example" },
    postedBy: { name: "Rina Kusumawati", classOf: 2016 },
    status: "Active",
  },
  {
    id: "translator-editor-kata",
    title: "Translator / Editor",
    company: "Kata Studio",
    location: "Remote",
    type: "Freelance",
    field: "Media",
    postedAt: "2026-10-22",
    description:
      "Kata Studio translates documents, subtitles and websites between Indonesian and English. We are building a pool of freelance translators and editors paid per project. You choose the projects that fit your schedule.",
    requirements: [
      "Native Indonesian and strong English",
      "Translation test required",
      "Experience with CAT tools is a plus",
      "Reliable with deadlines",
    ],
    apply: { kind: "link", value: "https://katastudio.example/join" },
    postedBy: { name: "Yusuf Hidayat", classOf: 2017 },
    status: "Active",
  },
  {
    id: "hr-trainee-samudra",
    title: "HR Trainee",
    company: "Samudra Group",
    location: "Jakarta",
    type: "Internship",
    field: "Corporate",
    postedAt: "2026-10-20",
    description:
      "Samudra Group's HR trainee programme rotates you through recruitment, training and employee engagement. Many tasks happen in English with regional offices. It is a good fit for graduates who want a career outside the classroom.",
    requirements: [
      "Bachelor's degree, any major",
      "Confident English for emails and meetings",
      "Organised and good with spreadsheets",
      "Able to work on-site in South Jakarta",
    ],
    apply: { kind: "email", value: "talent@samudra.example" },
    postedBy: { name: "Fajar Nugroho", classOf: 2019 },
    status: "Active",
  },
  {
    id: "ielts-instructor-preppoint",
    title: "IELTS Instructor",
    company: "PrepPoint",
    location: "Bandung",
    type: "Part-time",
    field: "Education",
    postedAt: "2026-10-16",
    description:
      "PrepPoint runs IELTS preparation classes for students planning to study abroad. You will teach evening and weekend classes using our tested curriculum. We train new instructors on speaking and writing assessment.",
    requirements: [
      "IELTS 7.5 or above (or equivalent)",
      "Teaching experience preferred",
      "Available weekday evenings or weekends",
      "Clear, encouraging feedback style",
    ],
    apply: { kind: "link", value: "https://preppoint.example/teach" },
    postedBy: { name: "Dewi Anggraini", classOf: 2015 },
    status: "Active",
  },
  {
    id: "social-media-kopi-cerita",
    title: "Social Media Specialist",
    company: "Kopi Cerita",
    location: "Yogyakarta",
    type: "Full-time",
    field: "Media",
    postedAt: "2026-10-12",
    description:
      "Kopi Cerita is a growing coffee brand with five cafés in Yogyakarta. You will plan bilingual content, shoot short videos and reply to our community. Bring your ideas; you will own the calendar.",
    requirements: [
      "Portfolio of social content",
      "Bilingual captions (Indonesian and English)",
      "Basic photo and video editing",
      "Lives in or near Yogyakarta",
    ],
    apply: { kind: "email", value: "hello@kopicerita.example" },
    status: "Active",
  },
  {
    id: "program-officer-beasiswa",
    title: "Program Officer",
    company: "Beasiswa Nusantara",
    location: "Jakarta",
    type: "Full-time",
    field: "Other",
    postedAt: "2026-10-08",
    deadline: "2026-11-15",
    description:
      "Beasiswa Nusantara manages scholarships for students from across Indonesia. You will coordinate selection rounds, run English pre-departure training and support scholars abroad. The role suits organised people who like helping others grow.",
    requirements: [
      "Bachelor's degree; education background preferred",
      "Strong English, spoken and written",
      "Event or program coordination experience",
      "Willing to travel occasionally",
    ],
    apply: { kind: "link", value: "https://beasiswa-nusantara.example/careers" },
    postedBy: { name: "Lestari Handayani", classOf: 2016 },
    status: "Active",
  },
];
