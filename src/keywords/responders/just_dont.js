const { KeywordResponder } = require('../class_keyword_responder');
const { getResponders } = require('../get_responders');
const { sample } = require('lodash');

class JustDontResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'just_dont';
  }

  testMatch(input) {
    return input.match(/^just_dont\b/);
  }

  isListed() {
    return false;
  }

  getResponse() {
    // get a random "just dont" message
    const responders = getResponders();
    const responderKey = sample(Object.keys(responders));
    const responder = new responders[responderKey].KeywordResponder();
    return responder.justDont();
  }
}

module.exports = { KeywordResponder: JustDontResponder };
