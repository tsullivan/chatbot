const { KeywordResponder } = require('../keyword_responder');
const { getResponders } = require('../get_responders');

class HelpResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'help';
  }

  testMatch(input) {
    return input.match(/^help\b/);
  }

  getResponse() {
    const responders = getResponders();
    const responderKeys = Object.keys(responders);

    // check if ask for help about keyword
    const keywordMatches = this.input.match(/^help (\S+)$/);
    if (keywordMatches !== null) {
      const [ _match, keyword ] = keywordMatches; //eslint-disable-line no-unused-vars

      if (responders[keyword] !== undefined) {
        const responder = new responders[keyword].Responder();
        return responder.help();
      }
    }

    return 'Here are keywords you can use:\n' + responderKeys.join(', ');
  }
}

module.exports = { Responder: HelpResponder };
