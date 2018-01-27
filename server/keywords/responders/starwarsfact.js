const { sample } = require('lodash');
const { KeywordResponder } = require('../keyword_responder');
const { getMessage } = require('../get_message');
const { starwarsfacts } = require('../dictionary');

class StarWarsFactResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'starwarsfact';
  }

  testMatch(input) {
    return input.match(/^starwarsfact\b/);
  }

  isImpromptu() {
    return true;
  }

  getResponse() {
    const text = sample(starwarsfacts);
    return getMessage('plain', 'Here is a fact about Star Wars:\n' + text);
  }
}

module.exports = { Responder: StarWarsFactResponder };
