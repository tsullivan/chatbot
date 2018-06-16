const snl = require('strip-newlines');
const { Location, KeywordResponse } = require('../../../lib');
const { DOWN, YOGURT } = require('../constants');

class TheSunLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Sun, in the Sun Ship' });
    this._hasGhosts = false;
  }

  getDescription() {
    return snl`It's so hot on the Sun! Fear not, it's safe inside the sun ship.
      It's very bright, but the windows of the sunship make it safe to look at.`;
  }

  // walk

  setLocationKeywords(game) {
    this.addKeyword('BACK', `Go back to Earth`, () => {
      const px = snl`KSHOOOOM!! Back down to Earth you go in the sun ship. Hope
        you enjoyed your stay on the sun! Come back soon!`;
      return this.followExit(DOWN, px);
    });
    this.addKeyword('LOOK', `Look at the sun (through the safety of the sunship windows)`, () => {
      if (this._hasGhosts) {
        return new KeywordResponse({
          text: snl`On the surface of the sun, there is melted yogurt and the
            remains of exploded ghosts.`,
        });
      } else {
        return new KeywordResponse({
          text: snl`There's not much to say about the sun at the moment. It's
            plain, like plain yogurt.`,
        });
      }
    });

    if (game.inInventory(YOGURT)) {
      this.addKeyword('THROW_YOGURT', `Throw the ghost yogurt onto the sun`, () => {
        game.deleteInventory(YOGURT);
        this.removeKeyword('THROW_YOGURT');
        this._hasGhosts = true;
        const ps = [
          snl`You reach for the ghost yogurt in your pocket, open the hatch of
            the sunship, and with all your strength, you mightily hurl the yogurt
            onto the surface of the sun.`,
          snl`The yogurt quickly melts, releasing the dreadful ghosts. The
            ghosts begin to moan and start turning into smoke.`,
          snl`One of the ghosts looks at you and says, "Thank you for releasing
            us! Our sprits are free now, and we can join our ancestors in ghost heaven."`,
          snl`Then all of the ghosts explode`,
          'GAIN 20 POINTS',
        ];
        return new KeywordResponse({
          text: ps.join('\n\n'),
          changeScore: 20,
        });
      });
    }
  }
}

module.exports = { TheSunLocation };
