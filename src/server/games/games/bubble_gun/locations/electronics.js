const snl = require('strip-newlines');
const { Location /*, KeywordResponse */ } = require('../../../lib');
const { EAST } = require('../constants');

class ElectronicsLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Electronics Store' });
  }

  getDescription() {
    return snl`Here at the Electronics store, their motto is: "Electronics -
        they're what we sell!"`;
  }

  setLocationKeywords(/*game*/) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(EAST);
    });
    // everything else is floor item
  }
}

module.exports = { ElectronicsLocation };
