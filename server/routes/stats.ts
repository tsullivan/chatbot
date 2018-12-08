import * as express from 'express-session';
import { IBot } from '../../types';

export function statsRoute(app: express.Application, bot: IBot) {
  app.get('/stats', (req, res) => {
    res.json({
      session_expires_in_sec: req.session.cookie.maxAge / 1000,
    });
  });
}
