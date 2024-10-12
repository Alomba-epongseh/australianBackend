import { storage } from '../config/index.js';
import { ErrorHelper } from '../helpers/index.js';
/**
 * @description: utility helper for image and document upload to google cloud.
 * storage path is defined as:
 *      userID:
 *          images:
 *              this is where all images with format JPG | jpg | svg | png | gif are stored
 *          documments:
 *              this is where other related documents with format pdf | doc | docx | csv
 *
 */
class UploadUtility {
    handle(files) {
        const response = files.map((file) => this.fbStorage(file));
        return {
            data: response,
        };
    }

    fbStorage(file) {
        const storagePath = storage.file(`images/${file.originalname}`);
        const fileData = storagePath
            .createWriteStream({ resumable: false })
            .end(file.buffer);
        fileData.on('error', (err) => {
            return new ErrorHelper(
                `error occured while uploading file: ${err}`,
                500
            );
        });
        fileData.on('finish', () => {
            console.log('file uploaded successfully');
        });
        return {
            imageUrl: `${process.env.FIREBASE_BASE_URL}${process.env.BUCKET_NAME}/o/images%2F${file.originalname}?alt=media`,
            name: file.originalname,
        };
    }
}

export const uploadUtility = new UploadUtility();
