import { redirect } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { commitSession, getSession } from '~/sessions.server';
import type { Route } from './+types/route';

export const action = async ({ request, params }: Route.ActionArgs) => {
  console.log('calling delete tag action');
  const { userId, tagId } = params;

  // タグを削除する処理
  await prisma.tag.delete({
    where: { id: tagId },
  });

  // トーストに表示するメッセージを格納
  const session = await getSession(request.headers.get('Cookie'));
  session.flash('toast', {
    type: 'info',
    message: 'Tag successfully deleted!',
  });

  // ユーザーのタグ一覧ページにリダイレクト
  return redirect(`/users/${userId}/tags`, {
    headers: { 'Set-Cookie': await commitSession(session) },
  });
};
