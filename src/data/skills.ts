export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'design' | 'frontend' | 'backend' | 'tools';
}

export const skills: Skill[] = [
  // Design
  { name: 'User-Centered Design', level: 90, category: 'design' },
  { name: 'Design Thinking', level: 85, category: 'design' },
  { name: 'Wireframing', level: 90, category: 'design' },
  { name: 'Prototyping', level: 85, category: 'design' },

  // Frontend
  { name: 'HTML / CSS', level: 92, category: 'frontend' },
  { name: 'Next.js', level: 80, category: 'frontend' },
  { name: 'React', level: 85, category: 'frontend' },
  { name: 'TypeScript', level: 75, category: 'frontend' },

  // Backend
  { name: 'PHP', level: 70, category: 'backend' },
  { name: 'Django', level: 65, category: 'backend' },
  { name: 'Java', level: 70, category: 'backend' },
  { name: 'Kotlin', level: 65, category: 'backend' },

  // Tools
  { name: 'Figma', level: 92, category: 'tools' },
  { name: 'Git', level: 80, category: 'tools' },
  { name: 'Problem Solving', level: 88, category: 'tools' },
];
