import { prisma } from '../config/index';
import { ResponseHelper } from '../helpers/index.js';
import { paginate } from '../utilities/index.js';
/**
 * A controller class for handling jobs-related requests.
 */
class JobsController {
    /**
     * Login a user with the given email and password.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @param {Function} next - The Express next function.
     * @returns {Promise<void>} A promise that resolves when the user has the right credential rejects with an error.
     */
    async createJob(req, res, next) {
        try {
            /**
             * @description: creating a new job
             * > collect data from the req.body
             * > query the jobs entity
             * > add a new job in the db
             * > return that newly added job
             * **/


            //get props from req.body
            const data = req.body;
            //query db and add new job
            const newJob = await prisma.jobs.create({ data });

            //return the new job.
            return new ResponseHelper(res).success(newJob);
        } catch (e) {
            console.log(e);
            return next(new ResponseHelper(res).error('Internal server error'));
        }
    }
    /**
     * Get all jobs from the database.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @param {Function} next - The Express next function.
     * @returns {Promise<void>} A promise that resolves when the user has the right credential rejects with an error.
     */
    async getJob(req, res, next) {
        try {
            /**
             * @description: Getting all jobs
             * > collect data from the req.body
             * > query the jobs entity
             * >get the  jobs in the db
             * > return all jobs
             * **/

            /**
             * req.body is empty since it is a get request
             * **/
            let { skip, take } = req.query;
            skip = parseInt(skip) || 0;
            take = parseInt(take) || 10;
            //query db and add get all jobs
            const allJobs = await prisma.jobs.findMany({
                skip,
                take,
            });

            //return the new job.
            return new ResponseHelper(res).success(
                allJobs,
                200,
                paginate(await prisma.jobs.count(), skip, take)
            );
        } catch (e) {
            console.log(e);
            return next(new ResponseHelper(res).error('Internal server error'));
        }
    }
    /**
     * Get Single job from the database.
     * @async
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @param {Function} next - The Express next function.
     * @returns {Promise<void>} A promise that resolves when the user has the right credential rejects with an error.
     */
    async getSingleJob(req, res, next) {
        try {
            /**
             * @description: Getting one job
             * > collect data from the req.body
             * > query the jobs entity
             * >get the  job in the db by searching for the job id
             * >if the id is not null:{
             * pass
             * }else: 400 saying invalid id received.
             * >If the job exist:{
             *  return the job
             * >}else: an empty object
             * **/

            /**
             * req.body is empty since it is a get request
             * req.params is not empty
             *
             * **/
            const { id } = req.params;

            //if id is null
            if (id === null) {
                return next(
                    new ResponseHelper(res).error('Invalid id received', 400)
                );
            }

            //query db and add get a job with id
            const singleJob = await prisma.jobs.findUnique({
                where: { id },
            });

            //return the job.
            return next(new ResponseHelper(res).success(singleJob ?? {}));
        } catch (e) {
            console.log(e);
            return next(new ResponseHelper(res).error('Internal server error'));
        }
    }
    async updateJob(req, res, next) {
        try {
            /**
             * @description Update a job
             * Query the jobs records, and update the job simultaneously
             * return a successful message ("Job deleted successfully");
             *
             */
            /**
             * req.body ={
                    *    jobId: ["644b1a5cc1f54511295e6a9d"]      
                    *    name: 'shoe'
                    *    description "String"
                    *    imageUrl ["https://cloud.google/bucket-name/image.png"]
                    *    colors: ["red", "#000000"]
                    *    quantity: {
                    *   total: "65",
                    *   purchased: "45",
                    *   left: "20"
                    *   }

                    *    isActive "false"
                    *    isPublished  "false"
                    *    status "IN_STOCK"
                    * }
                        */
            //get the job ids from the request body.
            const { jobIds, ...others } = req.body;

            //query the jobs record and update items based on their ids
            await prisma.jobs.updateMany({
                where: { id: { in: jobIds } },
                data: others,
            });

            //return successfully message
            return new ResponseHelper(res).success(
                `job${jobIds.length > 1 ? 's' : ''} successfully`
            );
        } catch (e) {
            console.log(e);
            return next(new ResponseHelper(res).error('Internal server error'));
        }
    }
}

export const jobsController = new JobsController();
