const { DictionaryResponder } = require('../class_keyword_dictionary_responder');
const { starwarsfacts } = require('../dictionary');

class StarWarsFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.setName('starwarsfact');
    this.setDictionary(starwarsfacts);
  }

  testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^starwarsfact ([1-9]+[0-9]?)$/);
    return input.match(/^starwarsfact\b/);
  }

  justDont() {
    return `Just don't say "starwarsfact". I know way too much about Star Wars.`;
  }

  getResponse() {
    return this.getRequested(i => `Here is superhero fact number ${i}`);
  }
}

module.exports = { KeywordResponder: StarWarsFactResponder };
