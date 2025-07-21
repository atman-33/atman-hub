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
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4 tracking-tight">
          My Blog Posts
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Insights and thoughts from my journey in software development
        </p>
      </div>
      <BlogsGrid blogs={blogs} />
    </div>
  );
}
