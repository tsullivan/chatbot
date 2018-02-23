const { KeywordResponder } = require('../keyword_responder');
const { getMessage } = require('../get_message');

class NameResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'name';

    this.getResponse = () => {
      return getMessage('plain', `As far as I know, your name is foo.`);
    };
  }

  testMatch(input) {
    return input.match(/^name\b/);
  }

  isImpromptu() {
    return true;
  }
}

module.exports = { Responder: NameResponder };
