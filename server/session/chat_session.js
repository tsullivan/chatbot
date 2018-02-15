const { defaultsDeep } = require('lodash');
const { mapFieldToResponse } = require('./map_field_to_response');
const { getGames } = require('../games');

const proto = {
  name: null,
  waitingOn: null,
  game: null,
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
      defaultsDeep(session, this);
    };
  }

  getInitial() {
    this.initialized = true;
    defaultsDeep(this, proto);
    return this;
  }
  getResumed({ chat }) {
    defaultsDeep(this, chat, proto);
    return this;
  }

  setWaitOnName() {
    this.waitingOn = 'name';
    this.save();
  }

  fulfillWait(response) {
    if (this.waitingOn !== null) {
      const mappedResponse = mapFieldToResponse(this.waitingOn, response);
      if (mappedResponse !== null) {
        this.pushNextBotMessage(mappedResponse);
      }
      this.waitingOn = null;

      this.save();
      return true;
    }
    return false;
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

  setGame(game) {
    this.game = new games[game].Game(this);
    this.game.init();
    this.save();
  }

  endGame() {
    this.game = null;
    this.save();
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
