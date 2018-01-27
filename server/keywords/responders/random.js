const { sample } = require('lodash');
const { KeywordResponder } = require('../keyword_responder');
const { getResponders } = require('../get_responders');

class RandomResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'random';
  }

  testMatch(input) {
    return input.match(/^random\b/);
  }

  getRandomResponder() {
    const responders = getResponders();
    const names = Object.keys(responders);
    const name = sample(names);
    const responder = new responders[name].Responder();
    if (responder.isImpromptu()) {
      return responder;
    }
    return this.getRandomResponder(); // try again
  }

  getResponse() {
    const responder = this.getRandomResponder();
    return responder.getResponse();
  }
}

module.exports = { Responder: RandomResponder };
