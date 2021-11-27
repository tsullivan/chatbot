import * as Rx from 'rxjs';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { BOT_NAME, PORT } from '../constants';
import type { Bot, Chat } from '../bot';
import { initRoutes } from './routes';
import { initSession } from './session';
import { join } from 'path';

/*
 * Exported for tests
 */
export async function getServer(
  bot: Bot,
  chats$: Rx.Subject<Chat>,
  errors$: Rx.Subject<Error>
): Promise<express.Application> {
  const app = express();

  const pubs = join(__dirname, '..', '..', 'public');
  app.use(express.static(pubs)); // home html page, static js

  app.use(cookieParser());

  app.get('/', (_req, res) => {
    res.sendFile(join(pubs, 'index.html'));
  });

  initSession(bot, app);
  initRoutes(bot, app, chats$, errors$);

  return app;
}

export async function runServer(
  bot: Bot,
  chats$: Rx.Subject<Chat>,
  errors$: Rx.Subject<Error>
): Promise<void> {
  const app = await getServer(bot, chats$, errors$);
  const log = bot.getLogger(['web', 'server']);

  app.listen(PORT, () => {
    log.info(['listen'], `${BOT_NAME} listening on [:${PORT}]`);
  });
}
