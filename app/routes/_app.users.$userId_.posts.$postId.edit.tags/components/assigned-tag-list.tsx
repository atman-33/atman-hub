import { useAssignedTagsStore } from '../stores/assigned-tags-store';
import { AssignedTag } from './assigned-tag';

export const AssignedTagList = () => {
  const tags = useAssignedTagsStore((state) => state.tags);

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <AssignedTag key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
};
