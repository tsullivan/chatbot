const snl = require('strip-newlines');
const { Location /*, KeywordResponse */ } = require('../../../lib');
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

  setLocationKeywords(/*game*/) {
    const px = snl`You're a careful sort of person, so you can easily get over
      the treacherous rocks to go where you want to go.`;
    this.addKeyword('LAKE', 'Go to the lake', () => this.followExit(EAST, px));
    this.addKeyword('WATERFALL', `Check it out, you can see a waterfall beyond the rocks`, () =>
      this.followExit(WEST, px)
    );
  }
}

module.exports = { RocksLocation };
