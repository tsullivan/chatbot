import { DictionaryResponder } from '../dictionary';

class SuperHeroFactResponder extends DictionaryResponder {
  public constructor(input: string) {
    super(input);
    this.setName('superherofact').setDictionary('superherofacts');
  }

  public testMatch(input: string) {
    this.setParsedRequestedDictionaryItem(input, /^superherofact ([1-9]+[0-9]?)$/);
    return input.match(/^superherofact\b/);
  }

  public async getResponse(): Promise<string> {
    return this.getRequested((i: number) => `Here is superhero fact number ${i}`);
  }
}

export const KeywordResponder = SuperHeroFactResponder;
