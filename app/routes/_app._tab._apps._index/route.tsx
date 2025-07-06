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
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">My Applications</h1>
      <AppsGrid apps={apps} />
    </div>
  );
}
