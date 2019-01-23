import * as apm from 'elastic-apm-node';
import { KeywordResponder as CKeywordResponder} from '../keyword_responder';

class WhatResponder extends CKeywordResponder {
  constructor(input, chat) {
    super(input);
    this.setName('what');
    this.setFormat('markdown');

    this.getResponse = async () => {
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
      return `I said:\n> ${prevMessage}`;
    };
  }

  public testMatch(input) {
    return input.match(/^what\b/);
  }
}

export const KeywordResponder = WhatResponder;
