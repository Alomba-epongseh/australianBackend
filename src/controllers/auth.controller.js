import { prisma } from '../config/index.js';
import { ResponseHelper, CryptographyHelper } from '../helpers/index.js';
import { paginate } from '../utilities';
/**
 * A controller class for handling authentication-related requests.
 */
class AuthController {
    /**
     * Create a new user with the given email, password, and username.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @param {Function} next - The Express next function.
     * @returns {Promise<void>} A promise that resolves when the user is created or rejects with an error.
     */
    async createUser(req, res, next) {
        try {
            // ## Destructure the request body to get the email, password, and username
            /**
             * req.body = {
             *     email: "email.@gmail.net",
             *     username: "werey",
             *     password: "wereyepassword"
             * }
             * **/
            const { email, password, username, role } = req.body;

            /**
             * @description find a user in the data using the email
             * @method:
             * >  query the database
             * >  check if the user exist in the db
             * > if user exist: {
             *     return 403 error status code and message should be "this user with this email already exist"
             * } else : pass
             * Find a user in the database using the email.
             * @method
             * @returns {Promise<Object>} A promise that resolves with the user object or null if not found.
             * **/
            const user = await prisma.users.findUnique({ where: { email } });

            // Check if a user with this email already exists
            if (user !== null) {
                return next(
                    new ResponseHelper(res).error(
                        'User with this email already exists',
                        403
                    )
                );
            }

            // Hash the password using the CryptographyHelper class
            const hashedPassword = new CryptographyHelper().hashPassword(
                password
            );

            // Create a new user record in the database
            const createdUser = await prisma.users.create({
                data: { email, username, role, password: hashedPassword },
            });

            // Delete created user's password
            delete createdUser.password;

            // Send a success response with the created user object
            return new ResponseHelper(res).success(createdUser);
        } catch (e) {
            // Send an error response with a generic error message
            return next(new ResponseHelper(res).error('Internal server error'));
        }
    }
    /**
     * Login a user with the given email and password.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @param {Function} next - The Express next function.
     * @returns {Promise<void>} A promise that resolves when the user has the right credential rejects with an error.
     */

    async loginUser(req, res, next) {
        try {
            /**
             * @description: login user.
             * > when the user has an email that is not in our db, return false
             * > when the user has correct email but wring password, return false
             * > else: pass
             * **/

            /**
             * req.body = {
             *     email: "email.@gmail.net",
             *     username: "werey",
             *     password: "wereyepassword"
             * }
             * **/
            const { email, password } = req.body;

            //Check in the db if theres a user with a particular email address.
            /**
             * @description find a user in the data using the email
             * @method:
             * >  query the database
             * >  check if the user exist in the db
             * > if user does not exist: {
             *     return 401 error status code and message should be "Invalid email or password"
             * } else : pass
             * @method
             * @returns {Promise<Object>} A promise that resolves with the user object or null if not found.
             * **/
            const user = await prisma.users.findUnique({ where: { email } });
            // Check if a user with this email exists
            if (user === null) {
                return next(
                    new ResponseHelper(res).error(
                        'invalid email or password',
                        401
                    )
                );
            }
            //If the user with this email exist, Compare user input password with the password in the db

            const isPassword = await new CryptographyHelper().comparePasswords(
                password,
                user.password
            );
            if (!isPassword) {
                return next(
                    new ResponseHelper(res).error(
                        'invalid email or password',
                        401
                    )
                );
            }
            // Delete user's password
            delete user.password;

            // Send a success response with the created user object
            return next(new ResponseHelper(res).success(user));
        } catch (e) {
            console.log(e);
            // Send an error response with a generic error message
            return next(new ResponseHelper(res).error('Internal server error'));
        }
    }
    /**
     * Get all users from the database.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @param {Function} next - The Express next function.
     * @returns {Promise<void>} A promise that resolves when the user has the right credential rejects with an error.
     */
    async getAllUsers(req, res, next) {
        try {
            let { skip, take } = req.query;
            skip = parseInt(skip) || 0;
            take = parseInt(take) || 10;

            const users = (
                await prisma.users.findMany({
                    include: {
                             jobs: true, applications: true,
                        
                    },
                    skip,
                    take,
                })
            ).map((user) => {
                delete user.password;
                return user;
            });
            return new ResponseHelper(res).success(
                users,
                200,
                paginate(await prisma.users.count(), skip, take)
            );
        } catch (e) {
            console.log(e);
            return next(new ResponseHelper(res).error('Internal server error'));
        }
    }
  
}
// ## exports authContrller;
export const authController = new AuthController();
