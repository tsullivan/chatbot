import { IMetrics } from '../types';

export class Metrics  {
  private sessionExpiresInMillis = 3600000;

  public getStats(): IMetrics {
    return {
      session_expires_in_sec: this.sessionExpiresInMillis / 1000
    };
  }
}
