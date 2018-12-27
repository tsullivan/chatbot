import { getGames } from '../../games';
import { KeywordResponder as CKeywordResponder} from '../class_keyword_responder';

const games = getGames();

class GameResponder extends CKeywordResponder {
  constructor(input, session) {
    super(input);
    this.setName('play');
    this.setFormat('markdown');

    this.getResponse = () => {
      const game = input.replace(/^play /, '');
      if (Object.keys(games).indexOf(game) >= 0) {
        session.setGame(game);
        return session.getGameWelcome();
      } else {
        return this.help();
      }
    };
  }

  public testMatch(input) {
    return input.match(/^play\b/);
  }

  public justDont() {
    return `Just don't say "play batman"`;
  }

  public help() {
    const gameKeys = Object.keys(games);
    return `\`play\`: Play a game with me!\nUsage: \`play <game name>\`\nHere are the games I have: ${gameKeys.join(
      ', ',
    )}`;
  }
}

export const KeywordResponder = GameResponder;
