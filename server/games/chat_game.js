const { defaults } = require('lodash');

class ChatGame {
  constructor(chat) {
    this.playerName = chat.getName();

    this.save = () => {
      chat.save();
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
