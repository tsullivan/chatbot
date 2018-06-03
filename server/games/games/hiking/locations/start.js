const snl = require('strip-newlines');
const { Location/*, LocationKeywordResponse */ } = require('../../../lib');
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
    this.addKeyword('LAKE', `LAKE - there's a lake over that way.`, () => this.followExit(NORTH));
    this.addKeyword('ROCKS', 'ROCKS - you see some rocks over there.', () => this.followExit(WEST));
  }
}

module.exports = { StartLocation };
