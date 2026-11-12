export type EventType = "Talkshow" | "Job Fair" | "Workshop" | "Reunion" | "Mentoring" | "Conference";

export type AlumniEvent = {
  id: string;
  title: string;
  type: EventType;
  date: string; // ISO
  time: string;
  location: string;
  online: boolean;
  description: string;
  past?: boolean;
};

/** Sample events. */
export const events: AlumniEvent[] = [
  {
    id: "talkshow-teaching-abroad",
    title: "Alumni Talkshow: Teaching Abroad",
    type: "Talkshow",
    date: "2026-11-22",
    time: "19:30 WIB",
    location: "Online (Zoom)",
    online: true,
    description:
      "Three alumni teaching in Japan, Thailand and the UAE share how they got there, what it costs and what they wish they had known.",
  },
  {
    id: "english-for-work-interview",
    title: "English-for-Work Workshop: Interview English",
    type: "Workshop",
    date: "2026-12-06",
    time: "09:00 WIB",
    location: "Online (Zoom)",
    online: true,
    description:
      "Practise answering common interview questions in English, with live feedback from alumni recruiters.",
  },
  {
    id: "mentor-meet-and-greet",
    title: "Mentor Meet & Greet",
    type: "Mentoring",
    date: "2026-12-13",
    time: "16:00 WIB",
    location: "Online (Google Meet)",
    online: true,
    description:
      "Meet the mentors in our pilot, hear how matching works and ask questions before you apply.",
  },
  {
    id: "reunion-night",
    title: "Reunion Night",
    type: "Reunion",
    date: "2027-01-17",
    time: "18:30 WIB",
    location: "Yogyakarta",
    online: false,
    description:
      "An evening of food, music and catching up with classmates across every graduation year.",
  },
  {
    id: "job-fair-2027",
    title: "Job Fair 2027",
    type: "Job Fair",
    date: "2027-02-20",
    time: "08:30 WIB",
    location: "Yogyakarta",
    online: false,
    description:
      "Schools, language centres, media and corporate employers in one hall, plus CV clinics and mock interviews.",
  },
  {
    id: "team-introduction-conference",
    title: "Team Introduction Conference",
    type: "Conference",
    date: "2026-10-18",
    time: "13:00 WIB",
    location: "Yogyakarta",
    online: false,
    description:
      "The new IKA PBI UII team introduced itself, its values and the plan for the first 90 days.",
    past: true,
  },
];

export const upcomingEvents = events.filter((e) => !e.past);
export const pastEvents = events.filter((e) => e.past);
