const { KeywordResponder } = require('../keyword_responder');
const { getPlugins } = require('../get_plugins');
const { getMessage } = require('../get_message');

class RandomResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.pluginName = 'random';
  }

  testMatch(input) {
    return input.match(/^random\b/);
  }

  getResponse() {
    return getMessage('plain', 'random message here!!');
  }
}

module.exports = { Responder: RandomResponder };
