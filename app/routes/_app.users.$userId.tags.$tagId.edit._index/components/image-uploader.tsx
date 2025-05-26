import { useEffect, useState } from 'react';
import { useImageStore } from '../stores/image-store';
import ImageLogo from './image.svg';

export const ImageUploader = ({ image }: { image?: string | null }) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    image || null,
  );
  const setImage = useImageStore((state) => state.setFile);

  // TODO: image が svg の場合は初期表示されない！要対応

  useEffect(() => {}, []);

  const handleDragEnter = (e: React.DragEvent<HTMLInputElement>) => {
    if (e.dataTransfer === null) {
      return;
    }

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  /**
   * ファイルをプレビュー用に読み込む共通関数
   * @param file
   * @param setSelectedImage
   */
  const readFileForPreview = (
    file: File,
    setSelectedImage: (src: string) => void,
  ) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert('Failed to load image!');
      console.error(error);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files !== null && e.dataTransfer.files.length > 0) {
      if (e.dataTransfer.files.length === 1) {
        setImage(e.dataTransfer.files[0]);
      } else {
        alert('Only one file is allowed!');
      }
      e.dataTransfer.clearData();
    }
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      readFileForPreview(file, setSelectedImage);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    const file = e.target.files[0];
    readFileForPreview(file, setSelectedImage);
    setImage(file);
  };

  return (
    <div className="flex items-stretch gap-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex flex-col items-center">
          <div
            className={`flex h-40 w-60 flex-col items-center gap-2 rounded-md border-2 border-dashed transition-color duration-700 ${isDragActive && 'border-blue-500 bg-blue-50'}`}
          >
            <p className="pt-4 text-primary/60">Drag & drop image file here</p>
          </div>
          <input
            className="absolute top-0 left-0 z-10 h-[100%] w-[100%] cursor-pointer opacity-0 file:cursor-pointer"
            name="imageURL"
            type="file"
            accept=".png, .jpeg, .jpg, .svg"
            onChange={(e) => handleFileUpload(e)}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={() => handleDragLeave()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e)}
          />
          <img
            src={
              selectedImage
                ? `${selectedImage}/-/scale_crop/300x300/-/rasterize/`
                : ImageLogo
            }
            alt="imagelogo"
            className="absolute top-16 z-0 h-20"
          />
        </div>
      </div>
    </div>
  );
};
