import { useState } from 'react';
import { Skeleton } from '~/components/ui/skeleton';
import type { AppItem } from '~/config/apps-config';

interface AppCardProps {
  app?: AppItem;
  isLoading?: boolean;
}

export function AppCard({ app, isLoading = false }: AppCardProps) {
  const [imageError, setImageError] = useState(false);

  if (isLoading || !app) {
    return (
      <div className="glass glow-on-hover rounded-2xl p-6 border-white/20 backdrop-blur-md">
        <div className="aspect-video overflow-hidden rounded-xl bg-white/10">
          <Skeleton className="h-full w-full bg-white/20" />
        </div>
        <div className="mt-6 space-y-3">
          <Skeleton className="h-6 w-3/4 bg-white/20" />
          <Skeleton className="h-4 w-full bg-white/20" />
          <Skeleton className="h-4 w-5/6 bg-white/20" />
        </div>
      </div>
    );
  }

  return (
    <div className="group glass glow-on-hover rounded-2xl border-white/20 backdrop-blur-md overflow-hidden transition-all duration-500 hover:scale-105 hover:rotate-1">
      {/* Image with overlay gradient */}
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
        {imageError ? (
          <div className="flex h-full w-full items-center justify-center bg-red-500/20">
            <span className="text-white/80">Image failed to load</span>
          </div>
        ) : (
          <img
            src={app.imageUrl}
            alt={app.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          {app.icon && (
            <div className="relative">
              <img
                src={app.icon}
                alt="App Icon"
                className="h-6 w-6 rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-white/20 rounded-lg"></div>
            </div>
          )}
          <h3 className="text-xl font-bold text-white tracking-tight">
            {app.title}
          </h3>
        </div>

        <p className="text-white/80 text-sm leading-relaxed line-clamp-2 mb-4">
          {app.description}
        </p>

        {/* Tags with glass effect */}
        <div className="flex flex-wrap gap-2">
          {app.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="glass rounded-full px-3 py-1 text-xs text-white/90 border-white/20 backdrop-blur-sm font-medium"
            >
              {tag}
            </span>
          ))}
          {app.tags.length > 3 && (
            <span className="glass rounded-full px-3 py-1 text-xs text-white/70 border-white/20 backdrop-blur-sm">
              +{app.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <a
        href={app.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-20"
        aria-label={`View ${app.title} demo`}
      >
        <span className="sr-only">View {app.title} demo</span>
      </a>
    </div>
  );
}
