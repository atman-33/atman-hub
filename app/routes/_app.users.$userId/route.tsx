import { Outlet } from 'react-router';
import { getSession } from '~/sessions.server';
import type { Route } from './+types/route';
import { UsersSidebar } from './components/users-sidebar';

export const loader = async ({ request }: Route.LoaderArgs) => {
  // ログイン中のユーザー取得
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');
  return user;
};

const UserPage = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData;
  return (
    <div className="flex py-4 md:gap-x-20">
      <UsersSidebar user={user} />
      <div className="flex w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default UserPage;
