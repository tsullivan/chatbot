const { ResponseMessage } = require('./response_message');
const { keywordTester } = require('../keywords');

class SmartMessage extends ResponseMessage {
  constructor(session, messageText, messageFormat) {
    super(messageText, messageFormat);
    this.response = this.makeResponse(session);
  }

  makeResponse(session) {
    const { isKeyword, responder } = keywordTester(this.userMessage, session);
    if (isKeyword) {
      return this.plain(responder.runKeyword());
    }
    return null;
  }
}

module.exports = { SmartMessage };
