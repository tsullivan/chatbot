const { ResponseMessage } = require('./response_message');
const { oneOf } = require('../one_of');
const { getFood } = require('../food');
const { getNonsense } = require('../nonsense');
const { getNormal } = require('../logs');
const { KeywordResponder: Impromptu } = require('../keywords/responders/random');

class RandomMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super('random', chat, message, format);
    chat.addHistory(message);
  }

  makeResponse(chat) {
    const sayImpromptu = () => new Impromptu(null, chat).getResponse();
    const sayFoodOrNonsense = () =>
      oneOf([getFood, () => getNonsense(this.userMessage, [getFood])]);

    return this.plain(oneOf([getNormal, sayImpromptu, sayFoodOrNonsense]));
  }
}

module.exports = { RandomMessage };
