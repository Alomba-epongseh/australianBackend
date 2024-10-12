import { RegexConstant } from '../../constants/index.js';
import { ResponseHelper } from '../../helpers/index.js';

/**
 Validates user registration input fields
 @function
 @name loginValidator
 @example
 **/
export const loginValidator = (req, res, next) => {
    const { email, password } = req.body;
    let error = {
        message: '',
        status: 400,
    };
    switch (true) {
        case !email || !RegexConstant.EMAIL.test(email):
            error.message = 'malformed email address!';
            break;
        case !password || password.length < 3 || password.length > 20:
            error.message =
                'malformed password. should be between 3 to 20 characters!';
            break;
    }
    return next(
        error.message.trim()
            ? new ResponseHelper(res).error(error.message, error.status)
            : null
    );
};
