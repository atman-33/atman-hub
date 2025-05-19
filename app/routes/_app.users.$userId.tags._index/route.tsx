import { getFormProps } from '@conform-to/react';
import { useEffect, useRef, useState } from 'react';
import { useFetcher } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { Button } from '~/components/shadcn/ui/button';
import { Label } from '~/components/shadcn/ui/label';
import { Separator } from '~/components/shadcn/ui/separator';
import { ConformInput } from '~/components/shared/conform/conform-input';
import type { Route } from './+types/route';
import { ImageUploader } from './components/image-uploader';
import { TagList } from './components/tag-list';
import { useEditTagForm } from './hooks/use-edit-tag-form';
import { useImageStore } from './stores/image-store';

export const loader = async () => {
  const tags = await prisma.tag.findMany({});
  return { tags };
};

const UserTagsPage = ({ loaderData }: Route.ComponentProps) => {
  const { tags } = loaderData;

  const [form, { name }] = useEditTagForm();
  const formRef = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher();
  const file = useImageStore((state) => state.file);

  // ローカルの tags state
  const [localTags, setLocalTags] = useState(tags);

  // fetcher によって取得された tags を state に反映
  useEffect(() => {
    if (fetcher.data?.tags) {
      setLocalTags(fetcher.data.tags);
    }
  }, [fetcher.data]);

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
    // TODO: アップロード成功をトースト表示する
    console.log('Upload result:', json);

    // アップロード成功後、タグ一覧を更新するために再度データを取得
    fetcher.load(location.pathname);
  };

  return (
    <div className="flex w-full flex-col gap-4 md:px-12">
      <div className="flex">
        <h2 className="font-bold text-2xl">🏷Tags</h2>
      </div>
      <Separator />
      <fetcher.Form
        {...getFormProps(form)}
        ref={formRef}
        className="flex w-full flex-col items-start gap-4"
      >
        <div className="flex w-full flex-1 items-baseline gap-2">
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
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <ImageUploader />
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSaveButtonClick();
            }}
            className=""
          >
            Save tag
          </Button>
        </div>
      </fetcher.Form>
      <div className="mt-4 flex w-full flex-col items-center justify-center gap-4">
        <TagList tags={localTags} />
      </div>
    </div>
  );
};

export default UserTagsPage;
