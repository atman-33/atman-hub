import { Form } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { Button } from '~/components/shadcn/ui/button';
import { Separator } from '~/components/shadcn/ui/separator';
import { getSession } from '~/sessions.server';
import type { Route } from './+types/route';
import { PostListItem } from './components/post-list-item';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  // ログイン中のユーザー取得
  const session = await getSession(request.headers.get('Cookie'));
  const user = session.get('user');

  // 記事を取得
  const posts = await prisma.post.findMany({
    where: { authorId: params.userId },
    orderBy: { updatedAt: 'desc' },
  });

  return { user, posts };
};

const UserPostsPage = ({ loaderData }: Route.ComponentProps) => {
  const { user, posts } = loaderData;

  return (
    <div className="flex w-full flex-col gap-4 md:px-12">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">📝Posts</h2>
        <Form action="new" method="post">
          <Button type="submit" name="_action" value="new" className="ml-4">
            New post
          </Button>
        </Form>
      </div>
      <Separator />
      {posts.map((post) => (
        <PostListItem key={post.id} user={user} post={post} />
      ))}
    </div>
  );
};

export default UserPostsPage;
