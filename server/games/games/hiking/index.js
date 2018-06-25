const snl = require('strip-newlines');
const { Adventure, parajoin } = require('../../lib');
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
    const lns = [
      response,
      snl`YOU LOST. You lost too many points!`,
      snl`See ya, ${this.playerName}! Better luck next time! Turns:
        ${this.turns} Score: ${this.score}`,
    ];
    this.saveScore(this.score);
    return this.yesDone(parajoin(lns));
  }

  win(response) {
    const lns = [
      response,
      snl`Looks like you're a winner! Turns: ${this.turns} Score:
        ${this.score}`,
    ];
    this.saveScore(this.score);
    return this.yesDone(parajoin(lns));
  }

  getRandomLocation() {
    return this._locations;
  }
}

module.exports = { Game: HikingGame };
