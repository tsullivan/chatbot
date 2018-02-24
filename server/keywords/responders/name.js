const { KeywordResponder } = require('../keyword_responder');

class NameResponder extends KeywordResponder {
  constructor(input, chat) {
    super(input);
    this.name = 'name';

    this.getResponse = () => {
      chat.setWaitOnName();
      const name = chat.getName();
      if (name === null) {
        return 'I have no idea what your name is! What is it?';
      }
      return `I think your name is ${name}. What is it really?`;
    };
  }

  testMatch(input) {
    return input.match(/^name\b/);
  }

  isImpromptu() {
    return true;
  }
}

module.exports = { KeywordResponder: NameResponder };
