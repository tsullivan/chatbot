import { Game as AdventureGame } from './adventure';
import { Game as BatmanGame } from './batman';
import { Game as BubbleGunGame } from './bubble_gun';
import { ChatGame } from './lib';
import { Game as EscapeJailGame } from './escape_jail';
import { Game as GuessNumberGame } from './guess_number';
import { Game as HikingGame } from './hiking';
import { Session } from '../bot';

interface GameSet {
  [gameName: string]: new (session: Session) => ChatGame;
}
export function getGames(): GameSet {
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
