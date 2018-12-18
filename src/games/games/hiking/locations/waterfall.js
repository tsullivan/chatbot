const snl = require('strip-newlines');
const { Location, KeywordResponse, parajoin } = require('../../../lib');
const { WEST, EAST, UP } = require('../constants');

class WaterfallLocation extends Location {
  constructor(game) {
    super({ game, name: 'Really giant waterfall' });
    this._gotSprayed = false;
  }

  getDescription() {
    const lns = [
      snl`It is so magical here.`,
      snl`This waterfall is at the bottom of a giant mountain and a bunch of trees. There's a path up the mountain, and you can try to see the top of the mountain, but it's so tall that it hurts your neck to look at it.`,
      snl`There's a climbing rope that leads to a really big circle. You're not
        sure what it is, and you don't feel strong enough to climb up right now.`,
      snl`There's water spraying everywhere!`,
    ];
    return parajoin(lns);
  }

  setLocationKeywords(/*game*/) {
    this.addKeyword('ROCKS', `Go to the place that has a lot of rocks`, () =>
      this.followExit(EAST)
    );
    this.addKeyword('MOUNTAIN', `Try to climb up the really tall mountain.`, () => {
      if (this._gotSprayed) {
        this._gotSprayed = false;
        const px = snl`With the magical strength gained from the waterfall
          spray, you climb up the very tall mountain.`;
        return this.followExit(UP, px);
      } else {
        const ps = [
          snl`You try to hike the trail going straight up the really tall
            mountain, but you're too weak right now!`,
          'LOSE A POINT',
        ];
        return new KeywordResponse({
          text: ps.join('\n\n'),
          changeScore: -1,
        });
      }
    });
    this.addKeyword('ROPE', `Try to climb the rope`, () => {
      if (this._gotSprayed) {
        this._gotSprayed = false;
        const px = snl`With the magical strength gained by the waterfall spray,
          you climb like Spider-Man right up the rope to the giant circle.`;
        return this.followExit(WEST, px);
      } else {
        const ps = [
          snl`You try to climb the rope up to the giant circle, but you're too
            weak right now!`,
          'LOSE A POINT',
        ];
        return new KeywordResponse({
          text: ps.join('\n\n'),
          changeScore: -1,
        });
      }
    });
    this.addKeyword('GET_SPRAYED', `Allow yourself to get sprayed by the water`, () => {
      this._gotSprayed = true;
      return new KeywordResponse({
        text: snl`You jump around in the waterfall spray for a bit. It feels so
          magical! The magical wetness covers you and leaves you soaked! You feel
          magically powerful!`,
      });
    });
    this.addKeyword(
      'CHECK_DRYNESS',
      `Check yourself to see if you are wet or dry from the waterfall spray`,
      () => {
        if (this._gotSprayed) {
          return new KeywordResponse({
            text: snl`You have recently been sprayed by some of the magical droplets of
            the waterfall. You feel magically powerful!`,
          });
        } else {
          return new KeywordResponse({
            text: snl`You have dodged all the magical spray from the water, and
            are quite dry. You are not feeling magical.`,
          });
        }
      }
    );
  }
}

module.exports = { WaterfallLocation };