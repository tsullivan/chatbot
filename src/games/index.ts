import { Game as AdventureGame } from './games/adventure';
import { Game as BatmanGame } from './games/batman';
import { Game as BubbleGunGame } from './games/bubble_gun';
import { ChatGame } from './lib';
import { Game as EscapeJailGame } from './games/escape_jail';
import { Game as GuessNumberGame } from './games/guess_number';
import { Game as HikingGame } from './games/hiking';
import { Session } from '../bot';

interface GameSet {
  [gameName: string]: new (session: Session) => ChatGame;
}
export async function getGames(): Promise<GameSet> {
  return {
    adventure: AdventureGame,
    batman: BatmanGame,
    bubble_gun: BubbleGunGame, // eslint-disable-line @typescript-eslint/camelcase
    escape_jail: EscapeJailGame, // eslint-disable-line @typescript-eslint/camelcase
    guess_number: GuessNumberGame, // eslint-disable-line @typescript-eslint/camelcase
    hiking: HikingGame,
  };
}

export { ChatGame } from './lib';
