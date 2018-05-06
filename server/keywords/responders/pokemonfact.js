const { DictionaryResponder } = require('../dictionary_responder');
const { pokemonfacts } = require('../dictionary');

class PokemonFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.name = 'pokemonfact';
  }

  testMatch(input) {
    this.setParsedRequestedDictionaryItem(
      input,
      /^pokemonfact ([1-9]+[0-9]?)$/
    );
    return input.match(/^pokemonfact\b/);
  }

  getResponse() {
    return this.getRandomOrRequested({
      prefix(index) {
        return `Here is pokemon fact number ${index}`;
      },
      dictionary: pokemonfacts
    });
  }
}

module.exports = { KeywordResponder: PokemonFactResponder };
