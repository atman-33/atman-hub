import { formatDate } from '~/utils/date-util';
import type { Route } from './+types/route';

interface Post {
  id: string;
  title: string;
  emoji: string;
  content: string;
  updatedAt: Date;
}

export const loader = async ({ params }: Route.LoaderArgs) => {
  const dummyPosts: Post[] = [
    {
      id: '1',
      title: 'Hello, World 1!',
      emoji: '🚀',
      content: 'This is my first blog post!',
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Hello, World 2!',
      emoji: '⚡',
      content: 'This is my first blog post!',
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'Hello, World 3!',
      emoji: '👋',
      content: 'This is my first blog post!',
      updatedAt: new Date(),
    },
  ];

  return { posts: dummyPosts };
};

const AppPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {posts.map((post) => (
        <div className="flex space-x-4" key={post.id}>
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
                <div className="flex items-center">
                  <span>📝{formatDate(new Date(post.updatedAt), '/')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppPage;
