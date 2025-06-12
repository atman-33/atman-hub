import type { Tag } from '@prisma/client';
import { Form, Link, useParams } from 'react-router';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '~/components/shadcn/ui/context-menu';
import { Tag as TagComponent } from '~/components/shared/tag';

interface TagWithContextMenuProps {
  tag: Tag;
}

export const TagWithContextMenu = ({ tag }: TagWithContextMenuProps) => {
  const { userId } = useParams();
  return (
    <Link to={`/users/${userId}/tags/${tag.id}/edit`}>
      <ContextMenu>
        <ContextMenuTrigger className="cursor-pointer">
          <TagComponent name={tag.name} imageUrl={tag.image || ''} />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <Link
            to={`/users/${userId}/tags/${tag.id}/edit`}
            className="transition-opacity hover:opacity-80"
          >
            <ContextMenuItem>Edit</ContextMenuItem>
          </Link>
          <Form
            method="post"
            action={`/users/${userId}/tags/${tag.id}/delete`}
            className="transition-opacity hover:opacity-80"
          >
            <button
              type="submit"
              name="_action"
              value="delete"
              className="w-full"
            >
              <ContextMenuItem className="text-destructive">
                Delete
              </ContextMenuItem>
            </button>
          </Form>
        </ContextMenuContent>
      </ContextMenu>
    </Link>
  );
};
