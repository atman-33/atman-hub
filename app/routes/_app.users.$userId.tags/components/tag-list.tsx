import type { Tag } from '@prisma/client';
import { Link, useParams } from 'react-router';
import { Tag as TagComponent } from '~/components/shared/tag';

interface TagListProps {
  tags: Tag[];
}

export const TagList = ({ tags }: TagListProps) => {
  const { userId } = useParams();
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            to={`/users/${userId}/tags/${tag.id}/edit`}
            className="transition-opacity hover:opacity-80"
          >
            <TagComponent name={tag.name} imageUrl={tag.image || ''} />
          </Link>
        ))}
      </div>
    </div>
  );
};
