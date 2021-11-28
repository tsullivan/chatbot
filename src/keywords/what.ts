import { KeywordResponder as CKeywordResponder} from './keyword_responder';
import { Session } from '../bot';

export default class WhatResponder extends CKeywordResponder {
  public constructor(input: string, { chat }: { chat: Session }) {
    super(input);
    this.setName('what');

    this.getResponse = async () => {
      let prevMessage;

      try {
        prevMessage = chat.getPrevBotMessage();
      } catch (err) {
        // errors$.next(err); // FIXME
        return 'An error has been logged.';
      }

      if (prevMessage === null) {
        return `I didn't say anything.`;
      }
      return `I said:\n> ${prevMessage}`;
    };
  }

  public testMatch(input: string) {
    return input.match(/^what/);
  }
}
