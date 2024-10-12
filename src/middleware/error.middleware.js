/**
 * Class for handling errors
 * @class
 * @export ErrorHandler
 * @classdesc This class provides methods for handling errors in an Express application
 */
export class ErrorHandler {
    /**
     * Handle an error
     * @static
     * @param {Error} err - The error object
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     * @param {Function} next - The next middleware function
     */
    static handle(err, req, res, next) {
        // Set the status code and status if they are not already set
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error';

        // If the app is running in production mode
        if (process.env.NODE_ENV === 'production') {
            // Only send minimal error information to the client
            if (err.isOperational) {
                res.status(err.statusCode).json({
                    status: err.status,
                    message: err.message,
                });
            } else {
                // If the error is not operational, send a generic error message
                res.status(500).json({
                    status: 'error',
                    message: 'Something went wrong',
                });
            }
        } else {
            // If the app is running in development mode
            // Log the error to the console
            console.log(err);
            // Send detailed error information to the client
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
                stack: err.stack,
            });
        }
        next();
    }
}
