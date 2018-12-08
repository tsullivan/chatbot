import * as express from 'express-session';
import { IBot, ILog, IMetrics, TSessionGames } from '../types';
import { Log, Metrics } from './';

export class Bot implements IBot {
  private metrics: Metrics;
  private logger: Log;
  private sessionGames: TSessionGames;

  constructor() {
    this.logger = new Log();
    this.metrics = new Metrics();
  }

  public setSessionGames(sessionGames: TSessionGames) {
    this.sessionGames = sessionGames;
  }

  public getMetrics(req: express.Request): IMetrics {
    return this.metrics.getStats(req, this.sessionGames);
  }

  public getLogger(): ILog {
    return this.logger;
  }
}
