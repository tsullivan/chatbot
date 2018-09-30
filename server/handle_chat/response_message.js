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

  _plain(message) {
    this.response = {
      format: 'plain',
      message,
    };

    return this.response;
  }

  _markdown(message) {
    this.response = {
      format: 'markdown',
      message,
    };

    return this.response;
  }

  respond(message, format = 'plain') {
    if (format === 'plain') {
      return this._plain(message);
    } else {
      return this._markdown(message);
    }
  }

  getResponse() {
    this.span.end();
    return this.response;
  }
}

module.exports = { ResponseMessage };
