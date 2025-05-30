import type { Tag } from '@prisma/client';
import { Tag as TagComponent } from '~/components/shared/tag';
import { useAssignedTagsStore } from '../stores/assigned-tags-store';

interface SuggestedTagProps {
  tag: Tag;
}

export const SuggestedTag = ({ tag }: SuggestedTagProps) => {
  const setTag = useAssignedTagsStore((state) => state.setTag);
  return (
    <div>
      <TagComponent
        name={tag.name}
        imageUrl={tag.image || ''}
        onClick={() => setTag(tag)}
      />
    </div>
  );
};
