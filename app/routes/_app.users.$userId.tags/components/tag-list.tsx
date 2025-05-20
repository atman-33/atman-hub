import type { Tag } from '@prisma/client';
import { Tag as TagComponent } from '~/components/shared/tag';

interface TagListProps {
  tags: Tag[];
}

export const TagList = ({ tags }: TagListProps) => {
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <TagComponent
            key={tag.id}
            name={tag.name}
            imageUrl={tag.image || ''}
          />
        ))}
      </div>
    </div>
  );
};
