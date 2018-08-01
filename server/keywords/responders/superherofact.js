const { DictionaryResponder } = require('../class_keyword_dictionary_responder');
const { superherofacts } = require('../dictionary');

class SuperHeroFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('superherofact');
    this.setDictionary(superherofacts);
  }

  testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^superherofact ([1-9]+[0-9]?)$/);
    return input.match(/^superherofact\b/);
  }

  justDont() {
    return `Just don't say "superherofact". I know some obscure facts about superkind.`;
  }

  getResponse() {
    return this.getRequested(i => `Here is superhero fact number ${i}`);
  }
}

module.exports = { KeywordResponder: SuperHeroFactResponder };
