import { DictionaryResponder } from '../dictionary';

class FactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('fact').setDictionary('facts');
  }

  public testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^fact ([1-9]+[0-9]?)$/);
    return input.match(/^fact\b/);
  }

  public async getResponse(): Promise<string> {
    return this.getRequested(i => `Here is fact number ${i}`);
  }
}

export const KeywordResponder = FactResponder;
