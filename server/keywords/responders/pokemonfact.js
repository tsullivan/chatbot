const { DictionaryResponder } = require('../class_keyword_dictionary_responder');
const { pokemonfacts } = require('../dictionary');

class PokemonFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('pokemonfact');
    this.setDictionary(pokemonfacts);
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
