const snl = require('strip-newlines');
const { Location, parajoin } = require('../../../lib');
const { NORTH, EAST } = require('../constants');

class StartLocation extends Location {
  constructor(game) {
    super({ game, name: 'Dark Forest' });
  }

  getDescription() {
    const lns = [
      snl`It is the night time. You are outside, surrounded by dark trees, and
       you're very tired. There is a castle and a cave.`,
      snl`Which way looks to be best to find a nice comfy bed to rest? I didn't
        mean for that to rhyme.`,
    ];
    return parajoin(lns);
  }

  setLocationKeywords() {
    this.addKeyword('CAVE', 'Go down into the cave', () => this.followExit(EAST));
    this.addKeyword('CASTLE', 'Head up to the castle.', () => this.followExit(NORTH));
  }
}

module.exports = { StartLocation };
