import * as express from 'express';
import { ChatBody, ChatResponse, GameSet } from '../types';
import { ChatGame, getGames } from '../games';
import { Log, Metrics } from '../lib';
import { ChatGameClass } from '../games/lib/chat_game';
import { Session } from './session';
import { handleChat } from './handle_chat';

const sessionGames = new Map(); // memory leak

export class Bot {
  private metrics: Metrics;
  private games: GameSet;
  private isInitialized: boolean;

  public constructor() {
    this.metrics = new Metrics();
    this.isInitialized = false;
  }

  public async init(): Promise<this> {
    this.games = await getGames();
    this.isInitialized = true;
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

  public setGame(sessionId: string, game: ChatGame) {
    sessionGames.set(sessionId, game);
  }

  public removeGame(sessionId: string) {
    sessionGames.delete(sessionId);
  }
}
