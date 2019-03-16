import { DictionaryResponder } from '../dictionary';

class WorldFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('worldfact').setDictionary('worldfacts');
  }

  public testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^worldfact ([1-9]+[0-9]?)$/);
    return input.match(/^worldfact\b/);
  }

  public async getResponse(): Promise<string> {
    return this.getRequested(i => `Here is world fact number ${i}`);
  }
}

export const KeywordResponder = WorldFactResponder;
