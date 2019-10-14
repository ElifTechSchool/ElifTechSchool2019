import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import errorHandle from './middleware/errorHandle.js';
import logger from './helpers/logging.js';
import routes from './routes/index.js';
import validator from 'swagger-express-validator';
import { swaggerSpec } from './routes/swagger.js';
import util from 'util';
const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true, parameterLimit: 1000 }));
app.use(compress());
app.use(helmet());
app.use(cors());

app.use(validator({
    swaggerSpec, // Swagger schema
    preserveResponseContentType: false,
    returnRequestErrors: true, // Include list of request validation errors with response, default is false
    returnResponseErrors: true, // Include list of response validation errors with response, default is false
    validateRequest: true,
    validateResponse: true,
    requestValidationFn: (req, data, errors) => {
        console.log(`failed request validation: ${req.method} ${req.originalUrl}\n ${util.inspect(errors)}`)
    },
    responseValidationFn: (req, data, errors) => {
        console.log(`failed response validation: ${req.method} ${req.originalUrl}\n ${util.inspect(errors)}`)
    },
}));

// normal log, before routes
app.use(logger.requestLogger);

// mount all routes
app.use('/', routes);

// Operational errors
app.use(errorHandle);

export default app;
