const { DictionaryResponder } = require('../class_keyword_dictionary_responder');

class JokeResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('joke').setDictionary('jokes');
  }

  testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^joke ([1-9]+[0-9]?)$/);
    return input.match(/^joke\b/);
  }

  getResponse() {
    return this.getRequested(i => `Here is joke number ${i}`);
  }
}

module.exports = { KeywordResponder: JokeResponder };
