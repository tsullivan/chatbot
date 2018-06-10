const snl = require('strip-newlines');
const { Location /*, KeywordResponse*/ } = require('../../../lib');
const { UP, DOWN, CAR } = require('../constants');

class CarLocation extends Location {
  constructor(game) {
    super({ game, name: 'Under the Mountain House' });
  }

  getDescription() {
    const ps = [
      `The bottom of the hole is so deep, you'd have to use a ladder to get back up.`,
      snl`There's a silver car here, at the start of a long tunnel into
        darkness. The car is floating slightly, but it seems pretty easy to get
        in if you want.`,
    ];
    return ps.join('\n\n');
  }

  setKeywords(game) {
    this.addKeyword('LADDER', `Climb the ladder to get back up to the house`, () =>
      this.followExit(UP, 'Climb, climb, climb.')
    );
    this.addKeyword(
      ['DRIVE_THE_CAR', 'DRIVE', 'CAR'],
      `Get into the car and drive it, to see what's down this tunnel`,
      () => {
        game.addToInventory(CAR);
        const px = snl`You hop in the car and buckle in. As you put your hands on
          the steering wheel, the car floats up higher and takes off down the dark
          tunnel! You zoom and zoom through it as the light of the outside comes
          closer and closer. There is a tremendous WHOOOOSH!! sound as the car flies
          out of the side of the mountain! You're now flying over the lake that you
          passed by on the beginning of this hiking journey.`;
        return this.followExit(DOWN, px);

        /* FIXME this doesn't work, keyword responses are not composable
        return new KeywordResponse({
          text: this.followExit(DOWN),
          changeScore: 5
        });
      */
      }
    );
  }
}

module.exports = { CarLocation };
