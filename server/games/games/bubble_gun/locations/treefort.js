const snl = require('strip-newlines');
const { Location /*, KeywordResponse */ } = require('../../../lib');
const { DOWN } = require('../constants');

class TreeFortLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Tree Fort' });
  }

  getDescription() {
    return snl`This tree fort is so tall! It has a big window with a clear view
      of the entire playground.`;
  }

  updateState(/*game*/) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(DOWN);
    });
    // use telescope, look at bridge
    // blast bubble gun
  }
}

module.exports = { TreeFortLocation };
