import * as express from 'express';
import { ChatGame } from '../games';
import { Log, Metrics } from '../lib';
import { ChatBody, ChatResponse } from '../types';
import { ChatSession } from './chat_session';
import { handleChat } from './handle_chat';

const sessionGames = new Map(); // memory leak

export class Bot {
  private metrics: Metrics;

  public constructor() {
    this.metrics = new Metrics();
  }

  public handleChat(body: ChatBody, session: ChatSession): Promise<ChatResponse> {
    return handleChat(body, session);
  }

  public getMetrics(req: express.Request) {
    return this.metrics.getStats(req, sessionGames);
  }

  public getLogger(tags?: string[]): Log {
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
