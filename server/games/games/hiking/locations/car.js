const snl = require('strip-newlines');
const { Location/*, LocationKeywordResponse*/ } = require('../../../lib');
const { UP, DOWN, CAR } = require('../constants');

class CarLocation extends Location {
  constructor(game) {
    super({ game, name: 'Under the Mountain House' });
  }

  getDescription() {
    const ps = [
      snl`The bottom of the hole is so deep, you'd have to use a ladder to get
        back up.`,
      snl`There's a silver car here, at the start of a long tunnel into
        darkness. The car is floating slightly, but it seems pretty easy to get
        in if you want.`,
      // check floor item / inventory
    ];
    return ps.join('\n\n');
  }

  setKeywords(game) {
    this.addKeyword('LADDER', `LADDER - climb the ladder to get back up to the house`, () => this.followExit(UP));
    this.addKeyword('CAR', `CAR - get into the car and see what's down this tunnel`, () => {
      game.addToInventory(CAR);
      return this.followExit(DOWN); // TODO prefix about point gainage

      /* FIXME this doesn't work
      return new LocationKeywordResponse({
        text: this.followExit(DOWN),
        changeScore: 5
      });
      */
    });
  }
}

module.exports = { CarLocation };
