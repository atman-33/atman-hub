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
      <div className="glass glow-on-hover rounded-2xl p-6 border-white/20 backdrop-blur-md">
        <div className="space-y-4">
          <div className="h-4 w-16 rounded-full bg-white/20" />
          <div className="h-6 w-full rounded bg-white/20" />
          <div className="h-4 w-full rounded bg-white/20" />
          <div className="h-4 w-24 rounded bg-white/20" />
        </div>
      </div>
    );
  }

  const { blog } = props;
  return (
    <a
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass glow-on-hover rounded-2xl border-white/20 backdrop-blur-md overflow-hidden transition-all duration-500 hover:scale-105 hover:-rotate-1 block"
    >
      {/* Header with platform logo */}
      {blog.image && (
        <div className="relative p-6 pb-4">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-12 w-auto object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 pt-2">
        <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300">
          {blog.title}
        </h3>
        <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
          {blog.description}
        </p>

        {/* Read more indicator */}
        <div className="mt-4 flex items-center text-white/60 text-xs font-medium">
          <span className="group-hover:text-white/90 transition-colors duration-300">
            Read more
          </span>
          <svg
            className="ml-1 w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </a>
  );
}
