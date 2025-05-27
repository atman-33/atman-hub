import { redirect } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { deleteFile } from '~/.server/lib/uploadcare';
import { commitSession, getSession } from '~/sessions.server';
import type { ApiResponse } from '~/types/api-response';
import { extractUuidFromCdnUrl } from '~/utils/extract-uuid';
import type { Route } from './+types/route';

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { userId, tagId } = params;

  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  switch (_action) {
    case 'delete': {
      // タグを削除する処理
      const tag = await prisma.tag.delete({
        where: { id: tagId },
      });

      if (tag?.image) {
        const uuid = extractUuidFromCdnUrl(tag.image);
        if (uuid) {
          await deleteFile(uuid);
        }
      }

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
    }

    default: {
      console.log('_app.users.$userId.tags.$tagId_.delete: _action not found');
      return {
        success: false,
        error: {
          message: '_app.users.$userId.tags.$tagId_.delete: _action not found',
        },
      } as ApiResponse;
    }
  }
};
