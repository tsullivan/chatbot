import * as cookieParser from 'cookie-parser';
import * as apmNode from 'elastic-apm-node';
import * as express from 'express';
import { join } from 'path';
import { apm as apmConfig } from '../config';
import { BOT_NAME, PORT } from '../constants';
import { initRoutes } from './routes';
import { initSession } from './session';

const apm = apmNode.start(apmConfig);

export function getServer(): express.Application {
  const app = express();

  const pubs = join(__dirname, '..', 'public');
  app.use(express.static(pubs)); // home html page, static js

  app.use(cookieParser());
  app.use(apm.middleware.connect());

  app.get('/', (req, res) => {
    res.sendFile(join(pubs, 'index.html'));
  });

  initSession(app);
  initRoutes(app);

  return app;
}

export function runServer(): void {
  const app = getServer();
  app.listen(PORT, () => {
    console.log(`${BOT_NAME} listening on [:${PORT}]`); // eslint-disable-line no-console
  });
}
