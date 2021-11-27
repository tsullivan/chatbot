import * as express from 'express';
import { MetricStats, SessionGames } from '../types';

export class Metrics {
  public getStats(req: express.Request, sessionGames: SessionGames): MetricStats {
    return {
      games: {
        total: sessionGames.size,
      },
      session_expires_in_sec: req.session.cookie.maxAge / 1000,
      users: {
        names: ['tim', 'brach', 'spethen'],
      },
    };
  }
}
