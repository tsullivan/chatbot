const apm = require('elastic-apm-node');
const { ResponseMessage } = require('./response_message');
const { keywordTester } = require('../keywords');

class SmartMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super('smart', chat, message, format);
  }

  makeResponse(chat) {
    const { isKeyword, responder } = keywordTester(this.userMessage, chat);

    if (isKeyword) {
      apm.setTag('keyword', responder.getName());
      return this.respond(responder.runKeyword(), responder.getFormat());
    }
    return null;
  }
}

module.exports = { SmartMessage };
