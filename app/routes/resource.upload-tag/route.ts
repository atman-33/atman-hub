import { prisma } from '~/.server/lib/prisma-client';
import { deleteFile, uploadFile } from '~/.server/lib/uploadcare';
import { extractUuidFromCdnUrl } from '~/utils/extract-uuid';
import type { Route } from './+types/route';

/**
 * タグの画像をアップロードするためのアクション
 * @param
 * @returns
 */
export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const file = formData.get('file');
  // console.log('Received file:', file);
  if (!(file instanceof File)) {
    console.error('The received file is not a valid File object.');
    return Response.json(
      {
        status: 'error',
        message: 'Invalid file uploaded',
        error: 'The received file is not a valid File object',
      },
      { status: 400 },
    );
  }

  try {
    // 既存のタグがある場合は、Uploadcareからファイルを削除する
    const existingTag = await prisma.tag.findUnique({
      where: { name },
    });
    if (existingTag?.image) {
      const uuid = extractUuidFromCdnUrl(existingTag.image);
      if (uuid) {
        await deleteFile(uuid);
      }
    }

    // タグの画像をアップロードする
    // TODO: 画像アップロードが失敗した際は、DB保存をしない。
    const url = await uploadFile(file, name);
    // console.log('Uploaded image URL:', url);

    // タグの画像と名称をDBに保存する
    await prisma.tag.upsert({
      where: { name },
      update: {
        image: url,
      },
      create: {
        name,
        image: url,
      },
    });

    return Response.json({
      status: 'success',
      message: 'Image uploaded successfully',
      url,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return Response.json({
      status: 'error',
      message: 'Image upload failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
