const snl = require('strip-newlines');
const { Location, LocationKeywordResponse } = require('../../../lib');
const { SOUTH } = require('../constants');

class FinishLocation extends Location {
  constructor(game) {
    super({ game, name: 'Finish' });
  }

  getDescription() {
    const ps = [
      snl`There's a finish line here.`,
      snl`Ready to end the hiking journey?`,
    ];
    return ps.join('\n\n');
  }

  // bathe
  // trip

  setKeywords(/*game*/) {
    this.addKeyword('FINISH', `FINISH - leave the hiking journey and save your points`, () => {
      return new LocationKeywordResponse({ isDone: true });
    });
    this.addKeyword('BRIDGE', `BRIDGE - back to the bridge`, () => this.followExit(SOUTH));
  }
}

module.exports = { FinishLocation };
