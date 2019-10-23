import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import OpenApiValidator from 'express-openapi-validator';
import errorHandle from './middleware/errorHandle.js';
import logger from './helpers/logging.js';
import config from '../config/env.js';
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

app.use(jwt({
  secret: config.jwtSecret,
  credentialsRequired: false,
  getToken: (req) => {
    if (req.url.includes('/tokens')) {
      return null;
    }
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
}));

// mount all routes
app.use('/', routes);
app.use(errorHandle);

export default app;
