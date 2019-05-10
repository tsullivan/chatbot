import * as apm from 'elastic-apm-node';
import { ChatResponse, UserFormat } from '../../types';
import { ResponseMessage } from './response_message';
import { Session } from '..';
import { keywordTester } from '../../keywords';

export class SmartMessage extends ResponseMessage {
  public constructor(chat: Session, message: string, userFormat: UserFormat) {
    super('smart', chat, message, userFormat);
  }

  public async makeResponse(chat: Session): Promise<ChatResponse> {
    // async get games, it's async because it'll do a scandir
    const { isKeyword, responder } = await keywordTester(this.userMessage, chat);

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
