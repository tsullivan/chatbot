const { DictionaryResponder } = require('../class_keyword_dictionary_responder');
const { jokes } = require('../dictionary');

class JokeResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.name = 'joke';
    this.dictionary = jokes;
  }

  testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^joke ([1-9]+[0-9]?)$/);
    return input.match(/^joke\b/);
  }

  justDont() {
    return `Just don't say "joke 7". PLEASE`;
  }

  getResponse() {
    return this.getRequested(i => `Here is joke number ${i}`);
  }
}

module.exports = { KeywordResponder: JokeResponder };
