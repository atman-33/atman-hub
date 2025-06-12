import { Tag } from '~/components/shared/tag';

type PostTagsProps = {
  tags: { name: string; id: string; image: string | null }[];
};

const PostTags = ({ tags }: PostTagsProps) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center space-x-2">
      {tags?.map((tag) => (
        <Tag key={tag.id} name={tag.name} imageUrl={tag.image || ''} />
      ))}
    </div>
  );
};

export { PostTags };
