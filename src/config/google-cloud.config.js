import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
const { PATH_TO_CLOUD_STORAGE_CREDENTIALS, BUCKET_URL } = process.env;
initializeApp({
    credential: cert(`${process.cwd() + PATH_TO_CLOUD_STORAGE_CREDENTIALS}`),
    storageBucket: BUCKET_URL,
});
export const storage = getStorage().bucket();
