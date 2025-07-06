import { blogs } from '~/config/blogs-config';
import type { Route } from './+types/route';
import { BlogsGrid } from './components/blogs-grid';

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'AtmanHub - Blogs' },
    { name: 'description', content: 'My technical blog posts' },
  ];
}

export default function BlogsIndex() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">My Blog Posts</h1>
      <BlogsGrid blogs={blogs} />
    </div>
  );
}
