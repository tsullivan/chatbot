const { ResponseMessage } = require('./response_message');
const { KeywordResponder: Impromptu } = require('../keywords/responders/random');

class RandomMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super('random', chat, message, format);
  }

  makeResponse(chat) {
    return this.plain(new Impromptu(null, chat).getResponse());
  }
}

module.exports = { RandomMessage };
