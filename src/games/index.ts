import * as AdventureGame from './adventure';
import * as BatmanGame from './batman';
import * as BubbleGunGame from './bubble_gun';
import * as EscapeJailGame from './escape_jail';
import * as GuessNumberGame from './guess_number';
import * as HikingGame from './hiking';

export function getGames() {
  return {
    adventure: AdventureGame,
    batman: BatmanGame,
    bubble_gun: BubbleGunGame,
    escape_jail: EscapeJailGame,
    guess_number: GuessNumberGame,
    hiking: HikingGame,
  };
}

export { ChatGame } from './lib';
