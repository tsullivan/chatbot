const snl = require('strip-newlines');
const { Location /*, LocationKeywordResponse */ } = require('../../../lib');
const { NORTH, WEST } = require('../constants');

class StartLocation extends Location {
  constructor(game) {
    super({ game, name: 'Landing - the starting place' });
  }

  getDescription() {
    return snl`You can go wherever you want. You're surrounded by trees and
      you're so scared. It's cloudy outside.`;
  }

  setKeywords(/*game*/) {
    const pxLake = snl`Your hiking adventure begins! Off to the lake we go.`;
    const pxRocks = snl`Your hiking adventure begins! Starting out with a
      scrambly feeling, you make your way over to the rocks.`;
    this.addKeyword('LAKE', `You can see a lake in one direction. It looks pretty nice.`, () =>
      this.followExit(NORTH, pxLake)
    );
    this.addKeyword(
      'ROCKS',
      `You can see precarious rocks on the trail in another direction. They look scrambly.`,
      () => this.followExit(WEST, pxRocks)
    );
  }
}

module.exports = { StartLocation };
