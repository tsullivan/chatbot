const snl = require('strip-newlines');
const { Location/*, LocationKeywordResponse */ } = require('../../../lib');
const { EAST, WEST } = require('../constants');

class RocksLocation extends Location {
  constructor(game) {
    super({ game, name: 'Rocky place' });
  }

  getDescription() {
    const ps = [
      snl`There's rocks here. Be careful! You could trip, or if you horseplay,
        a rock could fall on your head.`,
      snl`If you are careful, you could cross the rocks to get to a waterfall.`,
    ];
    return ps.join('\n\n');
  }

  // trip
  // horseplay

  setKeywords(/*game*/) {
    this.addKeyword('LANDING', 'LANDING - go back the place where you start', () => this.followExit(EAST));
    this.addKeyword('WATERFALL', `WATERFALL - check it out, you can see a waterfall`, () => this.followExit(WEST));
  }
}

module.exports = { RocksLocation };
