import * as express from 'express-session';
import { ChatGame } from '../games';
import { handleChat, IChatResponse } from '../handle_chat';
import { SlackSession } from '../slackbot/lib';
import { IBot, ILog, IMetrics } from '../types';
import { ChatSession } from '../web/session';
import { Log, Metrics } from './';

const sessionGames = new Map(); // memory leak
const slackSessions = new Map();

export class Bot implements IBot {
  private metrics: Metrics;
  private slackChannelId;
  private slackBotId;
  private log: ILog;

  constructor() {
    this.metrics = new Metrics();
    this.log = this.getLogger(['bot', 'internal']);
  }

  public handleSlackChat(userId: string, chatBody): Promise<IChatResponse> {
    if (slackSessions.has(userId)) {
      this.log.debug(['slack', 'session'], `Found slack session ${userId}`);
      const sess = slackSessions.get(userId);
      return handleChat(chatBody, sess.chat);
    }

    // default, initialize
    this.log.debug(['slack', 'session'], `Create new slack session for ${userId}`);
    const slackSession = new SlackSession(userId, this);
    const chatSession = new ChatSession(this, slackSession);

    // init as valid session
    chatSession.init({ name: userId });
    slackSession.setChatSession(chatSession);

    // memory cache
    slackSessions.set(userId, slackSession);

    const bodyForInit = {
      format: 'user',
      message: 'name',
      time: chatBody.time,
    };
    return handleChat(bodyForInit, chatSession);
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
