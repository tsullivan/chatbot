import * as apm from 'elastic-apm-node';
import { keywordTester } from '../../keywords';
import { ChatResponse } from '../../types';
import { ResponseMessage } from './response_message';
import { Session } from '..';

export class SmartMessage extends ResponseMessage {
  public constructor(chat: Session, message: string, format: string) {
    super('smart', chat, message, format);
  }

  public makeResponse(chat: Session): Promise<ChatResponse> {
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
