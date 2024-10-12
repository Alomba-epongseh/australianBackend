import { ErrorHelper } from './../helpers/index.js';
import fetch from 'node-fetch';

/**
 * Utility class for making HTTP requests.
 */
class RequestUtility {
    /**
     * Makes an HTTP request to the specified URL with the given options.
     * @async
     * @param {string} url - The URL to make the request to.
     * @param {object} options - The options to pass to the fetch function.
     * @returns {Promise<object>} A Promise that resolves with the parsed JSON response data.
     */
    async makeRequest(url, options) {
        try {
            /**
             * Sends an HTTP request to the specified URL with the specified options and returns the response object.
             * @async
             * @type {object}
             * @property {boolean} ok - Whether the request was successful (status in the range 200-299) or not.
             * @property {number} status - The HTTP status code returned by the server.
             * @property {string} statusText - The HTTP status message returned by the server.
             * @property {function} json - A function that returns a `Promise` that resolves to the response data as a JSON object.
             * @property {function} text - A function that returns a `Promise` that resolves to the response data as a string.
             * @property {function} blob - A function that returns a `Promise` that resolves to the response data as a `Blob`.
             * @property {function} arrayBuffer - A function that returns a `Promise` that resolves to the response data as an `ArrayBuffer`.
             * @throws {Error} - If an error occurs while sending the request or parsing the response data.
             */
            const response = await fetch(url, options);

            /**
             * Parses the response data as a JSON object and returns it as a `Promise`.
             * @async
             * @function
             * @returns {Promise<object>} - A Promise that resolves to the response data as a JSON object.
             * @throws {SyntaxError} - If the response data is not valid JSON.
             */
            const data = await response.json();

            /**
             * Returns the JSON data obtained from the HTTP request.
             * @param {object} data - The JSON data obtained from the HTTP request.
             * @returns {object} - The JSON data obtained from the HTTP request.
             */
            return data;
        } catch (e) {
            return new ErrorHelper(
                `Error occurred: ${e}`,
                500
            );
        }
    }
}

/**
 * An instance of the RequestUtility class for making HTTP requests.
 * @type {RequestUtility}
 */
export const requestUtility = new RequestUtility();
