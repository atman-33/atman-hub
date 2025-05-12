import { getFormProps } from '@conform-to/react';
import { useRef } from 'react';
import { useFetcher } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import { Label } from '~/components/shadcn/ui/label';
import { Separator } from '~/components/shadcn/ui/separator';
import { ConformInput } from '~/components/shared/conform/conform-input';
import ImageUploader from './components/image-uploader';
import { useEditTagForm } from './hooks/use-edit-tag-form';
import { useImageStore } from './stores/image-store';

const UserTagsPage = () => {
  const [form, { name }] = useEditTagForm();
  const formRef = useRef<HTMLFormElement>(null);
  const fethcer = useFetcher();
  const file = useImageStore((state) => state.file);

  const handleSaveButtonClick = async () => {
    if (!formRef.current) {
      return;
    }
    form.validate();
    const formData = new FormData(formRef.current);

    // 名前が空の場合は処理を中断
    if (!formData.get('name')) {
      return;
    }

    // 画像が選択されている場合は、FormDataに追加
    if (file) {
      formData.set('file', file);
    }
    // console.log('formData.name', formData.get('name'));
    // console.log('formData.file', formData.get('file'));

    const res = await fetch('/resource/upload-tag', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    console.log('Upload result:', json);
  };

  return (
    <fethcer.Form
      {...getFormProps(form)}
      ref={formRef}
      className="flex w-full flex-col gap-4 md:px-12"
    >
      <div className="flex">
        <h2 className="font-bold text-2xl">🏷Tags</h2>
      </div>
      <Separator />
      <div className="flex flex-1 items-baseline gap-2">
        <Label htmlFor="name">Tag name:</Label>
        <div className="flex-1">
          <ConformInput
            metadata={name}
            aria-label="Name"
            id="name"
            name="name"
            type="text"
          />
        </div>
      </div>
      <div className="flex self-center">
        <ImageUploader />
      </div>
      <Button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleSaveButtonClick();
        }}
      >
        Save tag
      </Button>
    </fethcer.Form>
  );
};

export default UserTagsPage;
