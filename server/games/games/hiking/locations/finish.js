const snl = require('strip-newlines');
const { Location, LocationKeywordResponse } = require('../../../lib');
const { SOUTH } = require('../constants');

class FinishLocation extends Location {
  constructor(game) {
    super({ game, name: 'Finish' });
  }

  getDescription() {
    const ps = [
      snl`There's a finish line here. There's really not much else to say about
        this place.`,
      `Ready to end the hiking journey?`,
    ];
    return ps.join('\n\n');
  }

  setKeywords(/*game*/) {
    this.addKeyword('FINISH', `Leave the hiking journey and save your points`, () => {
      return new LocationKeywordResponse({ isDone: true });
    });
    this.addKeyword(
      'BRIDGE',
      `BRIDGE - go back to the bridge, and keep playing the hiking game`,
      () => this.followExit(SOUTH)
    );
  }
}

module.exports = { FinishLocation };
