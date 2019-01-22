import * as snl from 'strip-newlines';
import {
  Adventure as AdventureGame,
  KeywordResponse,
  Location,
  parajoin,
} from '../../../lib';
import { DOWN, WEST } from '../constants';

export class MagnetLocation extends Location {
  private stairsUncovered = false;

  constructor(game: AdventureGame) {
    super({ game, name: 'The Magnet Store' });
  }

  public getDescription(game: AdventureGame) {
    const stairsConditional = [
      snl`Perhaps if you explore a bit, you could find there is more to this store.`,
      snl`Behind a leaning shelf is a wall with a small door. You can crouch down to enter the door, and descend the well-lit stairs.`,
    ];
    return snl`There are lots and lots of metal shelves in here. The entire surfaces of all the shelves have magnets stuck to them. The aisles and
    aisles of shelves create a mysterious atmosphere, where anything could be
    hiding. ${stairsConditional[this.stairsUncovered ? 1 : 0]}`;
  }

  public setLocationKeywords(game: AdventureGame) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(WEST);
    });

    if (this.stairsUncovered) {
      const desc = `Sneak into the small secret door on the wall behind the leaning shelf.`;
      this.addKeyword('SECRET_DOOR', desc, () => {
        const pre = snl`The door leads directly to a case of stairs going down. There are many stairs to walk down, and it takes time to get all the
        way to the bottom. Finally, you make it to the bottom where there is a room with a wide, open floor, and a very tall ceiling.`;
        return this.followExit(DOWN, pre);
      });
    } else {
      this.addKeyword(
        'EXPLORE',
        'See what could be hiding in this strange shop.',
        () => {
          this.stairsUncovered = true;
          const text = parajoin([
            snl`The magnet store has the feel of a place where anything could be hiding. It's time to get to the bottom of this mystery.`,
            snl`You wander around some aisles, go around some corners, look around. You're not exactly sure what you're looking for. You are
            keeping your eyes open for anything that seems out of place in this strange store.`,
            snl`Just when you think maybe this is a normal magnet store after all, you discover a small door on a wall. It is almost completely
            hidden behind a shelf leaning against the wall.`,
          ]);
          return new KeywordResponse({ text });
        },
      );
    }
  }
}
