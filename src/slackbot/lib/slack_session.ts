import { Bot, Session, SessionProto } from '../../bot';
import { defaultsDeep } from 'lodash';

export class SlackSession {
  public readonly userId: string;
  
  public get id() {
    return this.userId;
  }

  public get chat() {
    return this.chatSession;
  }

  public destroy: () => void;
  private chatSession: Session;

  public constructor(userId: string, bot: Bot) {
    this.chatSession = defaultsDeep({}, SessionProto);
    this.userId = userId;
  }

  public setChatSession(chatSession: Session) {
    this.chatSession = chatSession;
  }
}
