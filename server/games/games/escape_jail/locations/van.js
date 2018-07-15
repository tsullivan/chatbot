const snl = require('strip-newlines');
const { Location, delayAndDie } = require('../../../lib');
const { SOUTH } = require('../constants');

class VanLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Jail Van' });
  }

  getDescription() {
    return snl`You're hiding in a jail van that's driving around the jail,
      making jail deliveries to the jail people.`;
  }

  setLocationKeywords(/*game*/) {
    this.addKeyword('ESCAPE', `Escape the jail van`, () => {
      const px = snl`You sneak out of the jail van and run over to a
        fence. You're almost out of here!`;
      return this.followExit(SOUTH, px);
    });

    this.addKeyword(...delayAndDie());
  }
}

module.exports = { VanLocation };
