const snl = require('strip-newlines');
const { Location /*, LocationKeywordResponse */ } = require('../../../lib');
const { SOUTH, NORTH, WEST, ENEMIES } = require('../constants');

class BridgeLocation extends Location {
  constructor(game) {
    super({ game, name: 'On the bridge' });
  }

  getDescription(game) {
    const ps = [
      snl`At the top of the bridge is a spaceship. It looks like a Sun Ship.
        The hatch is open, and it looks pretty functional.`,
      snl`You're on the bridge, and can look down at the lake. This lake is
        beautiful. From up here, the lake seems to have a less grim appearance.`,
    ];
    if (game.inInventory(ENEMIES)) {
      ps.push(snl`There are enemies in the lake. At top of this bridge, it is
        too high up to do anything about it though.`);
    } else {
      ps.push(snl`The enemies that were in the lake have been defeated! Their
        defeated corpses float in the water.`);
    }
    return ps.join('\n\n');
  }

  setKeywords(/*game*/) {
    this.addKeyword('SHIP', `Enter the ship`, () => this.followExit(WEST));
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
