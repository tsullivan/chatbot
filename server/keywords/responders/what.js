const apm = require('elastic-apm-node');
const { KeywordResponder } = require('../class_keyword_responder');

class WhatResponder extends KeywordResponder {
  constructor(input, chat) {
    super(input);
    this.name = 'what';

    this.getResponse = () => {
      let prevMessage;

      try {
        prevMessage = chat.getPrevBotMessage();
      } catch (err) {
        apm.captureError(err);
        return 'An error has been logged.';
      }

      if (prevMessage === null) {
        return `I didn't say anything.`;
      }
      return `I said: ${prevMessage}`;
    };
  }

  testMatch(input) {
    return input.match(/^what\b/);
  }
}

module.exports = { KeywordResponder: WhatResponder };
