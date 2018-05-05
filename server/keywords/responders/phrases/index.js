const { sample } = require('lodash');
const { KeywordResponder } = require('../../keyword_responder');
const { nouns, adjectives } = require('./words');

class PhraseResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'phrase';
  }

  isImpromptu() {
    return true;
  }

  testMatch(input) {
    return input.match(/^phrase\b/);
  }

  getResponse() {
    return sample(adjectives) + ' ' + sample(nouns);
  }
}

module.exports = { KeywordResponder: PhraseResponder };
