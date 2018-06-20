const snl = require('strip-newlines');
const { Location /*, KeywordResponse */ } = require('../../../lib');
const { WEST } = require('../constants');

class MagnetLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Magnet Store' });
  }

  getDescription() {
    // trigger game event on something you're holding when you walk in?
    return snl`Hold on to your metals, they got lots of magnets in here!`;
  }

  updateState(/*game*/) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(WEST);
    });
  }
}

module.exports = { MagnetLocation };
