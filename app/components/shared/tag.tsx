interface TagProps {
  name: string;
  imageUrl: string;
  size?: number;
  className?: string;
}

/**
 * タグコンポーネント。imgのsrcは、Uploadcareを利用しているため、/-/scale_crop/300x300/-/rasterize/を付与している。
 * @param
 * @returns
 */
export const Tag = ({ name, imageUrl, size, className }: TagProps) => {
  const sizeClass = size ? `w-${size} h-${size}` : 'w-6 h-6';

  return (
    <div
      className={`flex items-center space-x-1 rounded-4xl border-1 px-2 py-0.5 font-normal text-sm ${className}`}
    >
      <img
        src={`${imageUrl}/-/scale_crop/300x300/-/rasterize/`}
        alt={name}
        className={sizeClass}
      />
      <div>{name}</div>
    </div>
  );
};
