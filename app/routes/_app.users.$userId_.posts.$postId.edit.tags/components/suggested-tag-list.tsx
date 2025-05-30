import type { Tag } from '@prisma/client';
import { SuggestedTag } from './suggested-tag';

interface SuggestedTagListProps {
  tags: Tag[];
}

export const SuggestedTagList = ({ tags }: SuggestedTagListProps) => {
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <SuggestedTag key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
};
