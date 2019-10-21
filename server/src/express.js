import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import OpenApiValidator from 'express-openapi-validator';
import errorHandle from './middleware/errorHandle.js';
import logger from './helpers/logging.js';
import routes from './routes/index.js';

import { swaggerSpec } from './routes/swagger.js';

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true, parameterLimit: 1000 }));
app.use(compress());
app.use(helmet());
app.use(cors());

new OpenApiValidator.OpenApiValidator({
  apiSpec: swaggerSpec,
  // securityHandlers: { ... }, // <-- if using security
  validateResponses: true, // <-- to validate responses
  // unknownFormats: ['my-format'] // <-- to provide custom formats
}).install(app);

app.use(logger.requestLogger);
app.use('/', routes);
app.use(errorHandle);

export default app;
