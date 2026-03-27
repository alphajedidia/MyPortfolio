export type ProjectCategory =
  | 'web'
  | 'mobile'
  | 'desktop'
  | 'design'
  | 'ai'
  | 'other';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'rms-saas',
    title: 'RMS SaaS Platform',
    description: 'Recruitment Management System — a SaaS application designed with User-Centered Design principles for streamlined hiring workflows.',
    category: 'design',
    tags: ['UX/UI', 'Figma', 'SaaS', 'User Research'],
    image: '/images/projects/placeholder.jpg',
    featured: true,
  },
  {
    id: 'diaspora-platform',
    title: 'Diaspora Platform',
    description: 'Web platform for the Malagasy diaspora, built with React and Django REST Framework for seamless community engagement.',
    category: 'web',
    tags: ['React', 'Django', 'REST API', 'PostgreSQL'],
    image: '/images/projects/placeholder.jpg',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'ecommerce-app',
    title: 'E-Commerce Mobile App',
    description: 'Cross-platform mobile shopping application with intuitive UX and real-time inventory management.',
    category: 'mobile',
    tags: ['Kotlin', 'Firebase', 'UX Design'],
    image: '/images/projects/placeholder.jpg',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'inventory-desktop',
    title: 'Inventory Management System',
    description: 'Desktop application for warehouse inventory tracking with barcode scanning and reporting features.',
    category: 'desktop',
    tags: ['Java', 'JavaFX', 'MySQL'],
    image: '/images/projects/placeholder.jpg',
  },
  {
    id: 'ai-chatbot',
    title: 'AI Customer Support Bot',
    description: 'Intelligent chatbot for customer support with natural language processing and sentiment analysis.',
    category: 'ai',
    tags: ['Python', 'NLP', 'TensorFlow', 'API'],
    image: '/images/projects/placeholder.jpg',
    githubUrl: '#',
  },
  {
    id: 'portfolio-redesign',
    title: 'Brand Identity Redesign',
    description: 'Complete brand identity and website redesign for a local startup, focusing on modern aesthetics and usability.',
    category: 'design',
    tags: ['Figma', 'Branding', 'UI Design'],
    image: '/images/projects/placeholder.jpg',
  },
  {
    id: 'task-manager',
    title: 'Task Manager Pro',
    description: 'Collaborative task management web app with real-time updates, drag-and-drop boards, and team analytics.',
    category: 'web',
    tags: ['Next.js', 'TypeScript', 'WebSocket'],
    image: '/images/projects/placeholder.jpg',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'weather-app',
    title: 'Weather Forecast App',
    description: 'Beautiful weather application with animated visualizations and 7-day forecasts using OpenWeather API.',
    category: 'mobile',
    tags: ['React Native', 'API', 'Animations'],
    image: '/images/projects/placeholder.jpg',
    githubUrl: '#',
  },
  {
    id: 'school-management',
    title: 'School Management System',
    description: 'Comprehensive school management platform handling student records, grades, attendance, and parent communication.',
    category: 'web',
    tags: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    image: '/images/projects/placeholder.jpg',
  },
  {
    id: 'fitness-tracker',
    title: 'Fitness Tracker',
    description: 'Health and fitness tracking app with workout plans, progress charts, and nutrition logging.',
    category: 'mobile',
    tags: ['Kotlin', 'Room DB', 'Material Design'],
    image: '/images/projects/placeholder.jpg',
    githubUrl: '#',
  },
  {
    id: 'blog-cms',
    title: 'Headless Blog CMS',
    description: 'Content management system with markdown support, SEO optimization, and multi-author workflows.',
    category: 'web',
    tags: ['Next.js', 'MDX', 'Prisma'],
    image: '/images/projects/placeholder.jpg',
    githubUrl: '#',
  },
  {
    id: 'parking-system',
    title: 'Smart Parking System',
    description: 'IoT-based parking management system with real-time availability tracking and mobile payments.',
    category: 'other',
    tags: ['IoT', 'Python', 'React', 'MQTT'],
    image: '/images/projects/placeholder.jpg',
  },
];

export const categories: { key: ProjectCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'desktop', label: 'Desktop' },
  { key: 'design', label: 'Design' },
  { key: 'ai', label: 'AI' },
  { key: 'other', label: 'Other' },
];
