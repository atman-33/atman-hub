import { redirect } from 'react-router';
import { destroySession, getSession } from '~/sessions.server';
import type { Route } from './+types/route';

export const action = async ({ request }: Route.ActionArgs) => {
  // セッションを破棄してログアウト
  const session = await getSession(request.headers.get('cookie'));
  return redirect('/auth/login', {
    headers: { 'Set-Cookie': await destroySession(session) },
  });
};
