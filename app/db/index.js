import db from './setup/postgres';
import redisDB from './setup/redis';

export { db as default, redisDB };
