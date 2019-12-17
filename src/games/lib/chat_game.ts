import { KeywordResponse } from './keyword_response';
import { Session } from '../../bot/session';
import { defaults } from 'lodash';

export class ChatGame {
  public save: () => void;
  public score: number;
  private playerName: string;
  private name: string;

  public constructor(chat: Session) {
    this.playerName = chat.getName();

    this.save = () => {
      chat.save();
    };
  }

  public init() {
    return;
  }

  public getWelcome() {
    return '# Welcome to Chat Game!';
  }

  public getName() {
    return this.name;
  }

  public getPlayerName() {
    return this.playerName;
  }

  public resume(chat: Session) {
    defaults(this, chat);
  }

  protected setName(name: string) {
    this.name = name;
  }

  public updateState() {
  }

  public testInput(userMessage: string): KeywordResponse | Promise<KeywordResponse> {
    throw new Error('Unexpected call to testInput');
  }
}

export interface ChatGameClass {
  new (session: Session): ChatGame;
};
