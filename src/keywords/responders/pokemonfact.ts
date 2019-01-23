import { DictionaryResponder } from '../dictionary';

class PokemonFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('pokemonfact').setDictionary('pokemonfacts');
  }

  public testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^pokemonfact ([1-9]+[0-9]?)$/);
    return input.match(/^pokemonfact\b/);
  }

  public async getResponse(): Promise<string> {
    return this.getRequested(i => `Here is pokemon fact number ${i}`);
  }
}

export const KeywordResponder = PokemonFactResponder;
