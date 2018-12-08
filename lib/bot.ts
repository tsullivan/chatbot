import * as express from 'express-session';
import { IBot, ILog, IMetrics } from '../types';
import { Log, Metrics } from './';

export class Bot implements IBot {
  private metrics: Metrics;
  private logger: Log;

  constructor() {
    this.logger = new Log();
    this.metrics = new Metrics();
  }

  public getMetrics(req: express.Request): IMetrics {
    return this.metrics.getStats();
  }

  public getLogger(): ILog {
    return this.logger;
  }



}
