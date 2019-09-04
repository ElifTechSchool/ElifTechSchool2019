/* eslint-disable */
import fs from 'fs';
import Sequelize from 'sequelize';
import { extname, join } from 'path';
import config from '../../config/env.js';
import logger from '../helpers/logging.js';

let models = {};
const { Op, UniqueConstraintError } = Sequelize;
const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: 'postgres',
  pool: { max: 5, min: 0, idle: 300000, acquire: 300000 },
  port: config.db.port,
  logging: (log) => logger.debug(log),
});

const loadModels = async () => {
  const result = await Promise.all(fs.readdirSync(__dirname)
    .filter((file) => (extname(file) === '.js') && (file !== 'index.js'))
    .map((file) => import(join(__dirname, file))
      .then(result => {
        const model = result.default.init(sequelize);
        return [model.name, model];
      })
    ));
  models = Object.fromEntries(result);
  Object.keys(models)
    .forEach((model) => typeof models[model].associate === 'function' && models[model].associate(models));
};

export default sequelize;
export { models, Op, UniqueConstraintError, loadModels };
