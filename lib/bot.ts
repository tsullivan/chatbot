import { IBot } from '../types';
import { Log } from './';

export class Bot implements IBot {
  private metrics: any;
  private logger: Log;

  constructor() {
    this.logger = new Log();
    this.metrics = {};
  }

  public getMetrics() {
    return this.metrics;
  }

  public getLogger(): Log {
    return this.logger;
  }



}
