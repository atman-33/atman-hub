import type { BlogItem } from '../../../config/blogs-config';
import BlogCard from './blog-card';

interface BlogsGridProps {
  blogs: BlogItem[];
  isLoading?: boolean;
}

export function BlogsGrid({ blogs, isLoading = false }: BlogsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center max-w-7xl mx-auto">
      {isLoading
        ? Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={`skeleton-${crypto.randomUUID()}`}
                className="w-full max-w-sm animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <BlogCard isLoading />
              </div>
            ))
        : blogs.map((blog, index) => (
            <div
              key={blog.url}
              className="w-full max-w-sm animate-fade-in animate-duration-700"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <BlogCard blog={blog} />
            </div>
          ))}
    </div>
  );
}
