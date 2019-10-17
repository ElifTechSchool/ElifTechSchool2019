import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import errorHandle from './middleware/errorHandle.js';
import logger from './helpers/logging.js';
import routes from './routes/index.js';

import OpenApiValidator from 'express-openapi-validator';
import { swaggerSpec } from './routes/swagger.js';
import util from 'util';

const app = express();
const validator = OpenApiValidator.OpenApiValidator;
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true, parameterLimit: 1000 }));
app.use(compress());
app.use(helmet());
app.use(cors());

new validator({
    apiSpec: swaggerSpec,
    // securityHandlers: { ... }, // <-- if using security
    validateResponses: true, // <-- to validate responses
    // unknownFormats: ['my-format'] // <-- to provide custom formats
}).install(app);

// normal log, before routes
app.use(logger.requestLogger);

// mount all routes
app.use('/', routes);

// Operational errors
app.use(errorHandle);

export default app;
