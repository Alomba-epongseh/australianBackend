import { ErrorHelper } from './error.helper.js';
import { cipherUtility } from '../utilities/index.js';

/**
 * A helper class for sending HTTP responses.
 */
export class ResponseHelper {
    /**
     * Create a new ResponseHelper instance.
     * @param {Object} res - The Express response object.
     */
    constructor(res) {
        this.res = res;
    }

    /**
     * Send a success response with the given data and HTTP status code.
     * @param {Object} data - The response data.
     * @param {number} [statusCode=200] - The HTTP status code (default 200).
     * @param {object | null} metaData - The meta data eg: pagination meta data etc
     */
    success(data, statusCode = 200, metaData = null) {
        let responseObject = {
            token: cipherUtility.encryptUtility(this.res.req?.user),
            status: 'success',
            data,
            permissions: this.res.req?.user?.metaData?.permissions,
            role: this.res.req?.user?.metaData?.role
        };
        metaData && (responseObject['metaData'] = metaData);
        return this.res.status(statusCode).json(responseObject);
    }

    /**
     * Send an error response with the given message and HTTP status code.
     * @param {string} message - The error message.
     * @param {number} [statusCode=500] - The HTTP status code (default 500).
     */
    error(message, statusCode = 500) {
        return new ErrorHelper(message, statusCode);
    }
}