import type { AppItem } from '~/config/apps-config';

interface AppCardProps {
  app: AppItem;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card p-4 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md">
      <div className="aspect-video overflow-hidden rounded-md bg-muted">
        <img
          src={app.imageUrl}
          alt={app.title}
          className="h-full w-full object-cover"
        />
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
