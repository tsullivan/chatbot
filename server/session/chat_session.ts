import * as apm from 'elastic-apm-node';
import { defaultsDeep, mean } from 'lodash';
import { Bot } from '../../lib';
import { getGames } from '../games';
import { ChatGame } from '../games/chat_game';
import { mapFieldToResponse } from './map_field_to_response';

const sessionGames = new Map(); // memory leak

const proto = {
  game: null,
  messages: {
    next: [],
    prev: [],
    user_history: [],
  },
  name: null,
  scores: [],
  waitingOn: null,
};

const games = getGames();

export class ChatSession {
  public save: () => ChatSession;
  public hangup: () => ChatSession;
  public init: () => void;

  private initialized: boolean;
  private sessionId: string;
  private game: ChatGame | null;
  private scores: number[];
  private waitingOn: string | null;
  private name: string | null;
  private messages: {
    next: string[],
    prev: string[],
    user_history: string[],
  };

  constructor(private bot: Bot, session) {
    this.initialized = false;
    this.sessionId = session.id;
    this.bot.setSessionGames(sessionGames);

    this.save = () => {
      if (!this.initialized) {
        this.initialized = true;
        defaultsDeep(this, proto);
      }
      defaultsDeep(session.chat, this);
      return this;
    };

    this.hangup = () => {
      session.destroy();
      this.initialized = false;
      Object.assign(this, proto);
      return this.save();
    };
  }

  public getResumed({ chat }) {
    defaultsDeep(this, chat, proto);
    this.save();
    this.game = sessionGames.get(this.sessionId);
    return this;
  }

  public setWaitOnName() {
    this.waitingOn = 'name';
    this.save();
  }

  public setName(name) {
    this.name = name;
    this.save();
  }

  public getName() {
    return this.name;
  }

  public validateSession(format) {
    if (this.name === null) {
      if (format === 'syn') {
        // browser refresh
        return false;
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

  public fulfillWait(input) {
    if (this.waitingOn !== null) {
      const field = this.waitingOn;
      const { response, method } = mapFieldToResponse(field, input);

      if (response !== null && this[method] !== undefined) {
        const fn = this[method].bind(this);
        fn(input);

        this.waitingOn = null;
        this.pushNextBotMessage(response);
        this.save();
      }
    }
  }

  public pushNextBotMessage(message) {
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

  public addUserHistory(message) {
    this.messages.user_history.push(message);
    this.save();
  }
  public getUserHistory() {
    return this.messages.user_history;
  }

  public addBotMessage(message) {
    this.messages.prev.push(message);
    this.save();
  }
  public getPrevBotMessage() {
    const { prev } = this.messages;
    return prev[prev.length - 1];
  }

  public setGame(game) {
    const gameModule = games[game];
    if (!gameModule || !gameModule.Game) {
      throw new Error('Invalid game string: ' + game);
    }
    this.game = new gameModule.Game(this);
    this.game.init();
    this.save();
    sessionGames.set(this.sessionId, this.game); // store game data in server memory
  }
  public getGame() {
    return this.game;
  }

  public endGame() {
    this.addScore(this.game.score);
    this.game = null;
    this.save();
    sessionGames.delete(this.sessionId);
  }

  public addScore(score) {
    this.scores.push(score);
    this.save();
  }

  public getAverageScore() {
    return mean(this.scores);
  }

  public getGameWelcome() {
    if (this.game != null) {
      return this.game.getWelcome();
    } else {
      return `Weird, I don't know what game you wanted to play.`;
    }
  }
}
