import * as Rx from 'rxjs';
import * as express from 'express';
import { ChatBody, ChatResponse } from '../types';
import { ChatGame, getGames } from '../games';
import { Log, Metrics } from '../lib';
import { ChatGameClass, GameSet } from '../games/lib/chat_game';
import { ResponderSet } from '../keywords/keyword_responder';
import { Session } from './session';
import { getResponders } from '../keywords';
import { handleChat } from './handle_chat';

const sessionGames = new Map(); // memory leak

export class Bot {
  private metrics: Metrics;
  private games: GameSet;
  private responders: ResponderSet;

  public constructor() {
    this.metrics = new Metrics();
    this.games = getGames();
    this.responders = getResponders();
  }

  public handleChat(
    body: ChatBody,
    session: Session,
    errors$: Rx.Subject<Error>
  ): Promise<ChatResponse> {
    return handleChat(body, session, errors$);
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
    return this.games;
  }

  public getResponders() {
    return this.responders;
  }

  public setGame(sessionId: string, game: ChatGame) {
    sessionGames.set(sessionId, game);
  }

  public removeGame(sessionId: string) {
    sessionGames.delete(sessionId);
  }
}
