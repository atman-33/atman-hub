import type { Post } from '@prisma/client';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link, useParams } from 'react-router';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/shadcn/ui/dropdown-menu';

interface PostListItemThreeDotsProps {
  post: Post;
}

export const PostListItemThreeDots = ({ post }: PostListItemThreeDotsProps) => {
  const { userId } = useParams<{ userId: string }>();

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
          <Link to={`/users/${userId}/posts/${post?.id}/delete`}>
            <DropdownMenuItem>🗑️ Delete</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
