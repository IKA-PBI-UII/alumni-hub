"use client";

import { createLocalStore } from "@/lib/local-store";
import { jobs as seedJobs, type Job } from "@/data/jobs";
import { demoUser } from "@/data/alumni";

/**
 * Client-only state for the prototype. Persisted to localStorage so the demo
 * survives a page change; clearing site data resets everything.
 */

// Jobs posted by the demo user. Seeded with one post so "My posts" is not empty.
const myJobsStore = createLocalStore<Job[]>("ika-demo-jobs", [
  {
    id: "volunteer-tutor-kampung-inggris",
    title: "Volunteer English Tutor (weekends)",
    company: "Kampung Belajar Community",
    location: "Yogyakarta",
    type: "Part-time",
    field: "Education",
    postedAt: "2026-10-26",
    description:
      "A small community library is looking for weekend tutors to run English reading circles for primary school children. Sessions are two hours on Saturday mornings. Materials and snacks are provided.",
    requirements: [
      "Patient and friendly with children",
      "Available two Saturdays a month",
      "Basic lesson planning",
      "PBI students and alumni welcome",
    ],
    apply: { kind: "email", value: "sari.demo@ikapbi-uii.example" },
    postedBy: { name: demoUser.name, classOf: demoUser.classOf },
    status: "Active",
  },
]);

const savedJobsStore = createLocalStore<string[]>("ika-demo-saved", [
  "curriculum-developer-eduspark",
  "ielts-instructor-preppoint",
]);

const rsvpStore = createLocalStore<string[]>("ika-demo-rsvps", ["mentor-meet-and-greet"]);

const mentorRequestStore = createLocalStore<string[]>("ika-demo-mentor-requests", []);

export type Profile = {
  fullName: string;
  nickname: string;
  graduationYear: string;
  currentJob: string;
  company: string;
  city: string;
  bio: string;
  skills: string[];
  linkedin: string;
  showInDirectory: boolean;
  showEmail: boolean;
  openToMentor: boolean;
  openToBeMentored: boolean;
  openToHire: boolean;
};

export const defaultProfile: Profile = {
  fullName: demoUser.name,
  nickname: demoUser.nickname,
  graduationYear: String(demoUser.classOf),
  currentJob: demoUser.jobTitle,
  company: demoUser.company,
  city: demoUser.city,
  bio: "",
  skills: ["Teaching", "Lesson planning", "IELTS"],
  linkedin: "",
  showInDirectory: true,
  showEmail: false,
  openToMentor: true,
  openToBeMentored: false,
  openToHire: false,
};

const profileStore = createLocalStore<Profile>("ika-demo-profile", defaultProfile);

/** Profile completeness, 0–100. */
export function profileCompleteness(p: Profile) {
  const checks = [
    p.fullName,
    p.nickname,
    p.graduationYear,
    p.currentJob,
    p.company,
    p.city,
    p.bio,
    p.skills.length > 0,
    p.linkedin,
    true, // photo placeholder counts as set for the demo
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export const useMyJobs = myJobsStore.useValue;
export const useSavedJobs = savedJobsStore.useValue;
export const useRsvps = rsvpStore.useValue;
export const useMentorRequests = mentorRequestStore.useValue;
export const useProfile = profileStore.useValue;

/** All jobs visible on the public board: the user's active posts first, then seeds. */
export function useAllJobs(): Job[] {
  const mine = useMyJobs();
  return [...mine.filter((j) => j.status === "Active"), ...seedJobs];
}

export function useJob(id: string): Job | undefined {
  const mine = useMyJobs();
  return mine.find((j) => j.id === id) ?? seedJobs.find((j) => j.id === id);
}

export const demoActions = {
  postJob(job: Omit<Job, "id" | "postedAt" | "postedBy" | "status">) {
    const slug = job.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const id = `${slug}-${Math.random().toString(36).slice(2, 7)}`;
    const newJob: Job = {
      ...job,
      id,
      postedAt: new Date().toISOString().slice(0, 10),
      postedBy: { name: demoUser.name, classOf: demoUser.classOf },
      status: "Active",
    };
    myJobsStore.set((prev) => [newJob, ...prev]);
    return newJob;
  },
  setJobStatus(id: string, status: Job["status"]) {
    myJobsStore.set((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
  },
  deleteJob(id: string) {
    myJobsStore.set((prev) => prev.filter((j) => j.id !== id));
  },
  toggleSaved(id: string) {
    let saved = false;
    savedJobsStore.set((prev) => {
      saved = !prev.includes(id);
      return saved ? [...prev, id] : prev.filter((x) => x !== id);
    });
    return saved;
  },
  toggleRsvp(id: string) {
    let going = false;
    rsvpStore.set((prev) => {
      going = !prev.includes(id);
      return going ? [...prev, id] : prev.filter((x) => x !== id);
    });
    return going;
  },
  requestMentor(id: string) {
    mentorRequestStore.set((prev) => (prev.includes(id) ? prev : [...prev, id]));
  },
  saveProfile(p: Profile) {
    profileStore.set(p);
  },
};
