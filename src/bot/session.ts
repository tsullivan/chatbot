import 'express';
import * as _ from 'lodash';
import * as apm from 'elastic-apm-node';
import { Field, mapFieldToResponse } from './map_field_to_response';
import { Bot } from './bot';
import { ChatGame } from '../games';
import { ChatGameClass } from '../games/lib/chat_game';
import { SlackSession } from '../slackbot';
import { UserFormat } from '../types';

export interface WebSession extends Express.Session {
  chat?: Session;
}

interface ChatSessionInit {
  name?: string;
}

interface Proto {
  game: ChatGame | null;
  messages: {};
  name: string | null;
  scores: number[];
  waitingOn: string | null;
}

interface ValidateResponse {
  isValid: boolean;
  revalidateResponse?: string;
}

export const SessionProto: Proto = {
  game: null,
  messages: {
    next: [],
    prev: [],
    user_history: [], // eslint-disable-line @typescript-eslint/camelcase
  },
  name: null,
  scores: [],
  waitingOn: null,
};

export class Session {
  public save: () => Session;
  public hangup: () => Session;

  private initialized: boolean;
  private sessionId: string;
  private game: ChatGame | null;
  private scores: number[];
  private waitingOn: string | null;
  private name: string | null;
  private messages: {
    next: string[];
    prev: string[];
    user_history: string[];
  };
  private bot: Bot;

  public constructor(bot: Bot, session: WebSession | SlackSession) {
    this.initialized = false;
    this.sessionId = session.id;
    this.bot = bot;

    this.save = () => {
      if (!this.initialized) {
        this.initialized = true;
        _.defaultsDeep(this, SessionProto);
      }
      _.defaultsDeep(session.chat, this);
      return this;
    };

    this.hangup = () => {
      session.destroy(_.noop);
      this.initialized = false;
      Object.assign(this, SessionProto);
      return this.save();
    };
  }

  public init(opts: ChatSessionInit = {}): void {
    if (opts.name) {
      this.setName(opts.name);
    }
    this.save();
  }

  public getResumed({ chat }: WebSession) {
    _.defaultsDeep(this, chat, SessionProto);
    this.save();

    this.game = this.bot.getSessionGame(this.sessionId);
    return this;
  }

  public setWaitOnName() {
    this.waitingOn = 'name';
    this.save();
  }

  public setName(name: string) {
    this.name = name;
    this.save();
  }

  public getName() {
    return this.name;
  }

  public validateSession(format: UserFormat): ValidateResponse {
    if (this.name === null) {
      if (format === 'syn') {
        // browser refresh
        return { isValid: false };
      }

      if (this.waitingOn === null) {
        // somehow lost session data!
        const err = new Error('Session data got lost!');
        apm.captureError(err);

        this.setWaitOnName();
        return {
          isValid: false,
          revalidateResponse:
            'My brain hurts!!! I think I just lost all of my memory!!!\n What is your name?',
        };
      }
    }

    return { isValid: true };
  }

  public fulfillWait(input: string) {
    if (this.waitingOn !== null) {
      const field = this.waitingOn as Field;
      const { response, method } = mapFieldToResponse(field, input);

      // @ts-ignore - need to handle the method of a class
      if (response !== null && this[method] !== undefined) {
        // @ts-ignore- need to handle the method of a class
        const fn = this[method].bind(this);
        fn(input);

        this.waitingOn = null;
        this.pushNextBotMessage(response);
        this.save();
      }
    }
  }

  public pushNextBotMessage(message: string) {
    if (this.initialized) {
      this.messages.next.push(message);
      this.save();
    }
  }

  public popNextBotMessage() {
    let nextMessage = null;
    if (this.initialized) {
      const test = this.messages.next.pop();
      if (test !== undefined) {
        nextMessage = test;
      }
      this.save();
    }
    return nextMessage;
  }

  public addUserHistory(message: string) {
    this.messages.user_history.push(message);
    this.save();
  }
  public getUserHistory() {
    return this.messages.user_history;
  }

  public addBotMessage(message: string) {
    this.messages.prev.push(message);
    this.save();
  }
  public getPrevBotMessage() {
    const { prev } = this.messages;
    return prev[prev.length - 1];
  }

  public setGame(game: string) {
    const GameModule: ChatGameClass = this.bot.getGameClass(game);
    if (!GameModule) {
      throw new Error('Invalid game string: ' + game);
    }
    this.game = new GameModule(this);
    this.game.init();
    this.save();
    this.bot.setGame(this.sessionId, this.game);
  }

  public getGame() {
    return this.game;
  }

  public getGames() {
    return this.bot.getGames();
  }

  public endGame() {
    this.addScore(this.game.score);
    this.game = null;
    this.save();
    this.bot.removeGame(this.sessionId);
  }

  public addScore(score: number) {
    this.scores.push(score);
    this.save();
  }

  public getAverageScore() {
    return _.mean(this.scores);
  }

  public getGameWelcome() {
    if (this.game != null) {
      return this.game.getWelcome();
    } else {
      return `Weird, I don't know what game you wanted to play.`;
    }
  }
}
