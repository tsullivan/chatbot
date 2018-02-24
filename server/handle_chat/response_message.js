class ResponseMessage {
  constructor(userMessage) {
    this.userMessage = userMessage;
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

module.exports = { ResponseMessage };
