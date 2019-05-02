import { KeywordResponder as AlienImpromptu } from '../../keywords/responders/alien';
import { ChatResponse } from '../../types';
import { KeywordResponder as HumanImpromptu } from '../../keywords/responders/random';
import { ResponseMessage } from './response_message';
import { Session } from '../session';
import { sample } from 'lodash';

export class RandomMessage extends ResponseMessage {
  public constructor(session: Session, message: string, format: string) {
    super('random', session, message, format);
  }

  public async makeResponse(chat: Session): Promise<ChatResponse> {
    const language = sample(['alien'/*, 'human'*/]);
    const responder =
      language === 'alien'
        ? new AlienImpromptu(null, chat)
        : new HumanImpromptu(null, chat);
    return this.respond(await responder.getResponse(), responder.getFormat());
  }
}
