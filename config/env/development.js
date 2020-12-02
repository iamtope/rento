import 'dotenv/config';

export default {
  DATABASE_URL: process.env.SFC_POSTGRES_DEV_URL,
  REDIS_URL: process.env.REDIS_URL
};
