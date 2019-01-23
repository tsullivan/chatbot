import { KeywordResponder as Impromptu } from '../../keywords/responders/random';
import { IChatResponse } from '../../types';
import { ResponseMessage } from './response_message';

export class RandomMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super('random', chat, message, format);
  }

  public async makeResponse(chat): Promise<IChatResponse> {
    const responder = new Impromptu(null, chat);
    return this.respond(await responder.getResponse(), responder.getFormat());
  }
}
