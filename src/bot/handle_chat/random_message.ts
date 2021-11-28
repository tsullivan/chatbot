import { ChatResponse, UserFormat } from '../../types';
import RandomResponder from '../../keywords/random';
import { ResponseMessage } from './response_message';
import { Session } from '../session';

export class RandomMessage extends ResponseMessage {
  public constructor(session: Session, message: string, userFormat: UserFormat) {
    super('random', session, message, userFormat);
  }

  public async makeResponse(chat: Session): Promise<ChatResponse> {
    const responder = new RandomResponder(null, { chat });
    return this.respond(await responder.getResponse(), responder.getFormat());
  }
}
