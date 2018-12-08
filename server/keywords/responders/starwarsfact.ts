import { DictionaryResponder } from '../class_keyword_dictionary_responder';

class StarWarsFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('starwarsfact').setDictionary('starwarsfacts');
  }

  public testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^starwarsfact ([1-9]+[0-9]?)$/);
    return input.match(/^starwarsfact\b/);
  }

  public getResponse() {
    return this.getRequested(i => `Here is superhero fact number ${i}`);
  }
}

export const KeywordResponder = StarWarsFactResponder;