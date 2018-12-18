import { defaultsDeep } from 'lodash';
import { Bot } from '../../lib';
import { ChatSession, ChatSessionProto, IWebSession } from '../../web/session';

export class SlackSession implements IWebSession {
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
