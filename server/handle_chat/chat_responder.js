class ChatResponder {
  constructor(messageText, messageFormat) {
    this.originalText = messageText;
    this.originalFormat = messageFormat;
    this.response = null;
  }

  plain(message) {
    this.response = {
      format: 'plain',
      message
    };

    return this.response;
  }

  getResponse() {
    return this.response;
  }
}

module.exports = { ChatResponder };
