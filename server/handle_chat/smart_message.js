const { ChatResponder } = require('./chat_responder');
const { keywordTester } = require('../keywords');
const { getNonsense } = require('../nonsense');
const { oneOf } = require('../one_of');
const { getFood } = require('../food');
const { getNormal } = require('../logs');
const { KeywordResponder: RandomResponder } = require('../keywords/responders/random');
const { definitive, umm, neutral } = require('../wrap_noun');

class SmartMessage extends ChatResponder {
  constructor(session, messageText, messageFormat) {
    super(messageText, messageFormat);
    this.originalText = messageText;
    this.originalFormat = messageFormat;

    this.makeResponse(session);
  }

  makeResponse(session) {
    const { isKeyword, responder } = keywordTester(this.originalText, session);
    if (isKeyword) {
      return this.setPlain(responder.runKeyword());
    }

    const seedNounGenerators = [getFood];
    const { useNonsense, nonsense } = getNonsense(this.originalText, seedNounGenerators);
    if (useNonsense) {
      return this.setPlain(nonsense);
    }

    return this.setPlain(
      oneOf([
        neutral(getFood), definitive(getFood), umm(getFood),
        getNormal,
        () => (new RandomResponder()).getResponse()
      ])
    );
  }

  getResponse() {
    return this.response;
  }
}

module.exports = { SmartMessage };
