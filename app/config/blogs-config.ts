import blogsJson from '../../contents/blogs.json' with { type: 'json' };

export interface BlogItem {
  title: string;
  description: string;
  url: string;
  image?: string;
}

const resolveBlogImage = (image?: string) => {
  if (!image) {
    return undefined;
  }

  if (/^https?:\/\//.test(image)) {
    return image;
  }

  const basePath = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${basePath}${image.replace(/^\//, '')}`;
};

const blogsData = blogsJson as BlogItem[];

export const blogs = blogsData.map((blog) => ({
  ...blog,
  image: resolveBlogImage(blog.image),
}));
