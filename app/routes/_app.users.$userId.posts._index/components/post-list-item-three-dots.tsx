import type { Post } from '@prisma/client';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Form, Link, useParams, useSubmit } from 'react-router';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/shadcn/ui/dropdown-menu';
import { AlertDialog } from '~/components/shared/react-call/alert-dialog';

interface PostListItemThreeDotsProps {
  post: Post;
}

export const PostListItemThreeDots = ({ post }: PostListItemThreeDotsProps) => {
  const { userId } = useParams<{ userId: string }>();
  const submit = useSubmit();

  const handleDeleteSubmit = async (event: React.FormEvent) => {
    console.log('handleDeleteSubmit');
    // フォームの送信をキャンセル
    event.preventDefault();

    const res = await AlertDialog.call({
      message: 'Please confirm you want to delete this post.',
    });

    if (res === 'cancel') {
      return;
    }

    const formData = event.currentTarget as HTMLFormElement;
    submit(formData, {
      method: 'post',
      action: `/users/${userId}/posts/${post?.id}/delete`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:!outline-none">
        <BsThreeDotsVertical className="h-6 w-6 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <Link to={`/users/${userId}/posts/${post?.id}/edit`}>
            <DropdownMenuItem>✏ Edit</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Form onSubmit={(e) => handleDeleteSubmit(e)}>
            <DropdownMenuItem>
              <button type="submit">🗑️ Delete</button>
            </DropdownMenuItem>
          </Form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
