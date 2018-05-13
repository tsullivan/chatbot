const { sample } = require('lodash');
const { KeywordResponder } = require('../../keyword_responder');
const [ setA, setB ] = require('./words');

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
    const set = sample([ setA, setB ]);
    const { adjectives, nouns } = set;
    return sample(adjectives) + ' ' + sample(nouns);
  }
}

module.exports = { KeywordResponder: PhraseResponder };
