const { KeywordResponder } = require('../keyword_responder');
const { getResponders } = require('../get_responders');
const { getMessage } = require('../get_message');

class HelpResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'help';
  }

  testMatch(input) {
    return input.match(/^help\b/);
  }

  getResponse() {
    const responders = Object.keys(getResponders());
    return getMessage('help', 'Here are keywords you can use:\n' + responders.join(', '));
  }
}

module.exports = { Responder: HelpResponder };
