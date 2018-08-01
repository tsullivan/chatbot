const { sample } = require('lodash');
const { KeywordResponder } = require('../class_keyword_responder');

class RememberResponder extends KeywordResponder {
  constructor(input, chat) {
    super(input);
    this.name = 'remember';
    this.getResponse = () => {
      const history = chat.getHistory();
      const thingSaid = String(sample(history)).trim();
      return `Remember that time you said, "${thingSaid}"? I do.`;
    };
  }

  testMatch(input) {
    return input.match(/^remember\b/);
  }

  justDont() {
    return `Just don't ask me "remember that one time." I probably don't.`;
  }
}

module.exports = { KeywordResponder: RememberResponder };
