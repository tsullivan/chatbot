const { ResponseMessage } = require('./response_message');
const { oneOf } = require('../one_of');
const { getFood } = require('../food');
const { getNonsense } = require('../nonsense');
const { getNormal } = require('../logs');
const { KeywordResponder: Impromptu } = require('../keywords/responders/random');
const { definitive, umm, neutral } = require('../wrap_noun');

class RandomMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super(message, format);
    this.makeResponse = () => {
      return this.plain(
        oneOf([
          () => new Impromptu(null, chat).getResponse(),
          () => oneOf([getNormal, () => getNonsense(this.userMessage, [getFood])]),
          () => oneOf([neutral(getFood), definitive(getFood), umm(getFood)])
        ])
      );
    };

    this.response = this.makeResponse();
  }
}

module.exports = { RandomMessage };
