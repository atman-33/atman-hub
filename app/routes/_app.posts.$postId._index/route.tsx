import { useEffect } from 'react';
import { prisma } from '~/.server/lib/prisma-client';
import { Toc } from '~/components/shared/toc';
import type { Route } from './+types/route';
import { PostHeader } from './components/post-header';
import { Preview } from './components/preview';
import { useDocStore } from './stores/doc-store';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const post = await prisma.post.findUnique({
    where: { id: params.postId },
  });

  return { post };
};

const PostPage = ({ loaderData }: Route.ComponentProps) => {
  const { post } = loaderData;
  const setDoc = useDocStore((state) => state.setDoc);

  useEffect(() => {
    setDoc(post?.content || '');
  }, [post?.content, setDoc]);

  if (!post) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="font-bold text-2xl">Post not found</h1>
        <p>The post you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <>
      {/* <div className="bg-background sticky top-0 border-b-2 p-2">
        <PostMobileNav post={post} />
      </div> */}
      <div className="prose dark:prose-invert py-6 sm:p-2">
        <div className="sm:container">
          <PostHeader post={post} />

          <article className="lg:grid lg:grid-cols-10 ">
            <section className="flex flex-col space-y-4 bg-background p-4 sm:rounded-sm sm:p-8 lg:col-span-7">
              {/* <PostTags post={post} /> */}
              <div className="content">
                <Preview />
              </div>
            </section>
            <div className="hidden items-start lg:col-span-3 lg:flex">
              <Toc className="sticky top-20 ml-6 min-w-72" />
            </div>
          </article>
        </div>
        {/* <div className="fixed bottom-4 right-4">
          <ScrollTop />
        </div> */}
      </div>
    </>
  );
};

export default PostPage;
