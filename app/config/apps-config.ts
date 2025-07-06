export interface AppItem {
  title: string;
  icon?: string; // Change to string for URL
  description: string;
  imageUrl: string;
  demoUrl: string;
  tags: string[];
}

export const apps: AppItem[] = [
  {
    title: 'Sample App 1',
    icon: '/icons/github.svg', // Placeholder for icon URL
    description:
      'This is a sample application xxxxxxxx xxxxxxxxxxx xxxxxxxxxxx xxxxxxxxxxxx',
    imageUrl: '/images/app1.png',
    demoUrl: 'https://example.com/app1',
    tags: ['React', 'TypeScript'],
  },
  {
    title: 'Sample App 2',
    icon: '/icons/x.svg', // Placeholder for icon URL
    description: 'Another sample application',
    imageUrl: '/images/app2.png',
    demoUrl: 'https://example.com/app2',
    tags: ['Next.js', 'Tailwind'],
  },
  {
    title: 'Sample App 3',
    icon: '/icons/github.svg', // Placeholder for icon URL
    description: 'Another sample application xxxxxxxxxxxxxxxxxxxxxxx',
    imageUrl: '/images/app2.png',
    demoUrl: 'https://example.com/app2',
    tags: ['Next.js', 'Tailwind'],
  },
  {
    title: 'Sample App 4',
    icon: '/icons/x.svg', // Placeholder for icon URL
    description: 'Another sample application',
    imageUrl: '/images/app2.png',
    demoUrl: 'https://example.com/app2',
    tags: ['Next.js', 'Tailwind'],
  },
];
