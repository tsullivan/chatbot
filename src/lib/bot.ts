import * as express from 'express-session';
import { ChatGame } from '../games';
import { IBot, ILog, IMetrics } from '../types';
import { Log, Metrics } from './';

const sessionGames = new Map(); // memory leak

export class Bot implements IBot {
  private metrics: Metrics;
  private logger: Log;
  private slackChannelId;
  private slackBotId;

  constructor() {
    this.logger = new Log();
    this.metrics = new Metrics();
  }

  public getMetrics(req: express.Request): IMetrics {
    return this.metrics.getStats(req, sessionGames);
  }

  public getLogger(tags?: string[]): ILog {
    if (tags) {
      this.logger.addTags(tags);
    }
    return this.logger;
  }

  public getSessionGame(sessionId: string): ChatGame {
    return sessionGames.get(sessionId);
  }

  public setGame(sessionId: string, game: ChatGame) {
    sessionGames.set(sessionId, game);
  }

  public removeGame(sessionId: string) {
    sessionGames.delete(sessionId);
  }

  public setSlackChannel(channelId: string) {
    this.slackChannelId = channelId;
  }
  public getSlackChannel() {
    return this.slackChannelId;
  }
  public setSlackBotId(botId: string) {
    this.slackBotId = botId;
  }
  public getSlackBotId() {
    return this.slackBotId;
  }
}
