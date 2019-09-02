import app from './src/express.js';
import config from './config/env.js';
import logger from './src/helpers/logging.js';

app.listen(config.port, () => logger.info(`Server started on port ${config.port} (${config.env})`));
