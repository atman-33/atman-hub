import {
  UploadcareSimpleAuthSchema,
  deleteFile as deleteFileFromUploadcare,
} from '@uploadcare/rest-client';
import { env } from '~/config/env'; // 環境変数からキーを取得

const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
  publicKey: env.UPLOADCARE_PUBLIC_KEY,
  secretKey: env.UPLOADCARE_SECRET_KEY,
});

/**
 * Deletes a file from Uploadcare by its UUID.
 *
 * @param {string} uuid - The UUID of the file to delete.
 * @returns {Promise<void>}
 */
export const deleteFile = async (uuid: string): Promise<void> => {
  console.log('Deleting file with UUID:', uuid);
  try {
    await deleteFileFromUploadcare(
      {
        uuid,
      },
      {
        authSchema: uploadcareSimpleAuthSchema,
      },
    );
    console.log(`File ${uuid} deleted successfully.`);
  } catch (error) {
    console.error(`Failed to delete file ${uuid}:`, error);
    throw new Error(`Uploadcare deletion failed: ${error}`);
  }
};
