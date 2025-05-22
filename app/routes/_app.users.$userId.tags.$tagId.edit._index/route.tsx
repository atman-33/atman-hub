import { getFormProps } from '@conform-to/react';
import { parseFormData } from '@mjackson/form-data-parser';
import { useRef } from 'react';
import { redirect, useFetcher, useNavigate } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { deleteFile, uploadFile } from '~/.server/lib/uploadcare';
import { DialogContentNoCloseButton } from '~/components/shadcn/custom/dialog-content-no-close-button';
import { Button } from '~/components/shadcn/ui/button';
import { Dialog } from '~/components/shadcn/ui/dialog';
import { Label } from '~/components/shadcn/ui/label';
import { ConformInput } from '~/components/shared/conform/conform-input';
import { commitSession, getSession } from '~/sessions.server';
import type { ApiResponse } from '~/types/api-response';
import { extractUuidFromCdnUrl } from '~/utils/extract-uuid';
import type { Route } from './+types/route';
import { ImageUploader } from './components/image-uploader';
import { useEditTagForm } from './hooks/use-edit-tag-form';
import { useImageStore } from './stores/image-store';

export const loader = async ({ params }: Route.LoaderArgs) => {
  let tag = await prisma.tag.findUnique({
    where: { id: params.tagId },
  });

  if (!tag) {
    tag = {
      id: params.tagId,
      name: '',
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
  return { tag };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const formData = await parseFormData(request);
  const name = formData.get('name') as string;
  const file = formData.get('file');
  // console.log('Received file:', file);

  if (!(file instanceof File || file === null)) {
    console.error('The received file is not a valid File object.');
    return {
      success: false,
      error: {
        message: 'The received file is not a valid File object',
      },
    } as ApiResponse;
  }

  try {
    // 既存のタグがある場合は、Uploadcareからファイルを削除する
    const existingTag = await prisma.tag.findUnique({
      where: { id: params.tagId },
    });
    if (existingTag?.image) {
      const uuid = extractUuidFromCdnUrl(existingTag.image);
      if (uuid) {
        await deleteFile(uuid);
      }
    }

    // タグの画像をアップロードする
    let url: string | null = null;
    if (file) {
      url = await uploadFile(file, name);
    }

    // タグの画像と名称をDBに保存する
    await prisma.tag.upsert({
      where: { id: params.tagId },
      update: {
        name,
        image: url,
      },
      create: {
        name,
        image: url,
      },
    });

    // トーストに表示するメッセージを格納
    const session = await getSession(request.headers.get('Cookie'));
    session.flash('toast', {
      type: 'success',
      message: 'Tag successfully updated!',
    });

    return redirect(`/users/${params.userId}/tags`, {
      headers: { 'Set-Cookie': await commitSession(session) },
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    } as ApiResponse;
  }
};

const TagEditPage = ({ loaderData, actionData }: Route.ComponentProps) => {
  const { tag } = loaderData;
  const formRef = useRef<HTMLFormElement>(null);
  const [form, { name }] = useEditTagForm();
  const fetcher = useFetcher<typeof actionData>();
  const file = useImageStore((state) => state.file);
  const resetFile = useImageStore((state) => state.resetFile);

  // NOTE: useNavigateはブラウザ履歴で戻る操作をするために利用
  const navigate = useNavigate();

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

    await fetcher.submit(formData, {
      method: 'post',
      encType: 'multipart/form-data',
    });

    resetFile();
  };

  if (!tag) {
    console.log('tag not found');
    return <div>not found</div>;
  }

  return (
    <Dialog open={true}>
      <DialogContentNoCloseButton className="max-w-2xl">
        <fetcher.Form
          {...getFormProps(form)}
          ref={formRef}
          key={tag.id}
          method="post"
          className="grid grid-cols-[auto,1fr] items-center gap-4"
        >
          <Label>Name</Label>
          <ConformInput
            metadata={name}
            defaultValue={tag.name}
            name="name"
            placeholder="react"
            type="text"
          />
          <Label>Image</Label>
          <ImageUploader />
          <div className="col-start-2 flex gap-4">
            {/* fetcherが処理中（submitting/loading）の時はdisableにする */}
            <Button
              type="submit"
              disabled={
                fetcher.state === 'submitting' || fetcher.state === 'loading'
              }
              onClick={(e) => {
                e.preventDefault();
                handleSaveButtonClick();
              }}
            >
              Save
            </Button>
            {/* NOTE: <button type="button">は、ボタンがフォームを送信するのを防ぐHTMLの方法 */}
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </fetcher.Form>
      </DialogContentNoCloseButton>
    </Dialog>
  );
};

export default TagEditPage;
