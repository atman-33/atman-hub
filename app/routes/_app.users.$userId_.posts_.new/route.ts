import { redirect } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { commitSession, getSession } from '~/sessions.server';
import type { Route } from './+types/route';

export const action = async ({ request, params }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  switch (_action) {
    case 'new': {
      const res = await prisma.post.create({
        data: {
          title: 'draft',
          emoji: '📝',
          content: '',
          author: { connect: { id: params.userId } },
        },
      });

      const session = await getSession(request.headers.get('Cookie'));
      session.flash('toast', {
        type: 'success',
        message: 'Post successfully created!',
      });

      const { userId } = params;
      return redirect(`/users/${userId}/posts/${res.id}/edit`, {
        headers: { 'Set-Cookie': await commitSession(session) },
      });
    }

    default: {
      console.log('_app.users.$userId_.posts_.new: _action not found');
    }
  }
};
