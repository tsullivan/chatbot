import * as snl from 'strip-newlines';
import { Location /*, KeywordResponse */ } from '../../../lib';
import { EAST, NORTH, SOUTH, UP, WEST } from '../constants';

export class PlaygroundLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Playground' });
  }

  public getDescription(game) {
    const parts = [
      snl`This playground is right in the center of Bubble Gun World. It has
        things that are fun for kids, and there's a ladder to a tree fort!!!`,
      snl`Off the corner of the road, there's a bridge leading out of Bubble
        Gun World.`,
      snl`Nearby is also an Electronics store, a Soaps store, and a Magnets
        store. I hope you like stores! There are a lot of stores in this game.
        But guess what: everything in them is FREE!!`,
    ];
    return parts.join('\n\n');
  }

  public setLocationKeywords(/*game*/) {
    this.addKeyword('BRIDGE', 'Go to the bridge', () => {
      return this.followExit(SOUTH);
    });
    this.addKeyword('TREE_FORT', 'Climb the ladder up to the tree fort', () => {
      return this.followExit(UP);
    });
    this.addKeyword('ELECTRONICS', 'Go to the Electronics store', () => {
      return this.followExit(WEST);
    });
    this.addKeyword('SOAPS', 'Go to the Soaps store', () => {
      return this.followExit(NORTH);
    });
    this.addKeyword('MAGNETS', 'Go to the Magnet store', () => {
      return this.followExit(EAST);
    });
  }
}
