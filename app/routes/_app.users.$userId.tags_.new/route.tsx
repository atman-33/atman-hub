import { redirect } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { commitSession, getSession } from '~/sessions.server';
import type { Route } from './+types/route';

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { userId } = params;

  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  switch (_action) {
    case 'new': {
      // 既存の "New Tag %" に一致するタグを取得
      const existingTags = await prisma.tag.findMany({
        where: {
          name: {
            startsWith: 'New Tag',
          },
        },
        select: { name: true },
      });

      // "New Tag N" の N を抽出
      const usedNumbers = existingTags
        .map((tag) => {
          const match = tag.name.match(/^New Tag(?: (\d+))?$/);
          return match ? Number(match[1] ?? 1) : null;
        })
        .filter((n): n is number => n !== null);

      // 次の連番を決定
      const nextNumber =
        usedNumbers.length > 0 ? Math.max(...usedNumbers) + 1 : 1;
      const newTagName = `New Tag ${nextNumber}`;

      // 新規タグ作成
      const res = await prisma.tag.create({
        data: { name: newTagName },
      });

      // トーストメッセージ
      const session = await getSession(request.headers.get('Cookie'));
      session.flash('toast', {
        type: 'success',
        message: `"${newTagName}" successfully created!`,
      });

      // 編集ページにリダイレクト
      return redirect(`/users/${userId}/tags/${res.id}/edit`, {
        headers: { 'Set-Cookie': await commitSession(session) },
      });
    }
  }
};
