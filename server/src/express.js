import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import errorHandle from './middleware/errorHandle.js';
import logger from './helpers/logging.js';
import routes from './routes/index.js';

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true, parameterLimit: 1000 }));
app.use(compress());
app.use(helmet());
app.use(cors());

// normal log, before routes
app.use(logger.requestLogger);

// mount all routes
app.use('/', routes);

// Operational errors
app.use(errorHandle);

export default app;
