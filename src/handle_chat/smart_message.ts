import * as apm from 'elastic-apm-node';
import { keywordTester } from '../keywords';
import { ResponseMessage } from './response_message';

export class SmartMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super('smart', chat, message, format);
  }

  public makeResponse(chat) {
    const { isKeyword, responder } = keywordTester(this.userMessage, chat);

    if (isKeyword) {
      apm.setTag('keyword', responder.getName());
      return this.respond(responder.runKeyword(), responder.getFormat());
    }
    return null;
  }
}
