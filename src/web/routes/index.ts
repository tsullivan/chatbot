import * as express from 'express-session';
import { Bot } from '../../bot';
import { chatRoute } from './chat';
import { statsRoute } from './stats';

export function initRoutes(bot: Bot, app: express.Application) {
  statsRoute(app, bot);
  chatRoute(app, bot);
}
