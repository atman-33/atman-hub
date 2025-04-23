import { uploadImage } from '~/.server/lib/uploadcare';
import type { Route } from './+types/route';

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
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
    const url = await uploadImage(file as File);
    // console.log('Uploaded image URL:', url);
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
