import type { AppItem } from '~/config/apps-config';
import { AppCard } from './app-card';

interface AppsGridProps {
  apps: AppItem[];
}

export function AppsGrid({ apps }: AppsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {apps.map((app) => (
        <div key={app.id} className="h-[400px] w-[300px]">
          <AppCard app={app} />
        </div>
      ))}
    </div>
  );
}
