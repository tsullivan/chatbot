import * as express from 'express-session';
import { Bot } from '../..//bot';

export function statsRoute(app: express.Application, bot: Bot) {
  app.get('/stats', (req: express.Request, res) => {
    res.json(bot.getMetrics(req));
  });
}
