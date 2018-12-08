import * as cookieParser from 'cookie-parser';
import * as apmNode from 'elastic-apm-node';
import * as express from 'express';
import { join } from 'path';
import { apm as apmConfig } from '../config';
import { BOT_NAME, PORT } from '../constants';
import { Bot } from '../lib';
import { IBot } from '../types';
import { initRoutes } from './routes';
import { initSession } from './session';

const apm = apmNode.start(apmConfig);

/*
 * Exported for tests
 */
export function getServer(bot: IBot = new Bot()): express.Application {
  const app = express();

  const pubs = join(__dirname, '..', 'public');
  app.use(express.static(pubs)); // home html page, static js

  app.use(cookieParser());
  app.use(apm.middleware.connect());

  app.get('/', (req, res) => {
    res.sendFile(join(pubs, 'index.html'));
  });

  initSession(app, bot);
  initRoutes(app, bot);

  return app;
}

export function runServer(bot: IBot): void {
  const app = getServer(bot);
  const log = bot.getLogger();

  app.listen(PORT, () => {
    log.info([], `${BOT_NAME} listening on [:${PORT}]`);
  });
}
