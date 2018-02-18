const { ResponseMessage } = require('./response_message');
const { oneOf } = require('../one_of');
const { getFood } = require('../food');
const { getNonsense } = require('../nonsense');
const { getNormal } = require('../logs');
const {
  KeywordResponder: Impromptu
} = require('../keywords/responders/random');
const { definitive, umm, neutral } = require('../wrap_noun');

class RandomMessage extends ResponseMessage {
  constructor(_session, message, format) {
    super(message, format);
    this.response = this.makeResponse();
  }

  makeResponse() {
    return this.plain(
      oneOf([
        () => new Impromptu().getResponse(),
        () => oneOf([getNormal, () => getNonsense(this.userMessage, [getFood])]),
        () => oneOf([neutral(getFood), definitive(getFood), umm(getFood)])
      ])
    );
  }
}

module.exports = { RandomMessage };
