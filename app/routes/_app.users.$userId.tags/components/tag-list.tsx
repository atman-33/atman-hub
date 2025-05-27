import type { Tag } from '@prisma/client';
import { TagWithContextMenu } from './tag-with-context-menu';

interface TagListProps {
  tags: Tag[];
}

export const TagList = ({ tags }: TagListProps) => {
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <TagWithContextMenu key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
};
