import * as apm from 'elastic-apm-node';
import { KeywordResponder as CKeywordResponder} from '../keyword_responder';
import { Session } from '../../bot';

class WhatResponder extends CKeywordResponder {
  public constructor(input: string, chat: Session) {
    super(input);
    this.setName('what');
    this.setResponseFormat('markdown');

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

  public testMatch(input: string) {
    return input.match(/^what\b/);
  }
}

export const KeywordResponder = WhatResponder;
