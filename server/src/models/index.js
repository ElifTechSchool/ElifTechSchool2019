import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import Sequelize from 'sequelize';
import { extname, join, dirname } from 'path';
import config from '../../config/env.js';
import logger from '../helpers/logging.js';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const { Op, UniqueConstraintError } = Sequelize;
const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: 'postgres',
  pool: { max: 5, min: 0, idle: 300000, acquire: 300000 },
  port: config.db.port,
  logging: (log) => logger.debug(log),
});

const models = Object.fromEntries(fs.readdirSync(__dirname)
  .filter((file) => (extname(file) === '.js') && (file !== 'index.js'))
  .map((file) => {
      const model = require(join(__dirname, file)).init(sequelize);
      return [model.name, model];
    }
  ));

Object.keys(models)
  .forEach((model) => typeof models[model].associate === 'function' && models[model].associate(models));

export default sequelize;
export { models, Op, UniqueConstraintError };
