/**
 * @description Custom error class that extends the built-in Error class
 * @class
 * @classdesc Represents an error that occurred in the application
 * @extends Error
 */
export class ErrorHelper extends Error {
    /**
     * @description Create a new AppError object
     * @constructor
     * @param {string} message - The error message
     * @param {number} statusCode - The HTTP status code for the error
     */
    constructor(message, statusCode) {
        // Call the parent constructor with the error message
        super(message);
        // Set the status code and status based on the provided statusCode
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        // Set a flag to indicate that this error is operational
        this.isOperational = true;
        // Capture the stack trace for this error
        Error.captureStackTrace(this, this.constructor);
    }
}
