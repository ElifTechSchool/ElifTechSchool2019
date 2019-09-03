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
};

export default { ...defaultConfig, ...configs[env] };
