import compression from 'compression';
import { NextFunction } from 'connect';
import cors from 'cors';
import * as env from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import logger from './config/logger';
import { AppError, HTTP404Error } from './utils/HttpError';
import { rateLimitMiddleware } from './utils/rateLimit';
env.config()
const { PORT = 4000 } = process.env;

 
export const app = express();
app.set('port', PORT)
app.use(rateLimitMiddleware);
app.use(express.urlencoded({ extended: true })); // parse form requests
app.use(express.json()); //                         parse json requests
app.use(cors()); //                                 disable cors
app.use(compression()); //                          enable GZIP

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.all('*', (req, _res, next) => {
  next( new HTTP404Error(req.url) )
});

// Error handling
app.use((err:AppError, _req:Express.Request, res:any, _next:NextFunction) => {
  const code = err.statusCode || 500;
  if(code === 500){
    logger.error(err)
  } else {
    logger.warn(err)
  }
  res.status(code).json(err);
});

export default app;