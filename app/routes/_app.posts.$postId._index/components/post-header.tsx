import type { Post } from '@prisma/client';
import { formatDate } from '~/utils/date-util';

const PostHeader = ({ post }: { post: Post }) => {
  return (
    <header className="my-8 flex flex-col items-center space-y-4">
      <div className="text-5xl">{post.emoji}</div>
      <h1 className="mb-2 text-center font-bold text-2xl md:text-4xl ">
        {post.title}
      </h1>
      <div className="flex items-center gap-4 text-sm">
        <span>✏{formatDate(new Date(post.createdAt), '/')}</span>
        <span>📅{formatDate(new Date(post.updatedAt), '/')}</span>
      </div>
    </header>
  );
};

export { PostHeader };
