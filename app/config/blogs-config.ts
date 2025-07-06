export interface BlogItem {
  title: string;
  description: string;
  url: string;
  image?: string;
}

export const blogs: BlogItem[] = [
  {
    title: 'Medium Articles',
    description: 'Technical writing in English',
    url: 'https://medium.com/@gpbjk0304',
    image: `${import.meta.env.BASE_URL}images/Medium-Wordmark-Black.svg`,
  },
  {
    title: 'Zenn Articles',
    description: 'Technical writing in japanese',
    url: 'https://zenn.dev/atman',
    image: `${import.meta.env.BASE_URL}images/Zenn-logo.png`,
  },
  {
    title: 'izanami Articles',
    description: 'Technical writing in japanese',
    url: 'https://izanami.dev/user/bfdb45af-4adf-4994-aca7-595f2228fb88',
    image: `${import.meta.env.BASE_URL}images/izanami-logo.svg`,
  },
];
