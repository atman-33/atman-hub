import { useNavigate, useParams } from 'react-router';
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

export const loader = async () => {
  const tags = await prisma.tag.findMany({});
  return { tags };
};

const EditPostTagsPage = ({ loaderData }: Route.ComponentProps) => {
  const { tags } = loaderData;

  const { userId, postId } = useParams();
  const navigate = useNavigate();
  const handleClose = () => {
    // NOTE: ブラウザ履歴を残さない
    navigate(`/users/${userId}/posts/${postId}/edit`, { replace: true });
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
            Tags currently set for this post
          </p>
          <AssignedTagList className="min-h-20" />
          <Separator />
          <p className="text-muted-foreground text-sm">
            Click on a tag to add it to your post.
          </p>
          <SuggestedTagList tags={tags} />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </>
  );
};

export default EditPostTagsPage;
