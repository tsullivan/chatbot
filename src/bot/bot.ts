import * as express from 'express-session';
import { ChatGame } from '../games';
import { Log, Metrics } from '../lib';
import { IChatBody, IChatResponse, ILog, IMetrics } from '../types';
import { ChatSession } from '../web/session';
import { handleChat } from './handle_chat';

const sessionGames = new Map(); // memory leak

export class Bot {
  private metrics: Metrics;

  constructor() {
    this.metrics = new Metrics();
  }

  public handleChat(body: IChatBody, session: ChatSession): Promise<IChatResponse> {
    return handleChat(body, session);
  }

  public getMetrics(req: express.Request): IMetrics {
    return this.metrics.getStats(req, sessionGames);
  }

  public getLogger(tags?: string[]): ILog {
    const logger = new Log();
    if (tags) {
      logger.addTags(tags);
    }
    return logger;
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
}
