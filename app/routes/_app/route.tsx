import { Outlet } from 'react-router';
import { getSession } from '~/sessions.server';
import type { Route } from './+types/route';
import { Footer } from './components/footer';
import { Header } from './components/header';

export const loader = async ({ request }: Route.LoaderArgs) => {
  // ログイン中のユーザー取得
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');
  return user;
};

const AppLayout = ({ loaderData }: Route.ComponentProps) => {
  return (
    <>
      <Header user={loaderData} />
      <div className="container mx-auto w-full px-2 py-2 md:w-11/12 md:px-0">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
