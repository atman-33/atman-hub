import { UploadClient } from '@uploadcare/upload-client';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID library
import { env } from '~/config/env';

const UPLOADCARE_PUBLIC_KEY = env.UPLOADCARE_PUBLIC_KEY;
const client = new UploadClient({ publicKey: UPLOADCARE_PUBLIC_KEY });

/**
 * Uploads an image file to Uploadcare.
 *
 * @param {File} file The image file to upload.
 * @returns {Promise<string>} The CDN URL of the uploaded image.
 * @throws {Error} If the upload fails.
 */
export const uploadImage = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await client.uploadFile(buffer, {
      store: 'auto', // Automatically store the uploaded file
      fileName: uuidv4(),
    });
    return result.cdnUrl; // CDN URL of the uploaded image
  } catch (error) {
    console.error('Upload failed:', error);
    throw new Error(`Image upload failed: ${error}`);
  }
};
