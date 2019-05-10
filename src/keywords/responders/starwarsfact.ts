import { DictionaryResponder } from '../dictionary';

export class StarWarsFactResponder extends DictionaryResponder {
  public constructor(input: string) {
    super(input);
    this.setName('starwarsfact').setDictionary('starwarsfacts');
  }

  public testMatch(input: string) {
    this.setParsedRequestedDictionaryItem(input, /^starwarsfact ([1-9]+[0-9]?)$/);
    return input.match(/^starwarsfact\b/);
  }

  public async getResponse(): Promise<string> {
    return this.getRequested((i: number) => `Here is superhero fact number ${i}`);
  }
}
