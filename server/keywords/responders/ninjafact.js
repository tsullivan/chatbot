const { DictionaryResponder } = require('../class_keyword_dictionary_responder');

class NinjaFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('ninjafact').setDictionary('ninjafacts');
  }

  testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^ninjafact ([1-9]+[0-9]?)$/);
    return input.match(/^ninjafact\b/);
  }

  getResponse() {
    return this.getRequested(i => `Here is ninja fact number ${i}`);
  }
}

module.exports = { KeywordResponder: NinjaFactResponder };
