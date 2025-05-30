import type { Tag } from '@prisma/client';
import { useParams } from 'react-router';
import { Tag as TagComponent } from '~/components/shared/tag';

interface AssignedTagProps {
  tag: Tag;
}

export const AssignedTag = ({ tag }: AssignedTagProps) => {
  const { userId } = useParams();
  return <TagComponent name={tag.name} imageUrl={tag.image || ''} />;
};
