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
      <div className="group relative overflow-hidden rounded-lg border bg-card p-4 shadow-sm">
        <div className="aspect-video overflow-hidden rounded-md bg-muted">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card p-4 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md">
      <div className="aspect-video overflow-hidden rounded-md bg-muted">
        {imageError ? (
          <div className="flex h-full w-full items-center justify-center bg-destructive/10">
            <span className="text-destructive">Image failed to load</span>
          </div>
        ) : (
          <img
            src={app.imageUrl}
            alt={app.title}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold">{app.title}</h3>
        <p className="text-sm text-muted-foreground">{app.description}</p>
        <div className="flex flex-wrap gap-2">
          {app.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <a
        href={app.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
        aria-label={`View ${app.title} demo`}
      >
        <span className="sr-only">View {app.title} demo</span>
      </a>
    </div>
  );
}
