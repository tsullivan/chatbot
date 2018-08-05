const { DictionaryResponder } = require('../class_keyword_dictionary_responder');

class SuperHeroFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('superherofact').setDictionary('superherofacts');
  }

  testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^superherofact ([1-9]+[0-9]?)$/);
    return input.match(/^superherofact\b/);
  }

  getResponse() {
    return this.getRequested(i => `Here is superhero fact number ${i}`);
  }
}

module.exports = { KeywordResponder: SuperHeroFactResponder };
