const { keywordTester } = require('../keywords');
const { getNonsense } = require('../nonsense');
const { oneOf } = require('../one_of');
const { getFood } = require('../food');
const { definitive, neutral, umm } = require('../wrap_noun');

class SmartMessage {
  constructor(session, messageText, messageFormat) {
    this.originalText = messageText;
    this.originalFormat = messageFormat;
    this.makeResponse(session);
  }

  makeResponse(session) {
    session.fulfillWait(this.originalText);
    const nextBotMessage = session.popNextBotMessage();
    if (nextBotMessage !== null) {
      this.response = {
        format: 'plain',
        message: nextBotMessage,
      };
      return;
    }

    // test for different commands
    if (this.originalFormat === 'syn') {
      this.response = {
        format: 'plain',
        message: 'Hello! What is your name?'
      };
      session.setWaitOnName();
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
      message: oneOf([definitive(getFood), neutral(getFood), umm(getFood)])
    };
  }

  getResponse() {
    return this.response;
  }
}

module.exports = { SmartMessage };
