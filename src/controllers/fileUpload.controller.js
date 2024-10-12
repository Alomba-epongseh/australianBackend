import { ResponseHelper } from '../helpers/index.js';
import { uploadUtility } from '../utilities/upload.utility.js';

class FileUploadController {
    async single(req, res, next) {
        try {
            /**
             * @description: upload single file
             * get file object from req.file and pass it to utility in charge of making upload.
             */
            /***
             * const fileData = req.file
             */
            const fileData = req.files;
            const fileDataResponse = uploadUtility.handle(fileData);
            return new ResponseHelper(res).success(fileDataResponse, 201);
        } catch (e) {
            return next(new ResponseHelper(res).error('Internal server error'));
        }
    }
}
export const fileUploadController = new FileUploadController();
