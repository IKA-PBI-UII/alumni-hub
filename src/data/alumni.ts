export type DemoUser = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  classOf: number;
  jobTitle: string;
  company: string;
  city: string;
  isMentor: boolean;
};

/** The logged-in demo alumna. Fictional. */
export const demoUser: DemoUser = {
  id: "sari-wulandari",
  name: "Sari Wulandari",
  nickname: "Sari",
  email: "sari.demo@ikapbi-uii.example",
  classOf: 2021,
  jobTitle: "English Teacher",
  company: "Bright Minds Language Centre",
  city: "Yogyakarta",
  isMentor: true,
};

export type Alumnus = {
  id: string;
  name: string;
  classOf: number;
  jobTitle: string;
  company: string;
  city: string;
  skills: string[];
  isMentor: boolean;
  mentorField?: string;
  availability?: string;
};

/** ~12 fictional alumni (sample). No real people. */
export const alumni: Alumnus[] = [
  {
    id: "rina-kusumawati",
    name: "Rina Kusumawati",
    classOf: 2016,
    jobTitle: "Head of Academics",
    company: "Garuda International School",
    city: "Sleman",
    skills: ["Curriculum design", "Teacher training", "Cambridge syllabus"],
    isMentor: true,
    mentorField: "School leadership",
    availability: "2 sessions / month",
  },
  {
    id: "bagas-pratama",
    name: "Bagas Pratama",
    classOf: 2018,
    jobTitle: "Content Lead",
    company: "Lumina Media",
    city: "Jakarta",
    skills: ["Copywriting", "Editing", "SEO"],
    isMentor: true,
    mentorField: "Media & writing",
    availability: "Weekday evenings",
  },
  {
    id: "dewi-anggraini",
    name: "Dewi Anggraini",
    classOf: 2015,
    jobTitle: "IELTS Examiner & Trainer",
    company: "PrepPoint",
    city: "Bandung",
    skills: ["IELTS", "Assessment", "Public speaking"],
    isMentor: true,
    mentorField: "Test prep & assessment",
    availability: "1 session / week",
  },
  {
    id: "fajar-nugroho",
    name: "Fajar Nugroho",
    classOf: 2019,
    jobTitle: "HR Business Partner",
    company: "Samudra Group",
    city: "Jakarta",
    skills: ["Recruitment", "Interview coaching", "CV review"],
    isMentor: true,
    mentorField: "Careers outside teaching",
    availability: "Saturdays",
  },
  {
    id: "maya-larasati",
    name: "Maya Larasati",
    classOf: 2020,
    jobTitle: "Instructional Designer",
    company: "EduSpark",
    city: "Remote",
    skills: ["E-learning", "Storyboarding", "Canva"],
    isMentor: true,
    mentorField: "EdTech",
    availability: "2 sessions / month",
  },
  {
    id: "yusuf-hidayat",
    name: "Yusuf Hidayat",
    classOf: 2017,
    jobTitle: "Freelance Translator",
    company: "Self-employed",
    city: "Yogyakarta",
    skills: ["Translation", "Subtitling", "CAT tools"],
    isMentor: true,
    mentorField: "Freelancing",
    availability: "Flexible",
  },
  {
    id: "nadia-putri",
    name: "Nadia Putri",
    classOf: 2022,
    jobTitle: "Social Media Specialist",
    company: "Kopi Cerita",
    city: "Yogyakarta",
    skills: ["Instagram", "Video editing", "Community"],
    isMentor: false,
  },
  {
    id: "arif-setiawan",
    name: "Arif Setiawan",
    classOf: 2023,
    jobTitle: "Teaching Assistant",
    company: "Garuda International School",
    city: "Sleman",
    skills: ["Classroom support", "Phonics"],
    isMentor: false,
  },
  {
    id: "lestari-handayani",
    name: "Lestari Handayani",
    classOf: 2016,
    jobTitle: "Program Manager",
    company: "Beasiswa Nusantara",
    city: "Jakarta",
    skills: ["Scholarship programs", "Grant writing", "Partnerships"],
    isMentor: true,
    mentorField: "Scholarships & study abroad",
    availability: "1 session / month",
  },
  {
    id: "rizky-ramadhan",
    name: "Rizky Ramadhan",
    classOf: 2024,
    jobTitle: "Customer Support Agent",
    company: "Nusa Tech",
    city: "Remote",
    skills: ["Customer service", "Zendesk"],
    isMentor: false,
  },
  {
    id: "intan-permatasari",
    name: "Intan Permatasari",
    classOf: 2025,
    jobTitle: "Fresh graduate",
    company: "Open to work",
    city: "Yogyakarta",
    skills: ["Tutoring", "Event organising"],
    isMentor: false,
  },
  {
    id: "galih-saputra",
    name: "Galih Saputra",
    classOf: 2018,
    jobTitle: "English Lecturer",
    company: "Private university",
    city: "Semarang",
    skills: ["Academic writing", "Research", "TEFL"],
    isMentor: true,
    mentorField: "Postgraduate study",
    availability: "2 sessions / month",
  },
];

export const mentors = alumni.filter((a) => a.isMentor);
