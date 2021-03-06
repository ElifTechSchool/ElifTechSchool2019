import dotenv from 'dotenv';

dotenv.config();
const env = process.env.NODE_ENV || 'development';
const configs = {
  development: {
    env: 'development',
    frontEndUrl: 'http://localhost:8080/',
  },
  production: {
    env: 'production',
    frontEndUrl: process.env.FRONT_END_URL,
  },
};

const defaultConfig = {
  GAE_ENV: process.env.GAE_ENV,
  port: process.env.PORT || 3000,
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
  email: process.env.EMAIL,
  emailPass: process.env.EMAIL_PASS,
};

export default { ...defaultConfig, ...configs[env] };
