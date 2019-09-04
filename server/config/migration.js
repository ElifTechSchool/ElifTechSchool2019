require('dotenv').config();

module.exports = {
  development: {
    logging: true,
    dialect: 'postgres',
    migrationStorageTableName: 'migration_meta',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    port: '5432',
  },
  production: {
    logging: true,
    dialect: 'postgres',
    migrationStorageTableName: 'migration_meta',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    port: '5432',
  },
};
