import dotenv from 'dotenv';

dotenv.config();
const env = process.env.NODE_ENV || 'development';
const configs = {
  development: {
    env: 'development',
  },
  production: {
    env: 'production',
  },
};

const defaultConfig = {
  GAE_ENV: process.env.GAE_ENV,
  port: 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    name: process.env.DB_NAME,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    port: '5432',

  },
  jwtSecret: process.env.SECRET,
  tokenExpTime: '1d',
};

export default { ...defaultConfig, ...configs[env] };
