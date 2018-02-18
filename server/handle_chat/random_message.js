const { ChatResponder } = require('./chat_responder');
const { oneOf } = require('../one_of');
const { getFood } = require('../food');
const { getNormal } = require('../logs');
const {
  KeywordResponder: RandomKeywordResponder
} = require('../keywords/responders/random');
const { definitive, umm, neutral } = require('../wrap_noun');

class RandomMessage extends ChatResponder {
  constructor(_session, messageText, messageFormat) {
    super(messageText, messageFormat);
    this.response = this.makeResponse();
  }

  makeResponse() {
    return this.plain(
      oneOf([
        getNormal,
        () => oneOf([neutral(getFood), definitive(getFood), umm(getFood)]),
        () => new RandomKeywordResponder().getResponse()
      ])
    );
  }
}

module.exports = { RandomMessage };
