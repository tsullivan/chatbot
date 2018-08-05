const { DictionaryResponder } = require('../class_keyword_dictionary_responder');

class PokemonFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('pokemonfact').setDictionary('pokemonfacts');
  }

  testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^pokemonfact ([1-9]+[0-9]?)$/);
    return input.match(/^pokemonfact\b/);
  }

  getResponse() {
    return this.getRequested(i => `Here is pokemon fact number ${i}`);
  }
}

module.exports = { KeywordResponder: PokemonFactResponder };
