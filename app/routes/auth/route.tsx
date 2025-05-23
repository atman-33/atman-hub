import { Link, Outlet } from 'react-router';
import { Separator } from '~/components/shadcn/ui/separator';
import { Logo } from '~/components/shared/logo';
import { UserAvatar } from '~/components/shared/user-avatar';
import { siteConfig } from '~/config/site-config';
import { getSession } from '~/sessions.server';
import type { Route } from './+types/route';

export const loader = async ({ request }: Route.LoaderArgs) => {
  // ログイン中のユーザー取得
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');
  return user;
};

const AuthLayout = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData;
  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="m-4 flex justify-center">
          <Link to="/" className="flex items-center gap-2 text-nowrap">
            <Logo />
            <span className="ml-2 text-nowrap font-bold text-lg md:text-xl">
              {siteConfig.name}
            </span>
          </Link>
        </div>

        <Separator />

        {user && (
          <div className="flex items-center justify-center gap-2">
            <div>{`Hello ${user.name}`}</div>
            <UserAvatar user={user} />
          </div>
        )}
      </div>

      <Outlet />
    </>
  );
};

export default AuthLayout;
