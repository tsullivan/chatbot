import * as AdventureGame from './games/adventure';
import * as BatmanGame from './games/batman';
import * as BubbleGunGame from './games/bubble_gun';
import * as EscapeJailGame from './games/escape_jail';
import * as GuessNumberGame from './games/guess_number';
import * as HikingGame from './games/hiking';

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
