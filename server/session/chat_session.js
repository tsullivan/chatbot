const apm = require('elastic-apm-node');

const { defaultsDeep, mean } = require('lodash');
const { mapFieldToResponse } = require('./map_field_to_response');
const { getGames } = require('../games');

const sessionGames = new Map(); // memory leak

const proto = {
  name: null,
  waitingOn: null,
  scores: [],
  messages: {
    history: [],
    next: [],
  },
  _game: null,
};

const games = getGames();

class ChatSession {
  constructor(session) {
    this.initialized = false;
    this.sessionId = session.id;
    this._game = null;

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
      this.save();
    };
  }

  getResumed({ chat }) {
    defaultsDeep(this, chat, proto);
    this.save();
    this._game = sessionGames.get(this.sessionId) || null;
    return this;
  }

  setWaitOnName() {
    this.waitingOn = 'name';
    this.save();
  }

  setName(name) {
    this.name = name;
    this.save();
  }

  getName() {
    return this.name;
  }

  validateSession() {
    if (this.waitingOn === null && this.name === null) {
      // somehow lost session data!
      const err = new Error('Session data got lost!');
      apm.captureError(err);

      this.setWaitOnName();
      return {
        isValid: false,
        revalidateResponse: 'Wait, who are you? What is your name?',
      };
    }
    return {
      isValid: true,
      revalidateResponse: null,
    };
  }

  fulfillWait(input) {
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

  pushNextBotMessage(message) {
    if (this.initialized) {
      this.messages.next.push(message);
      this.save();
    }
  }

  popNextBotMessage() {
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

  addHistory(message) {
    this.messages.history.push(message);
    this.save();
  }

  getHistory() {
    return this.messages.history;
  }

  setGame(game) {
    this._game = new games[game].Game(this);
    this._game.init();
    this.save();
    sessionGames.set(this.sessionId, this._game); // store game data in server memory
  }
  getGame() {
    return this._game;
  }

  endGame() {
    this.addScore(this._game.score);
    this._game = null;
    this.save();
    sessionGames.delete(this.sessionId);
  }

  addScore(score) {
    this.scores.push(score);
    this.save();
  }

  getAverageScore() {
    return mean(this.scores);
  }

  getGameWelcome() {
    if (this._game != null) {
      return this._game.getWelcome();
    } else {
      return `Weird, I don't know what game you wanted to play.`;
    }
  }
}

module.exports = { ChatSession };
