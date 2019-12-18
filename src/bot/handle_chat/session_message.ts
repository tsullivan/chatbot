import * as apm from 'elastic-apm-node';
import { ChatResponse, UserFormat } from '../../types';
import { ResponseMessage } from './response_message';
import { Session } from '..';

export class SessionMessage extends ResponseMessage {
  public constructor(chat: Session, userMessage: string, userFormat: UserFormat) {
    super('session', chat, userMessage, userFormat);
  }

  public async makeResponse(chat: Session): Promise<ChatResponse | null> {
    const userFormat = this.userFormat;
    const { isValid, revalidateResponse } = chat.validateSession(userFormat);

    if (userFormat === 'syn') {
      if (isValid) {
        return this.respond(`Hello again, ${chat.getName()}!`, 'plain');
      } else {
        chat.setWaitOnName();
        return this.respond('Hello! What is your name?', 'plain');
      }
    } else if (userFormat === 'hup') {
      chat.hangup();
      return this.respond('Bye!', 'plain');
    } else if (!isValid) {
      return this.respond(revalidateResponse);
    }

    chat.fulfillWait(this.userMessage);

    const nextBotMessage = chat.popNextBotMessage();
    if (nextBotMessage !== null) {
      return this.respond(nextBotMessage);
    }

    let response;
    let isDone = false;
    let format;
    if (chat.getGame() != null) {
      const game = chat.getGame();
      apm.setLabel('game', game.getName());

      const gameResponse = await game.testInput(this.userMessage);
      ({ response, format, isDone } = gameResponse);

      game.save();
      if (isDone === true) {
        response += `\nThat was fun, ${chat.getName()}!`;
        chat.endGame();
      }

      return this.respond(response, format);
    }

    return null;
  }
}
