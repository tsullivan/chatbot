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

  getName() {
    return this.name;
  }

  resume(chat) {
    defaults(this, chat);
  }
}

module.exports = { ChatGame };
