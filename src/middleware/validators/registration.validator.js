import { RegexConstant } from '../../constants/index.js';
import { ResponseHelper } from '../../helpers/index.js';

/**
 Validates user registration input fields
 @function
 @name registrationValidator
 @example
 router.post('/register', [registrationValidator], controller)
 **/
export const registrationValidator = (req, res, next) => {
    const { email, password, username } = req.body;
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
        case !username || !RegexConstant.USERNAME.test(username):
            error.message =
                'malformed username. it should not contain numbers or special characters  and should be between 3 to 20 characters!';
            break;
    }
    return next(
        error.message.trim()
            ? new ResponseHelper(res).error(error.message, error.status)
            : null
    );
};
