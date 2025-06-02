interface TagProps {
  name: string;
  imageUrl: string;
  size?: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
}

/**
 * タグコンポーネント。imgのsrcは、Uploadcareを利用しているため、/-/scale_crop/300x300/-/rasterize/を付与している。
 * @param
 * @returns
 */
export const Tag = ({
  name,
  imageUrl,
  size,
  className,
  onClick,
  children,
}: TagProps) => {
  const sizeClass = size ? `w-${size} h-${size}` : 'w-6 h-6';
  const clickableClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`flex min-h-8 items-center space-x-1 rounded-4xl border-1 px-2 py-0.5 font-normal text-sm ${clickableClass} ${className}`}
      onClick={onClick}
      onKeyUp={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onClick(
                  e as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>,
                );
              }
            }
          : undefined
      }
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      {imageUrl && (
        <img
          src={`${imageUrl}/-/scale_crop/300x300/-/rasterize/`}
          alt={name}
          className={sizeClass}
        />
      )}
      <div>{name}</div>
      {children && <div className="ml-1 flex items-center">{children}</div>}
    </div>
  );
};
