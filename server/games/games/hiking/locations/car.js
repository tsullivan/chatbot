const snl = require('strip-newlines');
const { Location, parajoin /*, KeywordResponse*/ } = require('../../../lib');
const { UP, DOWN, CAR } = require('../constants');

class CarLocation extends Location {
  constructor(game) {
    super({ game, name: 'In a cave under the mountain house' });
  }

  getDescription() {
    const lns = [
      snl`The hole which you climbed down is the only source of light. You're at the dead-end of a
        cave which goes one direction into a long tunnel of darkness. It would be very hard to
        navigate through that without a light of some kind. The bottom of the hole is so deep,
        you'd have to use a ladder to get back up. The only way that seems safe to try is the
        ladder leading back up to the house.`,
      snl`In the dim light, the only thing you can really tell is there's a silver car parked here.
        It points straight in to the darkness of the cave tunnel. It's floating slightly, and seems
        very ready to drive.`,
    ];
    return parajoin(lns);
  }

  setLocationKeywords(game) {
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
      }
    );
  }
}

module.exports = { CarLocation };
