import app from './src/express.js';
import config from './config/env.js';
import logger from './src/helpers/logging.js';
import sequelize from './src/models/index.js';

app.listen(config.port, async () => {
  logger.info(`Server started on port ${config.port} (${config.env})`);
  await sequelize.authenticate();
});
