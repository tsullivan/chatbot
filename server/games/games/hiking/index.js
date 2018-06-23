const snl = require('strip-newlines');
const { Adventure } = require('../../lib');
const { setItemsToLocations, getItems } = require('./items');
const { getLocations } = require('./locations');

class HikingGame extends Adventure {
  constructor(session) {
    super(session);

    this.name = 'hiking';

    const locations = getLocations(this);
    this.currentLocation = locations.start;

    const items = getItems(this);
    setItemsToLocations(items, locations, this);

    this.updateState();
  }

  lose(response) {
    const p = [
      response,
      'YOU LOST. You lost too many points!',
      snl`See ya, ${this.playerName}! Better luck next time! Turns:
        ${this.turns} Score: ${this.score}`,
    ];
    this.saveScore(this.score);
    return this.yesDone(p.join('\n\n'));
  }

  win(response) {
    const p = [
      response,
      `Looks like you're a winner! Turns: ${this.turns} Score: ${this.score}`,
    ];
    this.saveScore(this.score);
    return this.yesDone(p.join('\n\n'));
  }

  getRandomLocation() {
    return this._locations;
  }
}

module.exports = { Game: HikingGame };
