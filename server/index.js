import { dirname } from 'path';
import { fileURLToPath } from 'url';
import app from './src/express.js';
import config from './config/env.js';
import logger from './src/helpers/logging.js';
import sequelize, { loadModels } from './src/models/index.js';

global.__dirname = dirname(fileURLToPath(import.meta.url));

app.listen(config.port, async () => {
  logger.info(`Server started on port ${config.port} (${config.env})`);
  await loadModels();
  await sequelize.authenticate();
});
