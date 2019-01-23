import { DictionaryResponder } from '../dictionary';

class StarWarsFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('starwarsfact').setDictionary('starwarsfacts');
  }

  public testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^starwarsfact ([1-9]+[0-9]?)$/);
    return input.match(/^starwarsfact\b/);
  }

  public async getResponse(): Promise<string> {
    return this.getRequested(i => `Here is superhero fact number ${i}`);
  }
}

export const KeywordResponder = StarWarsFactResponder;
