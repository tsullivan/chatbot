import * as express from 'express';
import { Bot } from '../..//bot';

export function statsRoute(app: express.Application, bot: Bot) {
  app.get('/stats', (req: express.Request, res) => {
    res.json({
      session: req.session.chat,
      metrics: bot.getMetrics(req),
    });
  });
}
