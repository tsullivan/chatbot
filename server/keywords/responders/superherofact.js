const { sample } = require('lodash');
const { KeywordResponder } = require('../keyword_responder');
const { getMessage } = require('../get_message');
const { superherofacts } = require('../dictionary');

class SuperHeroFactResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'superherofact';
  }

  testMatch(input) {
    return input.match(/^superherofact\b/);
  }

  isImpromptu() {
    return true;
  }

  getResponse() {
    const text = sample(superherofacts);
    return getMessage('plain', 'Here is a fact about super heroes:\n' + text);
  }
}

module.exports = { Responder: SuperHeroFactResponder };
