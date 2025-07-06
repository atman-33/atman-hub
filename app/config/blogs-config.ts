export interface BlogItem {
  title: string;
  description: string;
  platform: 'zenn' | 'medium' | 'other';
  url: string;
  image?: string;
}

export const blogs: BlogItem[] = [
  {
    title: 'Zenn Articles',
    description: 'Technical articles and tutorials',
    platform: 'zenn',
    url: 'https://zenn.dev/yourusername',
    image: '/images/zenn-logo.png',
  },
  {
    title: 'Medium Articles',
    description: 'Technical writing in English',
    platform: 'medium',
    url: 'https://medium.com/@yourusername',
    image: '/images/medium-logo.png',
  },
];
