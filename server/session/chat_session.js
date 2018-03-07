const apm = require('elastic-apm-node');

const { defaultsDeep, mean } = require('lodash');
const { mapFieldToResponse } = require('./map_field_to_response');
const { getGames } = require('../games');

const proto = {
  name: null,
  waitingOn: null,
  game: null,
  scores: [],
  messages: {
    history: [],
    next: []
  }
};

const games = getGames();

class ChatSession {
  constructor(session) {
    this.initialized = false;

    this.save = () => {
      if (!this.initialized) {
        this.initialized = true;
        defaultsDeep(this, proto);
      }
      defaultsDeep(session.chat, this);
      return this;
    };
  }

  getResumed({ chat }) {
    defaultsDeep(this, chat, proto);
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
        revalidateResponse: 'Wait, who are you? What is your name?'
      };
    }
    return {
      isValid: true,
      revalidateResponse: null
    };
  }

  fulfillWait(input) {
    this.validateSession();

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

  setGame(game) {
    this.game = new games[game].Game(this);
    this.game.init();
    this.save();
  }

  endGame() {
    this.game = null;
    this.save();
  }

  addScore(score) {
    this.scores.push(score);
    this.save();
  }

  getAverageScore() {
    return mean(this.scores);
  }

  getGameWelcome() {
    const game = this.game;
    if (game !== null) {
      return this.game.getWelcome();
    } else {
      return `Weird, I don't know what game you wanted to play.`;
    }
  }
}

module.exports = { ChatSession };
