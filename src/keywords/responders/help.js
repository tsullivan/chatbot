const { KeywordResponder } = require('../class_keyword_responder');
const { getResponders } = require('../get_responders');

class HelpResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'help';
    this.setFormat('markdown');
  }

  testMatch(input) {
    return input.match(/^help\b/);
  }

  getResponse() {
    const responders = getResponders();
    const responderKeys = Object.keys(responders);
    const usableResponders = responderKeys.filter(key => {
      const responder = new responders[key].KeywordResponder();
      return responder.isListed() === true;
    });

    // check if ask for help about keyword
    const keywordMatches = this.input.match(/^help (\S+)$/);
    if (keywordMatches !== null) {
      const [_match, keyword] = keywordMatches;

      if (responders[keyword] !== undefined) {
        const responder = new responders[keyword].KeywordResponder();
        return responder.help();
      }
    }

    const items = usableResponders.reduce((accum, curr) => `${accum}\n- ${curr}`, '');
    return 'Here are keywords you can use:\n' + items;
  }
}

module.exports = { KeywordResponder: HelpResponder };