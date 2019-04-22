import { sample } from 'lodash';
import { KeywordResponder as AlienImpromptu } from '../../keywords/responders/alien';
import { KeywordResponder as HumanImpromptu } from '../../keywords/responders/random';
import { ChatResponse } from '../../types';
import { ResponseMessage } from './response_message';

export class RandomMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super('random', chat, message, format);
  }

  public async makeResponse(chat): Promise<ChatResponse> {
    const language = sample(['alien'/*, 'human'*/]);
    const responder =
      language === 'alien'
        ? new AlienImpromptu(null, chat)
        : new HumanImpromptu(null, chat);
    return this.respond(await responder.getResponse(), responder.getFormat());
  }
}
