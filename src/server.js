import express from 'express';
import dotenv from 'dotenv';
import { ErrorHandler } from './middleware/index.js';
import { apiRoute } from './routes/index.js';
import cors from 'cors';
import morgan from 'morgan';


// ## dot env config;
dotenv.config();

// ## initialize express server instance
const app = express();

// ## port
const port = process.env.PORT || 8000;

// ## host
const host = process.env.HOST || 'localhost';

// ## cors initialize
app.use(cors());

app.use(morgan('dev'));

// ## Express middleware to format all urls
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With,Content-Type, Accept, Authorization'
    );
    next();
});

// ## Uncaught Error Handler: this handler catches all type errors that may occur in the application, also runtime errors.
process.on('uncaughtException', (err) => {
    console.error(
        JSON.stringify({
            message: err.message,
            stack: err.stack,
            name: err.name,
        })
    );
    process.exit(0);
});

// ## Unhandled rejections that may occur during req, res lifecycle, during asynchronous calls and other external parties.
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(0);
});

// ## Express middleware to convert all request to json
app.use(express.json());

// ## initialize api routes
app.use(apiRoute);

// ## Inherits the parameters err, req, res, next from the middleware.
// ## another option is to app.use((err, req, res, next) => ErrorHandler.handle(err, req, res, next));
app.use(ErrorHandler.handle);

// ## Initialize server
app.listen(port, host, () => {
    console.log(`server listening to: https://${host}:${port}`);
});
