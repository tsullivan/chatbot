import { defaults } from 'lodash';

export class ChatGame {
  public save: () => void;
  public score: number;
  private playerName: string;
  private name: string;

  constructor(chat) {
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

  public resume(chat) {
    defaults(this, chat);
  }

  protected setName(name) {
    this.name = name;
  }
}

module.exports = { ChatGame };
