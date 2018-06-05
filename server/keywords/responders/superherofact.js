const { DictionaryResponder } = require('../dictionary_responder');
const { superherofacts } = require('../dictionary');

class SuperHeroFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.name = 'superherofact';
  }

  testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^superherofact ([1-9]+[0-9]?)$/);
    return input.match(/^superherofact\b/);
  }

  justDont() {
    return `Just don't say "superherofact". I know some obscure facts about superkind.`;
  }

  getResponse() {
    return this.getRandomOrRequested({
      prefix(index) {
        return `Here is superhero fact number ${index}`;
      },
      dictionary: superherofacts,
    });
  }
}

module.exports = { KeywordResponder: SuperHeroFactResponder };
