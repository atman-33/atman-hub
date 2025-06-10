import type { Post } from '@prisma/client';
import { UserAvatar } from '~/components/shared/user-avatar';
import { formatDate } from '~/utils/date-util';

interface PostListItemProps {
  user: { id: string; name: string; image: string | null } | undefined;
  post: Post;
}

export const PostListItem = ({ user, post }: PostListItemProps) => {
  return (
    <div className="flex items-center justify-between space-x-4" key={post.id}>
      <div className="flex w-full items-center gap-x-4">
        <div className="whitespace-nowrap">
          <div className="flex h-20 min-h-20 w-20 min-w-20 items-center justify-center rounded-full bg-background text-5xl">
            <div>{post?.emoji}</div>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-2">
          <div className="whitespace-nowrap">
            <h2 className="overflow-x-hidden text-wrap font-semibold">
              {post?.title}
            </h2>
          </div>
          <div className="flex flex-wrap space-x-2">
            <div className="flex items-center space-x-2 text-slate-500 text-xs">
              <span className="flex items-center gap-x-1">
                <UserAvatar user={user} className="h-4 w-4" />
                {user?.name}
              </span>
              <div className="flex items-center">
                <span>📅{formatDate(new Date(post.updatedAt), '/')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
