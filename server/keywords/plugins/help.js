const { KeywordResponder } = require('../keyword_responder');
const { getPlugins } = require('../get_plugins');
const { getMessage } = require('../get_message');

class HelpResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.pluginName = 'help';
  }

  testMatch() {
    return this.input.match(/^help\b/);
  }

  getResponse() {

    const plugins = Object.keys(getPlugins());
    return getMessage('help', 'Here are keywords you can use:\n' + plugins.join(', '));
  }
}

module.exports = { Responder: HelpResponder };
