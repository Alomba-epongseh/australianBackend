import { ErrorHelper } from './../helpers/error.helper.js';
import { RegexConstant } from '../constants/Regex.constant.js';
class ValidateFileUtility {
    handle(req, file, cb) {
        if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif|svg)$/)) {
            return cb(
                new ErrorHelper(
                    'invalid file type. expected: JPG|jpg|jpeg|png|gif|svg',
                    422
                ),
                false
            );
        }
        file.originalname = file.originalname.replaceAll(
            RegexConstant.SPECIAL_CHARACTERS_EXCEPT_PERIOD,
            '_'
        );
        return cb(undefined, true);
    }
}

export const validateFileUtility = new ValidateFileUtility();
