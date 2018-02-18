const { DictionaryResponder } = require('../dictionary_responder');
const { starwarsfacts } = require('../dictionary');

class StarWarsFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.name = 'starwarsfact';
  }

  testMatch(input) {
    this.setParsedRequestedDictionaryItem(
      input,
      /^starwarsfact ([1-9]+[0-9]?)$/
    );
    return input.match(/^starwarsfact\b/);
  }

  getResponse() {
    return this.getRandomOrRequested({
      prefix(index) {
        return `Here is Star Wars fact number ${index}`;
      },
      dictionary: starwarsfacts
    });
  }
}

module.exports = { KeywordResponder: StarWarsFactResponder };
