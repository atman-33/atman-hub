import { redirect } from 'react-router';
import { destroySession, getSession } from '~/sessions.server';
import type { Route } from './+types/route';

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    // セッションを破棄してログアウト
    const session = await getSession(request.headers.get('cookie'));
    return redirect('/auth/login', {
      headers: { 'Set-Cookie': await destroySession(session) },
    });
  } catch (e) {
    console.error('Logout error: ', e);
    // Still redirect to login page even if there's an error
    return redirect('/auth/login');
  }
};
