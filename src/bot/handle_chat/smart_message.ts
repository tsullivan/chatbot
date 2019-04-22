import * as apm from 'elastic-apm-node';
import { keywordTester } from '../../keywords';
import { ChatResponse } from '../../types';
import { ResponseMessage } from './response_message';

export class SmartMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super('smart', chat, message, format);
  }

  public makeResponse(chat): Promise<ChatResponse> {
    const { isKeyword, responder } = keywordTester(this.userMessage, chat);

    if (isKeyword) {
      apm.setTag('keyword', responder.getName());
      return responder.runKeyword()
        .then((response: string) => {
          return this.respond(response, responder.getFormat());
        });
    }
    return Promise.resolve(null);
  }
}
