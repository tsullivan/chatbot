import * as express from 'express-session';
import { IBot } from '../../types';

export function statsRoute(app: express.Application, bot: IBot) {
  app.get('/stats', (req: express.Request, res) => {
    res.json(bot.getMetrics(req));
  });
}
