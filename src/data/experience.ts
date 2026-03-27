export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export const experiences: Experience[] = [
  {
    id: 'bifora',
    role: 'UX / UI Design Consultant',
    company: 'Bifora Data Consulting',
    period: '2025 — 2026',
    description:
      'Designed a user-centered SaaS Recruitment Management System. Translated business needs into clear, actionable experiences in close collaboration with clients and technical teams.',
    tags: ['UX Research', 'Figma', 'SaaS', 'User-Centered Design'],
  },
  {
    id: 'fiharysoft',
    role: 'Developer & UX/UI Designer',
    company: 'FiharySoft SARL',
    period: '2024 — 2025',
    description:
      'Developed web, mobile, and desktop applications using React JS, PHP, Kotlin, and Java, with a strong focus on user experience to meet client needs.',
    tags: ['React', 'PHP', 'Kotlin', 'Java', 'UX Design'],
  },
  {
    id: 'mae',
    role: 'Web Developer',
    company: 'Ministry of Foreign Affairs',
    period: '2023',
    description:
      'Built an intuitive platform for the Malagasy diaspora, focused on fluid user experience and modern design, using React and Django REST Framework.',
    tags: ['React', 'Django', 'REST API', 'UI Design'],
  },
];
