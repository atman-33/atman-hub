import type { Tag } from '@prisma/client';
import { useEffect } from 'react';
import { useFetcher, useNavigate, useParams } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { Button } from '~/components/shadcn/ui/button';
import { Separator } from '~/components/shadcn/ui/separator';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '~/components/shadcn/ui/sheet';
import type { Route } from './+types/route';
import { AssignedTagList } from './components/assigned-tag-list';
import { SuggestedTagList } from './components/suggested-tag-list';
import { useAssignedTagsStore } from './stores/assigned-tags-store';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const suggestedTags = await prisma.tag.findMany({});
  const assignedTags = await prisma.tag.findMany({
    where: {
      posts: {
        some: {
          postId: params.postId,
        },
      },
    },
  });
  return { suggestedTags, assignedTags };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const formData = await request.formData();
  // assignedTagsはJSON文字列で送られてくるのでパースする
  const assignedTagsJson = formData.get('assignedTags');
  const assignedTags: Tag[] | null = assignedTagsJson
    ? JSON.parse(assignedTagsJson as string)
    : [];

  const postId = params.postId;
  if (!postId) {
    throw new Error('postId is not specified!');
  }

  // まず既存のタグ関連(PostTag)を全部削除
  await prisma.postTag.deleteMany({
    where: { postId },
  });

  // 新しいタグを紐付け
  if (Array.isArray(assignedTags) && assignedTags.length > 0) {
    await prisma.postTag.createMany({
      data: assignedTags.map((tag) => ({
        postId,
        tagId: tag.id,
      })),
      skipDuplicates: true,
    });
  }

  // TODO: エラーハンドリングを追加する
  return null;
};

const EditPostTagsPage = ({ loaderData }: Route.ComponentProps) => {
  const { suggestedTags, assignedTags: initialAssignedTags } = loaderData;
  const { userId, postId } = useParams();
  const assignedTags = useAssignedTagsStore((state) => state.tags);
  const setTags = useAssignedTagsStore((state) => state.setTags);

  const navigate = useNavigate();
  const fetcher = useFetcher();

  useEffect(() => {
    setTags(initialAssignedTags);
  }, [initialAssignedTags, setTags]);

  const handleClose = () => {
    // NOTE: ブラウザ履歴を残さない
    navigate(`/users/${userId}/posts/${postId}/edit`, { replace: true });
  };

  const handleSaveChangesClick = () => {
    const formData = new FormData();
    formData.set('assignedTags', JSON.stringify(assignedTags));
    fetcher.submit(formData, { method: 'post', action: './' });
  };

  return (
    <>
      <SheetContent onCloseAutoFocus={() => handleClose()}>
        <SheetHeader>
          <SheetTitle>Tags</SheetTitle>
          <SheetDescription>
            Add or remove tags to categorize your post. Tags help others find
            your content more easily.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <h3 className="font-semibold">Tags for this post</h3>
          <p className="text-muted-foreground text-sm">
            Tags currently set for this post.
          </p>
          <AssignedTagList className="min-h-20" />
          <Separator />
          <p className="text-muted-foreground text-sm">
            Click on a tag to add it to your post.
          </p>
          <SuggestedTagList tags={suggestedTags} />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={() => handleSaveChangesClick()}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </>
  );
};

export default EditPostTagsPage;
