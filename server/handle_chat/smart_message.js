const { ChatResponder } = require('./chat_responder');
const { keywordTester } = require('../keywords');

class SmartMessage extends ChatResponder {
  constructor(session, messageText, messageFormat) {
    super(messageText, messageFormat);
    this.originalText = messageText;
    this.originalFormat = messageFormat;
    this.response = this.makeResponse(session);
  }

  makeResponse(session) {
    const { isKeyword, responder } = keywordTester(this.originalText, session);
    if (isKeyword) {
      return this.plain(responder.runKeyword());
    }
    return null;
  }
}

module.exports = { SmartMessage };
