import type { BlogItem } from '../../../config/blogs-config';

export default function BlogCard({ blog }: { blog: BlogItem }) {
  return (
    <div className="group flex flex-col gap-2 rounded-lg border p-4 transition-all hover:scale-[1.02] hover:shadow-md">
      <div className="flex items-center gap-2">
        {blog.platform === 'zenn' && (
          <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
            Zenn
          </span>
        )}
        {blog.platform === 'medium' && (
          <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
            Medium
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold">{blog.title}</h3>
      <p className="text-sm text-muted-foreground">{blog.description}</p>
      <a
        href={blog.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-sm font-medium text-primary hover:underline"
      >
        Read more →
      </a>
    </div>
  );
}
