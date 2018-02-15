const { defaults } = require('lodash');

class ChatGame {
  constructor(session) {
    this.save = () => {
      session.save();
    };
  }

  resume(session) {
    defaults(this, session);
  }
}

module.exports = { ChatGame };
