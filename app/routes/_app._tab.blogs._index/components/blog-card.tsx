import type { BlogItem } from '../../../config/blogs-config';

type BlogCardProps =
  | {
      blog: BlogItem;
      isLoading?: false;
    }
  | {
      blog?: never;
      isLoading: true;
    };

export default function BlogCard(props: BlogCardProps) {
  const { isLoading } = props;
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 rounded-lg border p-4">
        <div className="h-4 w-16 rounded bg-gray-200" />
        <div className="h-6 w-full rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>
    );
  }

  const { blog } = props;
  return (
    <a
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-xl border bg-card shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.03]"
    >
      {blog.image && (
        <div className="flex justify-center p-4 dark:bg-white">
          <img
            src={blog.image}
            alt={blog.title}
            className="h-12 w-auto object-contain"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{blog.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {blog.description}
        </p>
      </div>
    </a>
  );
}
