import * as Rx from 'rxjs';
import * as express from 'express';
import type { Bot, Chat } from '../../bot';
import { chatRoute } from './chat';
import { statsRoute } from './stats';

export function initRoutes(
  bot: Bot,
  app: express.Application,
  chats$: Rx.Subject<Chat>,
  errors$: Rx.Subject<Error>
) {
  statsRoute(app, bot);
  chatRoute(app, bot, chats$, errors$);
}
