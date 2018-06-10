const snl = require('strip-newlines');
const { Location, KeywordResponse } = require('../../../lib');
const { SOUTH } = require('../constants');

class FinishLocation extends Location {
  constructor(game) {
    super({ game, name: 'Finish Line' });
  }

  getDescription() {
    const ps = [
      snl`The finish line looks like a robot. You can ask the robot to take out
        a flag, and that will finish this hiking game.`,
      `Ready to end the hiking journey?`,
    ];
    return ps.join('\n\n');
  }

  setKeywords(/*game*/) {
    this.addKeyword(
      ['ASK_THE_ROBOT_TO_TAKE_OUT_A_FLAG', 'ROBOT', 'FLAG', 'FINISH'],
      `Leave the hiking journey and save your points`,
      () => {
        return new KeywordResponse({
          text: snl`The robot takes out a flag, and swishes it over your head.
            This takes you to the end of the hiking journey.`,
          isDone: true,
        });
      }
    );
    this.addKeyword('BRIDGE', `Go back to the bridge, and keep playing the hiking game`, () =>
      this.followExit(SOUTH)
    );
  }
}

module.exports = { FinishLocation };
