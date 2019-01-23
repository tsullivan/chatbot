import { DictionaryResponder } from '../dictionary';

class NinjaFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('ninjafact').setDictionary('ninjafacts');
  }

  public testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^ninjafact ([1-9]+[0-9]?)$/);
    return input.match(/^ninjafact\b/);
  }

  public async getResponse(): Promise<string> {
    return this.getRequested(i => `Here is ninja fact number ${i}`);
  }
}

export const KeywordResponder = NinjaFactResponder;
