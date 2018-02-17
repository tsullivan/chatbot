const { defaultsDeep, mean } = require('lodash');
const { mapFieldToResponse } = require('./map_field_to_response');
const { getGames } = require('../games');

const proto = {
  name: 'foo',
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
      this.initialized = true;
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

  fulfillWait(input) {
    if (this.waitingOn !== null) {
      const field = this.waitingOn;
      this.waitingOn = null;
      const { response, method } = mapFieldToResponse(field, input);

      if (response !== null && this[method] !== undefined) {
        const fn = this[method].bind(this);
        fn(input);
        this.pushNextBotMessage(response);
        this.save();
      }
    }
  }

  pushNextBotMessage(message) {
    this.messages.next.push(message);
    this.save();
  }

  popNextBotMessage() {
    const nextMessage = this.messages.next.pop();
    if (nextMessage === undefined) {
      return null;
    }
    this.save();
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
