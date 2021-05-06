import dotenv from 'dotenv';
import redis from 'redis';
import { logger } from './logger';

dotenv.config();

const { REDIS_URL = 'redis://redis-server:6379' } = process.env;

export const redisClient = redis.createClient({
  url: REDIS_URL,
});

export const init = async () =>
  new Promise((resolve, reject) => {
    redisClient.on('connect', () => {
      logger.info({
        message: `Redis client connected`,
      });
      resolve(redisClient);
    });

    redisClient.on('error', (error) => {
      reject(error);
    });
  });
 

