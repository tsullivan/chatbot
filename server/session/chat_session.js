const apm = require('elastic-apm-node');

const { defaultsDeep, mean } = require('lodash');
const { mapFieldToResponse } = require('./map_field_to_response');
const { getGames } = require('../games');

const sessionGames = new Map(); // memory leak

const proto = {
  _name: null,
  _waitingOn: null,
  _game: null,
  _scores: [],
  _messages: {
    history: [],
    next: [],
  },
};

const games = getGames();

class ChatSession {
  constructor(session) {
    this.initialized = false;
    this.sessionId = session.id;

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
    this._game = sessionGames.get(this.sessionId);
    return this;
  }

  setWaitOnName() {
    this._waitingOn = 'name';
    this.save();
  }

  setName(name) {
    this._name = name;
    this.save();
  }

  getName() {
    return this._name;
  }

  validateSession(format) {
    if (this._name === null) {
      if (format === 'syn') {
        // browser refresh
        return false;
      }

      if (this._waitingOn === null) {
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

  fulfillWait(input) {
    if (this._waitingOn !== null) {
      const field = this._waitingOn;
      const { response, method } = mapFieldToResponse(field, input);

      if (response !== null && this[method] !== undefined) {
        const fn = this[method].bind(this);
        fn(input);

        this._waitingOn = null;
        this.pushNextBotMessage(response);
        this.save();
      }
    }
  }

  pushNextBotMessage(message) {
    if (this.initialized) {
      this._messages.next.push(message);
      this.save();
    }
  }

  popNextBotMessage() {
    let nextMessage = null;
    if (this.initialized) {
      const test = this._messages.next.pop();
      if (test !== undefined) {
        nextMessage = test;
      }
      this.save();
    }
    return nextMessage;
  }

  addHistory(message) {
    this._messages.history.push(message);
    this.save();
  }

  getHistory() {
    return this._messages.history;
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
    this._scores.push(score);
    this.save();
  }

  getAverageScore() {
    return mean(this._scores);
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
