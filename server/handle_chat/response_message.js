const apm = require('elastic-apm-node');

class ResponseMessage {
  constructor(name, chat, userMessage, userFormat) {
    this.span = apm.startSpan(`${name}Span`);
    this.name = name;
    this.userMessage = userMessage;
    this.userFormat = userFormat;
    this.response = this.makeResponse(chat);
  }

  makeResponse(_chat) {
    /*
     * override this
     */
  }

  getName() {
    return this.name;
  }

  plain(message) {
    this.response = {
      format: 'plain',
      message
    };

    return this.response;
  }

  getResponse() {
    this.span.end();
    return this.response;
  }
}

module.exports = { ResponseMessage };
