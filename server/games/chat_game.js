const { defaults } = require('lodash');

class ChatGame {
  constructor(session) {
    this.playerName = session.name;

    this.save = () => {
      session.save();
    };

    this.saveScore = score => {
      session.addScore(score);
    };

    this.getAverageScore = () => {
      return session.getAverageScore();
    };
  }

  resume(session) {
    defaults(this, session);
  }
}

module.exports = { ChatGame };
