const snl = require('strip-newlines');
const { Location, parajoin /*, KeywordResponse */ } = require('../../../lib');
const { NORTH, WEST } = require('../constants');

class StartLocation extends Location {
  constructor(game) {
    super({ game, name: 'Lost in a mountain' });
  }

  getDescription() {
    const lns = [
      snl`You find yourself on a big, big mountain. You can see the very top of
        the mountain, but it's still so high up that it hurts your neck to look
        at. The dark clouds in the sky seem to be afraid to come close to the
        mountain, and it makes the mountain look impossbly looming.`,
      snl`Around you, it's so green. The only sound you hear is the cold wind
        swaying leaves and branches. Once in awhile, a few clouds part open a
        blue sky and let in sharp bolts of sunlight. It's really nice when the
        light hits the tops of the younger parts of the plants. It makes them
        look like glowing gems.`,
      snl`The ground has a lot of large bushes and lower down, there are a lot
        of ferns and a lot of moss.`,
      snl`Your standing on a trail, with only two directions to go. To one
        direction there's a large lake, looking cold and gloomy under the clouds.
        In another direction the trees make a large opening around a very rocky
        place.`,
      snl`You're not sure how you got here, and that makes you feel really
        lost. You can go wherever you want. You're surrounded by trees and your
        scared.`,
      snl`You can also go really fast sometimes, and you have the Force sometimes.`,
    ];
    return parajoin(lns);
  }

  updateState(/*game*/) {
    const pxLake = snl`Your hiking adventure begins! Off to the lake we go.`;
    const pxRocks = snl`Your hiking adventure begins! Starting out with a
      scrambly feeling, you make your way over to the rocks.`;
    this.addKeyword(
      'LAKE',
      `You can see a lake in one direction. It looks pretty nice.`,
      () => this.followExit(NORTH, pxLake)
    );
    this.addKeyword(
      'ROCKS',
      `You can see precarious rocks on the trail in another direction. They look scrambly.`,
      () => this.followExit(WEST, pxRocks)
    );
  }
}

module.exports = { StartLocation };
/* vim auto-breakline */
