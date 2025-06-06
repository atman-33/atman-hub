import { Outlet } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { destroySession, getSession } from '~/sessions.server';
import type { Route } from './+types/route';
import { Footer } from './components/footer';
import { Header } from './components/header';

export const loader = async ({ request }: Route.LoaderArgs) => {
  // ログイン中のユーザー取得
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');

  // DBにユーザーが存在しない場合はセッションを破棄
  if (user) {
    const databaseUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!databaseUser) {
      await destroySession(session);
      return null;
    }
  }

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
