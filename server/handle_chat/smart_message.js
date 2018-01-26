const { keywordTester } = require('../keywords');

class SmartMessage {

  constructor(messageText, messageFormat) {
    this.originalText = messageText;
    this.originalFormat = messageFormat;
    this.findResponse();
  }

  findResponse() {
    // test for different commands
    if (this.originalFormat === 'syn') {
      this.response = {
        format: 'plain',
        message: 'Hello! What is your name?'
      };
    } else {
      const { isKeyword, responder } = keywordTester(this.originalText);
      if (isKeyword) {
        this.response = responder.getResponse();
      } else {
        this.response = {
          format: 'plain',
          message: `Interesting that you would say "${this.originalText}"`
        };
      }
    }
  }

  getResponse() {
    return this.response;
  }

}

module.exports = { SmartMessage };
