const { KeywordResponder } = require('../keyword_responder');
const { getMessage } = require('../get_message');
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
    const text = jokes[0];
    return getMessage('plain', 'Here is a joke:\n' + text);
  }
}

module.exports = { Responder: JokeResponder };
