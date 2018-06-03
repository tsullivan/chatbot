const snl = require('strip-newlines');
const { Location, LocationKeywordResponse } = require('../../../lib');
const { WEST, EAST, UP } = require('../constants');

class WaterfallLocation extends Location {
  constructor(game) {
    super({ game, name: 'Really giant waterfall' });
    this._gotSprayed = false;
  }

  getDescription() {
    const ps = [
      snl`It is so magical here.`,
      snl`This waterfall is at the bottom of the really tall waterfall. There's
        a path up the mountain, and you can try to see the top of the mountain,
        but it's so tall that it hurts your neck to look at it.`,
      snl`There's a climbing rope that leads to a really big circle. You're not
        sure what it is, and you don't feel strong enough to climb up right now.`,
      snl`There's water spraying everywhere!`,
    ];
    return ps.join('\n\n');
  }

  setKeywords(/*game*/) {
    this.addKeyword('ROCKS', `ROCKS - go to the place that has a lot of rocks`, () => this.followExit(EAST));
    this.addKeyword('MOUNTAIN', `MOUNTAIN - try to climb up the really tall mountain.`, () => {
      if (this._gotSprayed) {
        this._gotSprayed = false;
        return this.followExit(UP);
      } else {
        const ps = [
          snl`You try to hike the trail going straight up the really tall
            mountain, but you're too weak right now!`,
          'LOSE A POINT'
        ];
        return new LocationKeywordResponse({
          text: ps.join('\n\n'),
          changeScore: -1
        });
      }
    });
    this.addKeyword('ROPE', `ROPE - try to climb the rope`, () => {
      if (this._gotSprayed) {
        this._gotSprayed = false;
        return this.followExit(WEST); // TODO cool to have a prefix for this.
      } else {
        const ps = [
          snl`You try to climb the rope up to the giant circle, but you're too
            weak right now!`,
          'LOSE A POINT'
        ];
        return new LocationKeywordResponse({
          text: ps.join('\n\n'),
          changeScore: -1
        });
      }
    });
    this.addKeyword('GET_SPRAYED', `GET_SPRAYED - allow yourself to get sprayed by the water`, () => {
      this._gotSprayed = true;
      return new LocationKeywordResponse({
        text: snl`You jump around in the water for a bit. The magical wetness
          covers you and leaves you soaked! You feel magically powerful!`
      });
    });
    this.addKeyword('CHECK_DRYNESS', `CHECK_DRYNESS - check yourself to see if you are wet or dry from the waterfall spray`, () => {
      if (this._gotSprayed) {
        return new LocationKeywordResponse({
          text: snl`You have recently been sprayed by some of the magical spray of
            the waterfall. You feel magically powerful!`
        });
      } else {
        return new LocationKeywordResponse({
          text: snl`You have dodged all the magical spray from the water, and
            are quite dry. You are not feeling magical.`
        });
      }
    });
  }
}

module.exports = { WaterfallLocation };
