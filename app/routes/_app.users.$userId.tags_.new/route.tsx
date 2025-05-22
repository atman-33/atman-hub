import { redirect } from 'react-router';
import type { Route } from './+types/route';

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { userId } = params;

  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  switch (_action) {
    case 'new': {
      // 新規作成用のTagIDをuuidで生成する
      const newTagId = crypto.randomUUID();

      // 編集ページにリダイレクト
      return redirect(`/users/${userId}/tags/${newTagId}/edit`);
    }
  }
};
