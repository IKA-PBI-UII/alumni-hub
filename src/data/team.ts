export type TeamMember = {
  name: string;
  position: string;
  line: string;
  track: "Lead" | "Program Master" | "Project Manager" | "Squad";
  photo: string;
  /** Full name with degrees, as in the SK. */
  fullName: string;
  /** Longer description shown in the profile sheet. */
  description: string;
  /** Team area; members sharing one appear under "Works with". */
  group: "Core team" | "Partnerships & Research" | "Data & Tech" | "Communications & Digital" | "Events & Community";
};

export const TEAM_TERM = "2026 – 2031";

export const team: TeamMember[] = [
  { name: "Dea", position: "Lead", line: "Sets direction, makes final calls and tracks results openly.", track: "Lead", photo: "/team/avatars/dea.jpg",
    fullName: "Safira Ardya Pelita Fadila, S.Pd.",
    group: "Core team",
    description: "Sets the direction, makes final decisions and tracks program and financial results openly with the whole team.",
  },
  { name: "Yayak", position: "Program Master of Operations", line: "Runs daily operations and is our main link to the study program.", track: "Program Master", photo: "/team/avatars/yayak.jpg",
    fullName: "Al Hidayatul Qorni Untung Pratama, S.Pd., M.Pd.",
    group: "Core team",
    description: "Runs day-to-day activities, schedules and cross-team communication so every program stays fast, tidy and on time. Is the main contact for the PBI UII study program and other alumni, and keeps those relationships strong.",
  },
  { name: "Andi", position: "Program Master of Documentation, Stories & Da'wah", line: "Keeps our records, writes alumni stories and leads da'wah activities.", track: "Program Master", photo: "/team/avatars/andi.jpg",
    fullName: "Andi Putrado, S.Pd.",
    group: "Core team",
    description: "Keeps records, minutes and event documentation, writes alumni stories for publication, and leads da'wah activities for alumni, such as religious study sessions and reflections.",
  },
  { name: "Chintya", position: "Program Master of Finance & Reporting", line: "Records every rupiah and publishes open financial reports.", track: "Program Master", photo: "/team/avatars/chintya.jpg",
    fullName: "Chintya Arlita, S.Pd., M.Ed.",
    group: "Core team",
    description: "Records all income and spending and publishes financial reports that every alumnus and sponsor can see.",
  },
  { name: "Hanif", position: "Program Master of Partnerships & Research", line: "Researches alumni needs, builds partnerships and runs career programs.", track: "Program Master", photo: "/team/avatars/hanif.jpg",
    fullName: "Miftah Haniful Ammar, S.Pd.",
    group: "Partnerships & Research",
    description: "Leads research on alumni needs and the job market, builds partnerships with sponsors, employers and schools based on those findings, and runs the job fair and career programs.",
  },
  { name: "Naufal", position: "Squad Member, Partnerships & Research", line: "Scouts partners and prepares proposals and pitch materials.", track: "Squad", photo: "/team/avatars/naufal.jpg",
    fullName: "Naufal Mufatih, S.Pd.",
    group: "Partnerships & Research",
    description: "Supports the Partnerships & Research lead by researching alumni needs, building a list of prospective sponsors, employers and partner schools, and preparing proposals, pitch materials and follow-up notes.",
  },
  { name: "Izam", position: "Program Master of Data & Tech", line: "Manages alumni data and builds the one-stop site.", track: "Program Master", photo: "/team/avatars/izam.jpg",
    fullName: "Mohammad Izam Ghali, S.Pd.",
    group: "Data & Tech",
    description: "Manages alumni data and surveys, and builds the one-stop site: directory, jobs, mentoring, dashboard and analytics.",
  },
  { name: "Fiqri", position: "Program Master of Communications & Digital", line: "Runs social media and publications, our voice online.", track: "Program Master", photo: "/team/avatars/fiqri.jpg",
    fullName: "Muhammad Fiqri Ramadhan, S.Pd.",
    group: "Communications & Digital",
    description: "Runs social media, content and publications, and is the organization's voice online.",
  },
  { name: "Aura", position: "Squad Member, Communications & Digital", line: "Creates content, writes the newsletter and documents events.", track: "Squad", photo: "/team/avatars/aura.jpg",
    fullName: "Auracinta Dewakanya, S.Pd.",
    group: "Communications & Digital",
    description: "Supports the Communications lead by creating and scheduling content, writing the newsletter and alumni stories, and documenting events.",
  },
  { name: "Vika", position: "Program Master of Events & Community", line: "Leads alumni events, mentoring and the wider alumni community.", track: "Program Master", photo: "/team/avatars/vika.jpg",
    fullName: "Vika Anisa Gusnadilla, S.Pd., Gr.",
    group: "Events & Community",
    description: "Leads the Events & Community team: alumni events, mentoring, office hours and wellbeing talks, mostly online.",
  },
  { name: "Aul", position: "Squad Member, Events & Community", line: "Helps design mentoring, consultations and wellbeing discussions.", track: "Squad", photo: "/team/avatars/aul.jpg",
    fullName: "Aulia Oktri Syafila, S.Pd., M.Psi.",
    group: "Events & Community",
    description: "Supports Vika in designing mentoring, alumni consultations and wellbeing discussions.",
  },
  { name: "Aufa", position: "Squad Member, Events & Community", line: "Plans reunions, talkshows and job fairs, and keeps regional communities active.", track: "Squad", photo: "/team/avatars/aufa.jpg",
    fullName: "Aufa Niamilah, S.Pd.",
    group: "Events & Community",
    description: "Supports Vika by planning and running events (reunions, talkshows, job fair) and keeping regional alumni communities active.",
  },
];

export const values = [
  {
    name: "Lean",
    line: "Small team, simple tools, no waste.",
    detail: "We do a few things well and drop what does not help alumni.",
  },
  {
    name: "Transparent",
    line: "Income and spending published.",
    detail: "Every rupiah in and out sits in an open ledger anyone can read.",
  },
  {
    name: "Fast",
    line: "Decide quickly, ship small.",
    detail: "We test ideas in weeks, learn in public and improve as we go.",
  },
] as const;

export const roadmap = [
  { when: "First 90 days", items: ["Alumni survey", "Simple hub", "First talkshow"] },
  { when: "Year 1", items: ["Mentoring pilot", "Job fair", "English-for-work"] },
  { when: "Year 2", items: ["Full platform"] },
  { when: "Year 3", items: ["Independence"] },
];
