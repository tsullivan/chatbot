const snl = require('strip-newlines');
const { Location /*, KeywordResponse */ } = require('../../../lib');
const { DOWN, EAST } = require('../constants');

class MountainLocation extends Location {
  constructor(game) {
    super({ game, name: 'Top of the mountain' });
  }

  getDescription() {
    const ps = [
      snl`It was a long climb up to the really tall top of this mountain, so it
        feels so good to be up here.`,
      snl`Nearby is a blue house with a green roof. It has a lot of windows and
        only one door that is open. There is smoke coming out of the chimney.`,
    ];
    return ps.join('\n\n');
  }

  setLocationKeywords(/*game*/) {
    this.addKeyword('WATERFALL', `To go back down to the waterfall`, () => this.followExit(DOWN));
    this.addKeyword('HOUSE', 'Check out the mountain house up here.', () => this.followExit(EAST));
  }
}

module.exports = { MountainLocation };
