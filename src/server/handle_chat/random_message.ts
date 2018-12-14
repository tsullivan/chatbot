import { KeywordResponder as Impromptu } from '../keywords/responders/random';
import { ResponseMessage } from './response_message';

export class RandomMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super('random', chat, message, format);
  }

  public makeResponse(chat) {
    const responder = new Impromptu(null, chat);
    return this.respond(responder.getResponse(), responder.getFormat());
  }
}
