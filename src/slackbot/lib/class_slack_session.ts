import { defaultsDeep } from 'lodash';
import { Bot, ChatSession, ChatSessionProto } from '../../bot';

export class SlackSession {
  get id() {
    return this.userId;
  }

  get chat() {
    return this.chatSession;
  }

  public destroy: () => void;
  private chatSession: ChatSession;

  constructor(public readonly userId: string, bot: Bot) {
    this.chatSession = defaultsDeep({}, ChatSessionProto);
  }

  public setChatSession(chatSession: ChatSession) {
    this.chatSession = chatSession;
  }
}
