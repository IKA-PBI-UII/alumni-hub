export type Pillar = {
  id: "grow" | "earn" | "connect" | "give" | "represent";
  name: string;
  line: string;
  activities: string[];
  related: { label: string; href: string };
  image?: { src: string; alt: string };
};

export const pillars: Pillar[] = [
  {
    id: "grow",
    name: "Grow",
    line: "Learn and be guided.",
    activities: [
      "Mentor matching",
      "Alumni office hours",
      "English-for-work workshops",
      "Wellbeing talks",
    ],
    related: { label: "Find a mentor", href: "/dashboard/mentoring" },
    image: { src: "/images/classroom-teacher.jpg", alt: "Teacher leading an English class" },
  },
  {
    id: "earn",
    name: "Earn",
    line: "Find work and income.",
    activities: ["Job board", "Job fair", "Employer partnerships", "CV and interview clinics"],
    related: { label: "Browse jobs", href: "/jobs" },
    image: { src: "/images/jobs-laptop.jpg", alt: "Young professional searching for jobs on a laptop" },
  },
  {
    id: "connect",
    name: "Connect",
    line: "Stay in the community.",
    activities: ["Reunions", "Talkshows", "Regional meetups", "Newsroom stories"],
    related: { label: "See events", href: "/events" },
    image: { src: "/images/community.jpg", alt: "A joyful group of friends outdoors" },
  },
  {
    id: "give",
    name: "Give",
    line: "Give back.",
    activities: ["Volunteering", "Teaching sessions", "Small scholarship fund (future)"],
    related: { label: "Become a mentor", href: "/dashboard/mentoring" },
    image: { src: "/images/volunteers.jpg", alt: "Volunteers working together" },
  },
  {
    id: "represent",
    name: "Represent",
    line: "Be the voice and be accountable.",
    activities: ["Open ledger", "Impact reports", "Alumni voice in the department"],
    related: { label: "Open ledger", href: "/transparency" },
  },
];

export const problemToProgram = [
  { problem: "Fresh graduates lack mentoring", program: "Mentoring", pillar: "Grow" },
  { problem: "Graduate unemployment is rising", program: "Careers & Partnerships", pillar: "Earn" },
  { problem: "English is needed in every sector", program: "English for Work", pillar: "Grow" },
  { problem: "Isolation after graduation", program: "Connect & Give", pillar: "Connect" },
];

export const hubFeatures = [
  { name: "Directory", line: "Find classmates by year, city and field.", icon: "directory" },
  { name: "Mentoring", line: "Match with alumni a few steps ahead.", icon: "mentoring" },
  { name: "Job board", line: "Openings shared by alumni and partners.", icon: "jobs" },
  { name: "Events", line: "Talkshows, workshops and reunions.", icon: "events" },
  { name: "Newsroom", line: "Alumni stories and announcements.", icon: "news" },
  { name: "Open ledger", line: "Every rupiah in and out, in the open.", icon: "ledger" },
] as const;

export const problemStats = [
  {
    figure: "7.2M",
    label: "Indonesians unemployed in May 2026",
    source: "BPS",
    href: "https://www.bps.go.id/en/pressrelease/2026/08/05/2606/unemployment-rate-was-4-65-percent---the-average-wage-of-employees-was-3-39-million-rupiah-.html",
  },
  {
    figure: "14%",
    label: "of the unemployed are university graduates",
    source: "BPS via CNBC Indonesia",
    href: "https://www.cnbcindonesia.com/news/20260806141512-4-757138/pengangguran-ri-terbanyak-lulusan-sma-tapi-porsi-sarjana-terus-naik/amp",
  },
  {
    figure: "#80",
    label: "Indonesia's global rank in English proficiency",
    source: "EF EPI",
    href: "https://www.ef.com/saen/epi/regions/asia/indonesia/",
  },
];

export const sampleStats = [
  { value: 1200, label: "alumni profiles", suffix: "" },
  { value: 85, label: "mentors", suffix: "" },
  { value: 40, label: "job posts", suffix: "" },
  { value: 12, label: "events a year", suffix: "" },
];
