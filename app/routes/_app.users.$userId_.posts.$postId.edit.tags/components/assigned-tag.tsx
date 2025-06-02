import type { Tag } from '@prisma/client';
import { Tag as TagComponent } from '~/components/shared/tag';
import { useAssignedTagsStore } from '../stores/assigned-tags-store';

interface AssignedTagProps {
  tag: Tag;
}

export const AssignedTag = ({ tag }: AssignedTagProps) => {
  const removeTag = useAssignedTagsStore((state) => state.removeTag);
  return (
    <div className="flex items-center gap-1">
      <TagComponent name={tag.name} imageUrl={tag.image || ''} />
      <button
        type="button"
        className="ml-1 cursor-pointer text-lg hover:opacity-70"
        aria-label="タグを削除"
        onClick={() => removeTag(tag.id)}
      >
        ❌
      </button>
    </div>
  );
};
