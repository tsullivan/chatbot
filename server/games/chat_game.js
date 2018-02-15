const { defaults } = require('lodash');

class ChatGame {
  constructor() {
    this.score = 0;
  }

  resume(session) {
    defaults(this, session);
  }
}

module.exports = { ChatGame };
