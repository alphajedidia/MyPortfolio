export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export const education: Education[] = [
  {
    id: 'eni',
    institution: 'École Nationale d\'Informatique',
    degree: 'Software Engineering & Databases',
    period: '2021 — 2026',
    description:
      'Engineering degree in Software Engineering and Database Management.',
  },
  {
    id: 'sayna',
    institution: 'Sayna Academy',
    degree: 'Digital Marketing',
    period: 'Feb 2023 — Nov 2023',
    description:
      'Leveraging technology in the field of digital marketing.',
  },
  {
    id: 'huawei',
    institution: 'Huawei ICT Academy',
    degree: 'AI & Cloud Computing',
    period: '2023 — 2025',
    description:
      'Developing skills in artificial intelligence and cloud computing.',
  },
];
