const snl = require('strip-newlines');
const { Location /*, KeywordResponse */ } = require('../../../lib');
const { EAST, UP } = require('../constants');

class SunshipLocation extends Location {
  constructor(game) {
    super({ game, name: 'Sun Ship, on Earth' });
  }

  getDescription() {
    const ps = [
      snl`Pretty nice in here. Whatever alien species created this ship did a good job.`,
      snl`The controls here look pretty simple. There's just one big button that says "PUSH_ME"`,
    ];
    return ps.join('\n\n');
  }

  // buy
  // talk

  setLocationKeywords(/*game*/) {
    const pxUp = snl`You close your eyes, hold your breath, and slam your hand
      on the PUSH_ME button. The ship's engine's rumble and your insides suddenly
      feel like cooked noodles as the ship rises up into the sky, and KSHOOOOM!
      into space!`;
    const pxEx = snl`Hope you enjoyed your time on the sun ship. Come back
      again anytime you want to be in a sun ship!`;
    this.addKeyword(['PUSH_ME', 'PUSH_BUTTON', 'PUSH'], `Push the control button`, () =>
      this.followExit(UP, pxUp)
    );
    this.addKeyword('EXIT', `Jump out of the ship and back to the bridge`, () =>
      this.followExit(EAST, pxEx)
    );
  }
}

module.exports = { SunshipLocation };
