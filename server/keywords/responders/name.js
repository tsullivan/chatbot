const apm = require('elastic-apm-node');
const { KeywordResponder } = require('../class_keyword_responder');

class NameResponder extends KeywordResponder {
  constructor(input, chat) {
    super(input);
    this.name = 'name';

    this.getResponse = () => {
      let name;

      try {
        chat.setWaitOnName();
        name = chat.getName();
      } catch (err) {
        apm.captureError(err);
        return 'An error has been logged.';
      }

      if (name === null) {
        return 'I have no idea what your name is! What is it?';
      }
      return `I think your name is ${name}. What is it really?`;
    };
  }

  testMatch(input) {
    return input.match(/^name\b/);
  }
}

module.exports = { KeywordResponder: NameResponder };
