import { PostStatus } from '@prisma/client';
import { prisma } from '~/.server/lib/prisma-client';
import type { Route } from './+types/route';
import { PostListItem } from './components/post-list-item';
import type { PostWithAuthor } from './types';

export const loader = async () => {
  const posts: PostWithAuthor[] = await prisma.post.findMany({
    where: { status: PostStatus.PUBLIC },
    orderBy: { updatedAt: 'desc' },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return { posts };
};

const AppPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {posts.map((post) => (
        <div className="flex space-x-4" key={post.id}>
          <PostListItem post={post} user={post.author} />
        </div>
      ))}
    </div>
  );
};

export default AppPage;
