import { DictionaryResponder } from '../dictionary';

class WorldFactResponder extends DictionaryResponder {
  public constructor(input: string) {
    super(input);
    this.setName('worldfact').setDictionary('worldfacts');
  }

  public testMatch(input: string) {
    this.setParsedRequestedDictionaryItem(input, /^worldfact ([1-9]+[0-9]?)$/);
    return input.match(/^worldfact\b/);
  }

  public async getResponse(): Promise<string> {
    return this.getRequested((i: number) => `Here is world fact number ${i}`);
  }
}

export const KeywordResponder = WorldFactResponder;
