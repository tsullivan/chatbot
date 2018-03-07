const { sample } = require('lodash');
const { KeywordResponder } = require('../keyword_responder');
const { getResponders } = require('../get_responders');

class RandomResponder extends KeywordResponder {
  constructor(input, chat) {
    super(input);
    this.name = 'random';

    this.getRandomResponder = () => {
      const responders = getResponders();
      const names = Object.keys(responders);
      const name = sample(names);
      const responder = new responders[name].KeywordResponder(null, chat);
      if (responder.isImpromptu()) {
        return responder;
      }
      return this.getRandomResponder(); // try again
    };
  }

  testMatch(input) {
    return input.match(/^random\b/);
  }


  getResponse() {
    const responder = this.getRandomResponder();
    return responder.getResponse();
  }
}

module.exports = { KeywordResponder: RandomResponder };
