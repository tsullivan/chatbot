import * as express from 'express-session';
import { IMetrics } from '../types';

export class Metrics  {
  public getStats(req: express.Request, sessionGames): IMetrics {
    return {
      session_expires_in_sec: req.session.cookie.maxAge / 1000,
    };
  }
}
