import * as apmNode from 'elastic-apm-node';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { BOT_NAME, PORT } from '../constants';
import { Bot } from '../bot';
import { apm as apmConfig } from '../../config';
import { initRoutes } from './routes';
import { initSession } from './session';
import { join } from 'path';

const apm = apmNode.start(apmConfig);

/*
 * Exported for tests
 */
export function getServer(bot: Bot = new Bot()): express.Application {
  const app = express();

  const pubs = join(__dirname, '..', '..', 'public');
  app.use(express.static(pubs)); // home html page, static js

  app.use(cookieParser());
  app.use(apm.middleware.connect());

  app.get('/', (req, res) => {
    res.sendFile(join(pubs, 'index.html'));
  });

  initSession(bot, app);
  initRoutes(bot, app);

  return app;
}

export function runServer(bot: Bot): void {
  const app = getServer(bot);
  const log = bot.getLogger(['web', 'server']);

  app.listen(PORT, () => {
    log.info(['listen'], `${BOT_NAME} listening on [:${PORT}]`);
  });
}
