const { sample } = require('lodash');
const { KeywordResponder } = require('../class_keyword_responder');
const { getFactResponders } = require('../get_responders');

class FactResponder extends KeywordResponder {
  constructor(input, chat) {
    super(input);
    this.name = 'fact';

    this.getFactResponder = () => {
      const responders = getFactResponders();
      const names = Object.keys(responders);
      const name = sample(names);
      return new responders[name].KeywordResponder(null, chat);
    };
  }

  testMatch(input) {
    return input.match(/^fact\b/);
  }

  getResponse() {
    const responder = this.getFactResponder();
    return responder.getResponse();
  }
}

module.exports = { KeywordResponder: FactResponder };
