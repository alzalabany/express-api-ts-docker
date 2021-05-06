import http from "http";
import { app } from './server';

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

http.createServer(app).listen(4000, () =>
  console.log(`Server is running http://localhost:${app.get('port')}...`)
);