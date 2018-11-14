import { DictionaryResponder } from '../class_keyword_dictionary_responder';

class JokeResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('joke').setDictionary('jokes');
  }

  public testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^joke ([1-9]+[0-9]?)$/);
    return input.match(/^joke\b/);
  }

  public getResponse() {
    return this.getRequested(i => `Here is joke number ${i}`);
  }
}

export const KeywordResponder = JokeResponder;
