const snl = require('strip-newlines');
const { Location, LocationKeywordResponse } = require('../../../lib');
const { WEST, DOWN } = require('../constants');

class MountainHouseLocation extends Location {
  constructor(game) {
    super({ game, name: 'Mountain House' });
  }

  getDescription() {
    const ps = [
      snl`Inside the mountain house, the many windows create an atmosphere of
        light, but as it is cloudy outside, you find yourself wishing for a
        little more.`,
      snl`There's a comfy-looking bed, in case you need a rest.`,
      snl`There's a deep hole in the floor. You can't see the bottom, but you could fit yourself inside.`,
    ];
    return ps.join('\n\n');
  }

  setKeywords(/*game*/) {
    this.addKeyword('OUTSIDE', 'OUTSIDE - go out to the top of the mountain', () => this.followExit(WEST));
    this.addKeyword('DOWN', `DOWN - take a look at what's down the hole`, () => this.followExit(DOWN));
    this.addKeyword('SLEEP', `SLEEP - take a rest on the comfy-looking bed`, () => {
      const ps = [
        snl`You lay down on the bed and close your eyes. You let your mind
        wander. Thinking about how pretty the waterfall was, you realize that
        although you were scared initially you're feeling pretty good now. You
        think to yourself that this game is pretty awesome, even though it
        doesn't have a lot of pictures and it's mostly reading.`,
        // list the inventory
        `GAIN A POINT`
      ];
      return new LocationKeywordResponse({
        text: ps.join('\n\n'),
        changeScore: 1
      });
    });
  }
}

module.exports = { MountainHouseLocation };
