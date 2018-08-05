const { DictionaryResponder } = require('../class_keyword_dictionary_responder');

class StarWarsFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('starwarsfact').setDictionary('starwarsfacts');
  }

  testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^starwarsfact ([1-9]+[0-9]?)$/);
    return input.match(/^starwarsfact\b/);
  }

  getResponse() {
    return this.getRequested(i => `Here is superhero fact number ${i}`);
  }
}

module.exports = { KeywordResponder: StarWarsFactResponder };
