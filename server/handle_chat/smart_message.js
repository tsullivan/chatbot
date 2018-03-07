const { ResponseMessage } = require('./response_message');
const { keywordTester } = require('../keywords');

class SmartMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super(message, format);
    this.response = this.makeResponse(chat);
  }

  makeResponse(chat) {
    const { isKeyword, responder } = keywordTester(this.userMessage, chat);
    if (isKeyword) {
      return this.plain(responder.runKeyword());
    }
    return null;
  }
}

module.exports = { SmartMessage };
