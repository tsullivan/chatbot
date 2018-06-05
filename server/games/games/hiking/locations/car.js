const snl = require('strip-newlines');
const { Location /*, LocationKeywordResponse*/ } = require('../../../lib');
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
    this.addKeyword('LADDER', `Climb the ladder to get back up to the house`, () =>
      this.followExit(UP, 'Climb, climb, climb.')
    );
    this.addKeyword('CAR', `Get into the car and see what's down this tunnel`, () => {
      game.addToInventory(CAR);
      const px = snl`You hop in the car and buckle in. As you put your hands on
        hthe steering wheel, the car floats up higher and takes off down the dark
        htunnel! You zoom and zoom through it as the light of the outside comes
        hcloser and closer. There is a tremendous WHOOSH sound as the car flies
        hout of the side of the mountain! You're now flying over the lake that you
        hpassed by on the beginning of this hiking journey.`;
      return this.followExit(DOWN, px);

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
