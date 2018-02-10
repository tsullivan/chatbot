const { keywordTester } = require('../keywords');
const { getNonsense } = require('../nonsense');
const { oneOf } = require('../one_of');
const { getFood } = require('../food');

class SmartMessage {
  constructor(messageText, messageFormat) {
    this.originalText = messageText;
    this.originalFormat = messageFormat;
    this.makeResponse();
  }

  makeResponse() {
    // test for different commands
    if (this.originalFormat === 'syn') {
      this.response = {
        format: 'plain',
        message: 'Hello! What is your name?'
      };
      return;
    }

    const { isKeyword, responder } = keywordTester(this.originalText);
    if (isKeyword) {
      this.response = responder.runKeyword();
      return;
    }

    const seedNounGenerators = [getFood];
    const { useNonsense, nonsense } = getNonsense(
      this.originalText,
      seedNounGenerators
    );
    if (useNonsense) {
      this.response = {
        format: 'plain',
        message: nonsense
      };
      return;
    }

    this.response = {
      format: 'plain',
      message: oneOf([getFood])
    };
  }

  getResponse() {
    return this.response;
  }
}

module.exports = { SmartMessage };
