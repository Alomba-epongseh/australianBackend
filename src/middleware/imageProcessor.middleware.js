import multer from 'multer';
import { validateFileUtility } from '../utilities/index.js';

class ImageProcessorMiddleware {
    handle() {
        return multer({
            fileFilter: validateFileUtility.handle,
            storage: multer.memoryStorage(),
        }).array('file');
    }
}
export const imageProcessorMiddleware = {
    handle: new ImageProcessorMiddleware().handle(),
};
