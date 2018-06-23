const snl = require('strip-newlines');
const { Location, KeywordResponse } = require('../../../lib');
const { SOUTH, NORTH, WEST, ENEMIES } = require('../constants');

class BridgeLocation extends Location {
  constructor(game) {
    super({ game, name: 'On the bridge top' });
  }

  getDescription() {
    const ps = [
      snl`The bridge is a really long way up, and then a really long way down.
        At the top of the bridge is a spaceship. This spaceship looks like a
        Sun Ship. The hatch is open, and from the outside, it looks pretty
        functional.`,
      snl`From the top of the bridge, can can look down at the large lake. The
      lake is beautiful, and very clear.`,
      snl`The dark clouds open up this close to the mountain, and the sky is
        clear and bright. The lake reflects the view to the top of the mountain,
        which makes this place of the game look very mirror-like. From up here,
        the lake looks just as serious and grim as the mountain it reflects.`,
      snl`There is a telescope perched on a rail here.`,
    ];

    return ps.join('\n\n');
  }

  updateState(game) {
    this.addKeyword('SHIP', `Enter the ship`, () => this.followExit(WEST));
    this.addKeyword(
      'USE_TELESCOPE',
      'Look through the telescope perched on a rail at the top of the bridge.',
      () => {
        let text =
          snl`Looking through the telescope, you see something interesting about
            the lake.` + ' ';
        if (game.inInventory(ENEMIES)) {
          text += snl`There are enemies in the lake. At top of this bridge, it is
            too high up to do anything about it though.`;
        } else {
          text += snl`The enemies that were in the lake have been defeated! Their
            defeated corpses float in the water.`;
        }
        return new KeywordResponse({ text });
      }
    );
    this.addKeyword('LAKE', `Go back down to the lake`, () =>
      this.followExit(
        SOUTH,
        snl`Down, down, down you go. Down the
        bridge, bridge, bridge to the lake, lake, lake.`
      )
    );
    this.addKeyword(
      'FINISH_LINE',
      'From up here on the bridge, you can see the finish line of this entire game!',
      () => this.followExit(NORTH, 'Leaving so soon?')
    );
  }
}

module.exports = { BridgeLocation };
