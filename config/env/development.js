import 'dotenv/config';

export default {
  DATABASE_URL: process.env.RENTO_POSTGRES_DEV_URL,
  REDIS_URL: process.env.REDIS_URL
};
