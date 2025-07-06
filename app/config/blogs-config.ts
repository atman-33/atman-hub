export interface BlogItem {
  title: string;
  description: string;
  url: string;
  image?: string;
}

export const blogs: BlogItem[] = [
  {
    title: 'Zenn Articles',
    description: 'Technical articles and tutorials',
    url: 'https://zenn.dev/yourusername',
    image: '/images/zenn-logo.png',
  },
  {
    title: 'Medium Articles',
    description: 'Technical writing in English',
    url: 'https://medium.com/@yourusername',
    image: '/images/medium-logo.png',
  },
];
