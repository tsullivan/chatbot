import { KeywordResponder as CKeywordResponder} from '../keyword_responder';
import { Session } from '../../bot';
import { getGames } from '../../games';

const games = getGames();

class GameResponder extends CKeywordResponder {
  public constructor(input: string, session: Session) {
    super(input);
    this.setName('play');
    this.setResponseFormat('markdown');

    this.getResponse = async () => {
      const game = input.replace(/^play /, '');
      if (Object.keys(games).indexOf(game) >= 0) {
        session.setGame(game);
        return session.getGameWelcome();
      } else {
        return this.help();
      }
    };
  }

  public testMatch(input: string) {
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
