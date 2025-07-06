import type { BlogItem } from '../../../config/blogs-config';
import BlogCard from './blog-card';

interface BlogsGridProps {
  blogs: BlogItem[];
  isLoading?: boolean;
}

export function BlogsGrid({ blogs, isLoading = false }: BlogsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
      {isLoading
        ? Array(6)
            .fill(0)
            .map((_, _i) => (
              <div
                key={`skeleton-${crypto.randomUUID()}`}
                className="h-[200px] w-[280px]"
              >
                <BlogCard isLoading />
              </div>
            ))
        : blogs.map((blog) => (
            <div key={blog.url} className="h-[200px] w-[280px]">
              <BlogCard blog={blog} />
            </div>
          ))}
    </div>
  );
}
