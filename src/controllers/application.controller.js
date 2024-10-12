import { prisma } from '../config/index.js';
import { ResponseHelper } from '../helpers/index.js';
import { paginate } from '../utilities/index.js';

/**
 * A controller class for handling application-related requests.
 */
class ApplicationController {
    /**
     * Add to application handler method.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @param {Function} next - The Express next function.
     * @returns {Promise<void>} A promise that resolves when the application computation succeeds or rejects with an error.
     */
    async createApplication(req, res, next) {
        try {
            /**
             * @description: creating a new application
             * > collect data from the req.body
             * > query the application entity
             * > add a new application in the db
             * > return that newly added application
             * **/


            //get props from req.body
            const data = req.body;
            //query db and add new application
            const newApplication = await prisma.application.create({ data });

            //return the new application.
            return new ResponseHelper(res).success(newApplication);
        } catch (e) {
            console.log(e);
            return next(new ResponseHelper(res).error('Internal server error'));
        }
    }

    async removeFromApplication(req, res, next) {
        try {
            const { id } = req.params;

            // Find the user's active application
            const userApplication = await prisma.application.findUniqueOrThrow({
                where: { id },
            });

            if (!userApplication) {
                return next(new ResponseHelper(res).error('User application does not exist', 404));
            }

            // Delete the application (if necessary, based on your use case)
            await prisma.application.delete({
                where: { id },
            });

            // Return success message
            return new ResponseHelper(res).success('Application removed successfully');
        } catch (e) {
            console.log(e);
            return next(new ResponseHelper(res).error('Internal server error'));
        }
    }

    async getAllApplications(req, res, next) {
        try {
            let { skip, take } = req.query;
            skip = parseInt(skip) || 0;
            take = parseInt(take) || 10;

            // Query the database for all application
            const allApplications = await prisma.application.findMany({
                include: { job: true, user: true },
                skip,
                take,
            });

            // Return the list of application
            return new ResponseHelper(res).success(
                allApplications,
                200,
                paginate(await prisma.application.count(), skip, take)
            );
        } catch (e) {
            console.log(e);
            return next(new ResponseHelper(res).error('Internal server error'));
        }
    }

    async getSingleApplication(req, res, next) {
        try {
            const { userId } = req.params;

            if (!userId) {
                return next(new ResponseHelper(res).error('Invalid user ID', 400));
            }

            // Query the database for the single application by userId
            const application = await prisma.application.findUnique({
                where: { userId },
                include: { job: true, user: true },
            });

            // Return the application or an empty object if not found
            return new ResponseHelper(res).success(application ?? {});
        } catch (e) {
            console.log(e);
            return next(new ResponseHelper(res).error('Internal server error'));
        }
    }
}

// Export applicationController
export const applicationController = new ApplicationController();
