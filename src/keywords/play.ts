import { GameSet } from '../games/lib';
import {
  KeywordResponder as CKeywordResponder,
  ResponderOptions,
} from './keyword_responder';

export default class GameResponder extends CKeywordResponder {
  private games: GameSet;

  public constructor(input: string, options: ResponderOptions) {
    super(input, options);
    this.setName('play');
    this.games = options.gameSet;

    this.getResponse = async () => {
      const game = input.replace(/^play /, '');
      if (Object.keys(this.games).indexOf(game) >= 0) {
        const { chat: session } = options;
        session.setGame(game);
        return session.getGameWelcome();
      } else {
        return this.help();
      }
    };
  }

  public testMatch(input: string) {
    return input.match(/^(:?play|game)/);
  }

  public help() {
    const gameKeys = Object.keys(this.games).map((key) => `\n- \`play ${key}\``);
    return `Play a game with me!\nUsage: \`play <game name>\`\nHere are the games I have:\n${gameKeys.join(
      ''
    )}`;
  }
}
