const { getMessage } = require('./get_message');

class KeywordResponder {

  constructor(input) {
    this.input = input;
    this.pluginName = null;
  }

  isImpromptu() {
    return false;
  }

  testMatch(input) {
    return input.match(/^$/);
  }

  inputMatches() {
    return this.testMatch(this.input) !== null;
  }

  help() {
    return getMessage('help', `Type \`${this.pluginName}\` and see what happens...`);
  }

  getResponse() {
    return getMessage('plain', 'Nothing to say.');
  }

  runKeyword() {
    const needsHelpMatches = this.input.match(/ help\b$/);
    if (needsHelpMatches !== null) {
      return this.help();
    }

    return this.getResponse();
  }

}

module.exports = { KeywordResponder };
