const { DictionaryResponder } = require('../dictionary_responder');
const { jokes } = require('../dictionary');

class JokeResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.name = 'joke';
  }

  testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^joke ([1-9]+[0-9]?)$/);
    return input.match(/^joke\b/);
  }

  getResponse() {
    return this.getRandomOrRequested({
      prefix(index) {
        return `Here is joke number ${index}`;
      },
      dictionary: jokes
    });
  }
}

module.exports = { KeywordResponder: JokeResponder };
