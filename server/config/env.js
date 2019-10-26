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
  cloud: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  jwtSecret: process.env.SECRET,
  jwtRefreshSecret: process.env.REFRESH_TOKEN_SECRET,
  tokenExpTime: '1d',
  refreshTokenExpTime: '60d',
  email: process.env.EMAIL,
  emailPass: process.env.EMAIL_PASS,
  frontEndUrl: process.env.FRONT_END_URL || 'http://localhost:8080',
};

export default { ...defaultConfig, ...configs[env] };
