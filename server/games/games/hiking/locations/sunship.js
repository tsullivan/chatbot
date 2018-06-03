const snl = require('strip-newlines');
const { Location/*, LocationKeywordResponse */ } = require('../../../lib');
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

  setKeywords(/*game*/) {
    this.addKeyword('PUSH_ME', `PUSH_ME - push the control button`, () => this.followExit(UP));
    this.addKeyword('EXIT', `EXIT - jump out of the ship and back to the bridge`, () => this.followExit(EAST));
  }
}

module.exports = { SunshipLocation };
