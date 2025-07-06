import { Fragment } from 'react';
import type { AppItem } from '~/config/apps-config';
import { AppCard } from './app-card';

interface AppsGridProps {
  apps: AppItem[];
  isLoading?: boolean;
}

export function AppsGrid({ apps, isLoading = false }: AppsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
      {isLoading
        ? Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={`skeleton-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <>
                  i
                }`}
                className="h-[300px] w-[280px]"
              >
                <AppCard isLoading />
              </div>
            ))
        : apps.map((app) => (
            <Fragment key={app.title}>
              <div className="h-[300px] w-[280px]">
                <AppCard app={app} />
              </div>
            </Fragment>
          ))}
    </div>
  );
}
