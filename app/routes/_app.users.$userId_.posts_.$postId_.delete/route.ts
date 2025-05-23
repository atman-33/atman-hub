import { redirect } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { commitSession, getSession } from '~/sessions.server';
import type { Route } from './+types/route';

export const action = async ({ params, request }: Route.ActionArgs) => {
  await prisma.post.delete({
    where: { id: params.postId },
  });

  // トーストに表示するメッセージを格納
  const session = await getSession(request.headers.get('Cookie'));
  session.flash('toast', {
    type: 'success',
    message: 'Post successfully deleted!',
  });

  // TODO: 削除が失敗した際の処理（トースト表示）の追加も必要

  return redirect(`/users/${params.userId}/posts`, {
    headers: { 'Set-Cookie': await commitSession(session) },
  });
};
