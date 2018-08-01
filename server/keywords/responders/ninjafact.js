const { DictionaryResponder } = require('../class_keyword_dictionary_responder');
const { ninjafacts } = require('../dictionary');

class NinjaFactResponder extends DictionaryResponder {
  constructor(input) {
    super(input);
    this.name = 'ninjafact';
  }

  testMatch(input) {
    this.setParsedRequestedDictionaryItem(input, /^ninjafact ([1-9]+[0-9]?)$/);
    return input.match(/^ninjafact\b/);
  }

  getResponse() {
    return this.getRandomOrRequested({
      prefix(index) {
        return `Here is ninja fact number ${index}`;
      },
      dictionary: ninjafacts,
    });
  }
}

module.exports = { KeywordResponder: NinjaFactResponder };
