const { ResponseMessage } = require('./response_message');
const { KeywordResponder: Impromptu } = require('../keywords/responders/random');

class RandomMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super('random', chat, message, format);
  }

  makeResponse(chat) {
    const responder = new Impromptu(null, chat);
    return this.respond(responder.getResponse(), responder.getFormat());
  }
}

module.exports = { RandomMessage };
