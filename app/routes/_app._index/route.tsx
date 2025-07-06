import type { Route } from './+types/route';

// biome-ignore lint/correctness/noEmptyPattern: <>
export function meta({}: Route.MetaArgs) {
  return [{ title: 'AtmanHub' }, { name: 'description', content: '...' }];
}

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6 md:flex-row">(wip...)</div>
    </div>
  );
}
