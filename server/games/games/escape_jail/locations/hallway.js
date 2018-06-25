const snl = require('strip-newlines');
const { Location /*, KeywordResponse*/ } = require('../../../lib');
const { SOUTH } = require('../constants');

class HallwayLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Jail Hallway' });
  }

  getDescription() {
    return snl`You're outside of the jail cell in a hallway lined with
      many other jail cells. The other jail cells have people that belong
      here, but you only got here accidentally. Time to get out!`;
  }

  updateState(/*game*/) {
    this.addKeyword('ESCAPE', `Escape down the hallway`, () => {
      const px = [
        snl`There's a door at the end of the hallway - that must be the exit.
          You sneak past the cells towards the door.`,
        snl`Just before the door, there is a window to the outside. You can see
          that you are on the ground floor of the jail, and there is a van right
          outside. There is a guard walking towards the driver's door.`,
        snl`Thinking quickly, you quietly get outside, and get into the back of
          the van before the guard sees you.`,
      ];
      return this.followExit(SOUTH, px.join('\n'));
    });
  }
}

module.exports = { HallwayLocation };
