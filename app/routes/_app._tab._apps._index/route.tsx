import { apps } from '~/config/apps-config';
import type { Route } from './+types/route';
import { AppsGrid } from './components/apps-grid';

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'AtmanHub - Apps' },
    { name: 'description', content: 'My portfolio applications' },
  ];
}

export default function AppsIndex() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4 tracking-tight">
          My Applications
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Explore the applications I've built with passion and dedication
        </p>
      </div>
      <AppsGrid apps={apps} />
    </div>
  );
}
