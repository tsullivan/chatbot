const snl = require('strip-newlines');
const { Location, KeywordResponse } = require('../../../lib');
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

  setKeywords(game) {
    this.addKeyword(['OUTSIDE', 'EXIT'], `Go out to the top of the mountain`, () =>
      this.followExit(WEST)
    );
    this.addKeyword(['DOWN_THE_HOLE', 'DOWN', 'HOLE'], `Take a look at what's down the hole`, () =>
      this.followExit(
        DOWN,
        snl`Fortunately, there's a ladder leading straight down the hole, so
          you don't have to jump down an unknown distance through complete
          darkness.`
      )
    );
    this.addKeyword(['SLEEP', 'BED'], `Take a rest on the comfy-looking bed`, () => {
      const ps = [
        snl`You lay down on the comfy bed and close your eyes. You let your
          mind wander. Thinking about how pretty the waterfall was, you realize
          that although you were scared initially you're feeling pretty good now.
          You think to yourself that this game is pretty awesome, even though it
          doesn't have a lot of pictures and it's mostly reading.`,
        // list the inventory
        `GAIN A POINT`,
      ];

      // stats stuff
      const learnThingsIndex = ps.length;
      ps[learnThingsIndex] = `You learn some things:
- Your score is ${game.score}
- You've taken ${game.turns} turns`;

      // restore some points
      let changeScore = 0;
      const scoreDeficit = 50 - game.score;
      if (scoreDeficit > 0) {
        changeScore = scoreDeficit; // bump them up to 50 again
        ps[learnThingsIndex] +=
          '\n' +
          snl`- You get ${scoreDeficit} more
          points from sleeping right now.`;
      }

      return new KeywordResponse({
        text: ps.join('\n\n'),
        changeScore,
      });
    });
  }
}

module.exports = { MountainHouseLocation };
