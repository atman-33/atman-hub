import { useAssignedTagsStore } from '../stores/assigned-tags-store';
import { AssignedTag } from './assigned-tag';

interface AssignedTagListProps {
  className?: string;
}

export const AssignedTagList = ({ className }: AssignedTagListProps) => {
  const tags = useAssignedTagsStore((state) => state.tags);

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <AssignedTag key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
};
