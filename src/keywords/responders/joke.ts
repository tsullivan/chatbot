import { DictionaryResponder } from '../dictionary';

export class JokeResponder extends DictionaryResponder {
  public constructor(input: string) {
    super(input);
    this.setName('joke').setDictionary('jokes');
  }

  public testMatch(input: string) {
    this.setParsedRequestedDictionaryItem(input, /^joke ([1-9]+[0-9]?)$/);
    return input.match(/^joke\b/);
  }

  public async getResponse(): Promise<string> {
    return this.getRequested((i: number) => `Here is joke number ${i}`);
  }
}
