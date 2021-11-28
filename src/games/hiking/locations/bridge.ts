import { s, p } from '../../../lib';
import { Adventure, KeywordResponse, Location } from '../../lib';
import { ENEMIES, NORTH, SOUTH, WEST } from '../constants';

export class BridgeLocation extends Location {
  public constructor(game: Adventure) {
    super({ game, name: 'On the bridge top' });
  }

  public getDescription(_game: Adventure) {
    const lns = [
      s`The bridge is a really long way up, and then a really long way down.
        At the top of the bridge is a spaceship. This spaceship looks like a
        Sun Ship. The hatch is open, and from the outside, it looks pretty
        functional.`,
      s`From the top of the bridge, can can look down at the large lake. The
        lake is beautiful, and very clear.`,
      s`The dark clouds open up this close to the mountain, and the sky is
        clear and bright. The lake reflects the view to the top of the mountain,
        which makes this place of the game look very mirror-like. From up here,
        the lake looks just as serious and grim as the mountain it reflects.`,
      s`There is a telescope perched on a rail here.`,
    ];

    return p(lns);
  }

  public setLocationKeywords(game: Adventure) {
    this.addKeyword('SHIP', `Enter the ship`, () => this.followExit(WEST));
    this.addKeyword(
      'USE_TELESCOPE',
      'Look through the telescope perched on a rail at the top of the bridge.',
      () => {
        let text =
          s`Looking through the telescope, you see something interesting about
            the lake.` + ' ';
        if (game.inInventory(ENEMIES)) {
          text += s`There are enemies in the lake. At top of this bridge, it is
            too high up to do anything about it though.`;
        } else {
          text += s`The enemies that were in the lake have been defeated! Their
            defeated corpses float in the water.`;
        }
        return new KeywordResponse({ text });
      },
    );
    this.addKeyword('LAKE', `Go back down to the lake`, () =>
      this.followExit(
        SOUTH,
        s`Down, down, down you go. Down the
        bridge, bridge, bridge to the lake, lake, lake.`,
      ),
    );
    this.addKeyword(
      'FINISH_LINE',
      'From up here on the bridge, you can see the finish line of this entire game!',
      () => this.followExit(NORTH, 'Leaving so soon?'),
    );
  }
}
