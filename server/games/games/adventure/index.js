const snl = require('strip-newlines');
const { Adventure } = require('../../lib');
const { WINDOW_HANDLE } = require('./constants');
const { getLocations } = require('./locations');
const { getItems } = require('./items');

class AdventureGame extends Adventure {
  constructor(session) {
    super(session);
    this.name = 'adventure';

    const { startLocation, caveLocation } = getLocations(this);
    this.currentLocation = startLocation;

    const { windowHandleItem } = getItems(this);
    this.addItemToCollection(WINDOW_HANDLE, windowHandleItem);
    caveLocation.addFloorItem(WINDOW_HANDLE);

    this.updateState();
  }

  lose(response) {
    const p = [
      response,
      snl`YOU LOST. You lost too many points! That means you never got to fall
        asleep. You must wander throughout this tiny world, sleepless, forever.
        Your eyes get all dried out from not blinking and eventually you collapse
        and die.`,
      `Goodnight, sweet ${this.playerName}! Bye! Turns: ${this.turns} Score: ${
        this.score
      }`,
    ];
    this.saveScore(this.score);
    return this.yesDone(p.join('\n\n'));
  }

  win(response) {
    const p = [
      response,
      snl`I guess you win! You finally got to fall asleep! I bet that feels so
        good! I wouldn't know. I've never slept before. So... tired...`,
      `Goodnight, sweet ${this.playerName}! Bye! Turns: ${this.turns} Score: ${
        this.score
      }`,
    ];
    this.saveScore(this.score);
    return this.yesDone(p.join('\n\n'));
  }
}

module.exports = { Game: AdventureGame };
