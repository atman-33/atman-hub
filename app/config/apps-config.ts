export interface AppItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  tags: string[];
}

export const apps: AppItem[] = [
  {
    id: '1',
    title: 'Sample App 1',
    description: 'This is a sample application',
    imageUrl: '/images/app1.png',
    demoUrl: 'https://example.com/app1',
    tags: ['React', 'TypeScript'],
  },
  {
    id: '2',
    title: 'Sample App 2',
    description: 'Another sample application',
    imageUrl: '/images/app2.png',
    demoUrl: 'https://example.com/app2',
    tags: ['Next.js', 'Tailwind'],
  },
];
