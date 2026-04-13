export type ProjectCategory =
  | 'web'
  | 'mobile'
  | 'desktop'
  | 'design'
  | 'ai';

export interface Project {
  id: string;
  category: ProjectCategory;
  tags: string[];
  year: string | null;
  url: string | null;
}

export const projects: Project[] = [
  {
    id: 'diaspora-platform',
    category: 'web',
    tags: ['React', 'Django', 'REST API', 'PostgreSQL', 'Design'],
    year: '2023',
    url: null,
  },
  {
    id: 'hotelle',
    category: 'desktop',
    tags: ['Java'],
    year: '2022',
    url: 'https://github.com/alphajedidia/HotelRoomReservationSystem',
  },
  {
    id: 'inventory-management',
    category: 'web',
    tags: ['ASP.NET Core', 'C#', 'SQL Server'],
    year: '2023',
    url: 'https://github.com/alphajedidia/InventoryManagement',
  },
  {
    id: 'ultimatepay',
    category: 'mobile',
    tags: ['Kotlin', 'TypeScript', 'NestJS', 'Next.js'],
    year: '2025',
    url: null,
  },
  {
    id: 'sales-audit',
    category: 'desktop',
    tags: ['Java', 'JavaFX', 'PostgreSQL', 'Docker'],
    year: '2026',
    url: null,
  },
  {
    id: 'paperstorm',
    category: 'web',
    tags: ['Node.js', 'TypeScript', 'BullMQ', 'MongoDB', 'Redis'],
    year: '2026',
    url: 'https://github.com/alphajedidia/paperstorm',
  },
  {
    id: 'bible-sermon',
    category: 'mobile',
    tags: ['React Native', 'SQLite', 'Android', 'iOS'],
    year: '2024–2025',
    url: null,
  },
  {
    id: 'cashpointer',
    category: 'design',
    tags: ['UX/UI Design', 'Design Thinking', 'Mobile'],
    year: '2024–2025',
    url: null,
  },
  {
    id: 'ultimatepay-logo',
    category: 'design',
    tags: ['Graphic Design', 'Branding'],
    year: null,
    url: null,
  },
  {
    id: 'backoffice-cashpointer',
    category: 'design',
    tags: ['UX/UI Design', 'Web', 'Design Thinking', 'Dashboard'],
    year: '2025',
    url: null,
  },
  {
    id: 'gsb-rms',
    category: 'design',
    tags: ['UX/UI Design', 'SaaS', 'User Research', 'Web'],
    year: '2025–2026',
    url: null,
  },
  {
    id: 'mvp-izolearn',
    category: 'design',
    tags: ['UX/UI Design', 'SaaS', 'Web', 'Recruitment'],
    year: '2025',
    url: null,
  },
  {
    id: 'ai-test-tool',
    category: 'ai',
    tags: ['UX/UI Design', 'SaaS', 'Web', 'AI'],
    year: '2025',
    url: null,
  },
  {
    id: 'ux-optimization',
    category: 'design',
    tags: ['UX/UI Design', 'Web', 'UCD'],
    year: '2024',
    url: null,
  },
  {
    id: 'agri-toky',
    category: 'design',
    tags: ['UX/UI Design', 'Mobile', 'HCD'],
    year: '2025',
    url: null,
  },
  {
    id: 'izolearn-v0',
    category: 'design',
    tags: ['UX/UI Design', 'Web', 'E-Learning'],
    year: '2024',
    url: null,
  },
  {
    id: 'ounyah',
    category: 'design',
    tags: ['UX/UI Design', 'Mobile', 'Streaming'],
    year: '2024',
    url: null,
  },
  {
    id: 'init-logo',
    category: 'design',
    tags: ['Graphic Design', 'Branding'],
    year: '2023',
    url: null,
  },
  {
    id: 'qr-poster',
    category: 'design',
    tags: ['Graphic Design', 'Print', 'QR'],
    year: '2024',
    url: null,
  },
  {
    id: 'ariary-market',
    category: 'design',
    tags: ['UX/UI Design', 'Mobile', 'E-Commerce'],
    year: '2024',
    url: null,
  },
  {
    id: 'survey-redesign',
    category: 'design',
    tags: ['UX/UI Design', 'Web', 'Optimization'],
    year: '2023',
    url: null,
  },
  {
    id: 'online-print',
    category: 'design',
    tags: ['UX/UI Design', 'Web', 'Inclusive Design'],
    year: '2023–2024',
    url: null,
  },
];

export const categories: { key: ProjectCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'desktop', label: 'Desktop' },
  { key: 'design', label: 'Design' },
  { key: 'ai', label: 'AI' },
];
