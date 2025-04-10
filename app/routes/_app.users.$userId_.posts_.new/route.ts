import { randomUUID } from 'node:crypto';
import { redirect } from 'react-router';
import type { Route } from './+types/route';

export const action = async ({ request, params }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  switch (_action) {
    case 'new': {
      // 新規ポスト用にUUIDを生成
      const { userId } = params;
      const newPostId = randomUUID();
      return redirect(`/users/${userId}/posts/${newPostId}/edit`);
    }

    default: {
      console.log('_app.users.$userId_.posts_.new: _action not found');
    }
  }
};
