const snl = require('strip-newlines');
const { Location /*, KeywordResponse */ } = require('../../../lib');
const { NORTH, UP, WEST, SOUTH, EAST } = require('../constants');

class PlaygroundLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Playground' });
  }

  getDescription() {
    const parts = [];
    parts[parts.length] = snl`This playground is right in the center of Bubble
      Gun World. It has things that are fun for kids, and there's a ladder to a
      tree fort!!!`;
    parts[parts.length] = snl`Off the corner of the road, there's a bridge
      leading out of Bubble Gun World.`;
    parts[parts.length] = snl`Nearby is also an Electronics store, a Soaps
      store, and a Magnets store. I hope you like stores! There are a lot of
      stores in this game. But guess what: everything in them is FREE!!`;
    return parts.join('\n\n');
  }

  setLocationKeywords(/*game*/) {
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

module.exports = { PlaygroundLocation };
