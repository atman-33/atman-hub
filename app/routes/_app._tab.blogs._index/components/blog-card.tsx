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
      className="group flex flex-col gap-2 rounded-lg border p-4 transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer"
    >
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="h-12 w-auto object-contain"
        />
      )}
      <h3 className="text-lg font-semibold">{blog.title}</h3>
      <p className="text-sm text-muted-foreground">{blog.description}</p>
    </a>
  );
}
