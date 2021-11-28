import { DictionaryResponder } from './dictionary';

export default class NinjaFactResponder extends DictionaryResponder {
  public constructor(input: string) {
    super(input);
    this.setName('ninjafact').setDictionary('ninjafacts');
  }

  public testMatch(input: string) {
    this.setParsedRequestedDictionaryItem(input, /^ninjafact ([1-9]+[0-9]?)$/);
    return input.match(/^ninjafact\b/);
  }

  public async getResponse(): Promise<string> {
    return this.getRequested((i: number) => `Here is ninja fact number ${i}`);
  }
}
