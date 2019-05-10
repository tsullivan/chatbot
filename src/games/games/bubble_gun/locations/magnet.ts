// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import {
  Adventure,
  KeywordResponse,
  Location,
  parajoin,
} from '../../../lib';
import { DOWN, WEST } from '../constants';

export class MagnetLocation extends Location {
  private isEmpty = false;
  private isMachined = false;
  private stairsUncovered = false;

  public constructor(game: Adventure) {
    super({ game, name: 'The Magnet Store' });
  }

  public getDescription(game: Adventure) {
    return parajoin([
      snl`No one is in this store. It seems to be completely self-operational. When you have a town where all the stores only have free items, that kind of
      makes sense.`,
      [
        snl`There are lots and lots of metal shelves in here - maybe hundreds. The entire surfaces of all the shelves have magnets stuck to them.`,
        snl`The hundreds of metal shelves look very strange. It's mostly empty here, since all of the magnets have left the building.`,
      ][this.isEmpty ? 1 : 0],
      [
        snl`This is a very clean area. Running a magnet store must not be a very messy business.`,
        snl`Another very noticeable thing about this place is a huge machine has crashed out of the floor and extended itself up through the ceiling. It is a
        bit messy in here now, to be honest.`,
      ][this.isMachined ? 1 : 0],
      [
        snl`As packed as it is with shelves full of magnets, you're sure that if you explore a bit, you will find there is more to this store.`,
        snl`Behind a leaning shelf is a wall with a small door. You can crouch down to enter the door, and descend the well-lit stairs.`,
      ][this.stairsUncovered ? 1 : 0],
    ]);
  }

  public setLocationKeywords(game: Adventure) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(WEST);
    });

    if (this.stairsUncovered) {
      const desc = `Sneak into the small secret door on the wall behind the leaning shelf.`;
      this.addKeyword('SECRET_DOOR', desc, () => {
        const pre = snl`The door leads directly to a case of stairs going down. There are many stairs to walk down, and it takes time to get all the
        way to the bottom.`;
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
            snl`Right when you start to think maybe this is just a normal self-operational magnet store, you discover a small door on a wall. It is almost
            completely hidden behind a shelf leaning against the wall.`,
            snl`You should get extra points! You get 3 points.`,
          ]);
          return new KeywordResponse({ text, changeScore: 3 });
        },
      );
    }
  }

  public machine() {
    this.isMachined = true;
  }

  public empty() {
    this.isEmpty = true;
  }
}
