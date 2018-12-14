import { DictionaryResponder } from '../class_keyword_dictionary_responder';

class PokemonFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('pokemonfact').setDictionary('pokemonfacts');
  }

  public testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^pokemonfact ([1-9]+[0-9]?)$/);
    return input.match(/^pokemonfact\b/);
  }

  public getResponse() {
    return this.getRequested(i => `Here is pokemon fact number ${i}`);
  }
}

export const KeywordResponder = PokemonFactResponder;
