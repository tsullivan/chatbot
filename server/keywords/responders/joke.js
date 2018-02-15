const { sample } = require('lodash');
const { KeywordResponder } = require('../keyword_responder');
const { jokes } = require('../dictionary');

class JokeResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'joke';
  }

  testMatch(input) {
    return input.match(/^joke\b/);
  }

  isImpromptu() {
    return true;
  }

  getResponse() {
    const text = sample(jokes);
    return 'Here is a joke:\n' + text;
  }
}

module.exports = { KeywordResponder: JokeResponder };
