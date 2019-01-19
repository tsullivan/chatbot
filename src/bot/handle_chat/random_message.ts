import { KeywordResponder as Impromptu } from '../../keywords/responders/random';
import { IResponse, ResponseMessage } from './response_message';

export class RandomMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super('random', chat, message, format);
  }

  public makeResponse(chat): Promise<IResponse> {
    const responder = new Impromptu(null, chat);
    return Promise.resolve(
      this.respond(responder.getResponse(), responder.getFormat()),
    );
  }
}
