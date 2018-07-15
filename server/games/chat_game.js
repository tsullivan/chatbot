const { defaults } = require('lodash');

class ChatGame {
  constructor(chat) {
    this.playerName = chat.name;

    this.save = () => {
      chat.save();
    };

    this.saveScore = score => {
      chat.addScore(score);
    };

    this.getAverageScore = () => {
      return chat.getAverageScore();
    };
  }

  setName(name) {
    this._name = name;
    return name;
  }
  getName() {
    return this._name;
  }

  resume(chat) {
    defaults(this, chat);
  }
}

module.exports = { ChatGame };
