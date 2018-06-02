const snl = require('strip-newlines');
const { Location } = require('../class_location');
const { NORTH, EAST } = require('../constants');

class StartLocation extends Location {
  constructor(game) {
    super({ game, name: 'Dark Forest' });
  }
  setDescription() {
    this.description = snl`It is the night time. You are outside, surrounded
      by dark trees, and you're very tired. There is a castle and a cave.
      Which way looks to be best to find a nice comfy bed to rest? I didn't
      mean for that to rhyme.`;
  }
  setKeywords() {
    this.addKeyword('CAVE', 'CAVE to go down into the cave', () => this.followExit(EAST));
    this.addKeyword('CASTLE', 'CASTLE to head up to the castle.', () => this.followExit(NORTH));
  }
}

module.exports = { StartLocation };