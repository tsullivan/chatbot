import * as express from 'express';
import { ChatBody, ChatResponse, GameSet } from '../types';
import { ChatGame, getGames } from '../games';
import { Log, Metrics } from '../lib';
import { ChatGameClass } from '../games/lib/chat_game';
import { ResponderSet } from '../keywords/keyword_responder';
import { Session } from './session';
import { getResponders } from '../keywords';
import { handleChat } from './handle_chat';

const sessionGames = new Map(); // memory leak

export class Bot {
  private metrics: Metrics;
  private games: GameSet;
  private responders: ResponderSet;
  private isInitialized: boolean;
  private logger: Log;

  public constructor() {
    this.metrics = new Metrics();
    this.isInitialized = false;
    this.logger = this.getLogger(['bot', 'internal']);
  }

  public async init(): Promise<this> {
    this.logger.info([], 'init has been called');

    const [gamesTemp, respondersTemp] = await Promise.all([
      getGames(),
      getResponders(),
    ]);

    this.games = gamesTemp;
    this.responders = respondersTemp;

    this.isInitialized = true;
    this.logger.info([], 'init is complete');
    return this;
  }

  public handleChat(body: ChatBody, session: Session): Promise<ChatResponse> {
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

  public getGameClass(game: string): ChatGameClass {
    return this.games[game];
  }

  public getGames() {
    if (!this.isInitialized) {
      throw new Error('Async error: init must be called');
    }
    return this.games;
  }

  public getResponders() {
    if (!this.isInitialized) {
      throw new Error('Async error: init must be called');
    }
    return this.responders;
  }

  public setGame(sessionId: string, game: ChatGame) {
    sessionGames.set(sessionId, game);
  }

  public removeGame(sessionId: string) {
    sessionGames.delete(sessionId);
  }
}
