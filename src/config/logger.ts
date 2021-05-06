  
import dotenv from 'dotenv';
import winston from 'winston';
import Sentry from 'winston-transport-sentry-node';

dotenv.config();

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({ handleExceptions: true }),
    new Sentry({
      sentry: {
        dsn: process.env.SENTRY_DSN,
      },
      handleExceptions: true,
    }),
  ],
});

export default logger;