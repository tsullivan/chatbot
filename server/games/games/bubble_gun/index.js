const snl = require('strip-newlines');
const { Adventure } = require('../../lib');
const { setItemsToLocations, getItems } = require('./items');
const { getLocations } = require('./locations');

class BubbleGun extends Adventure {
  constructor(session) {
    super(session);

    this.name = 'bubble-gun';

    const locations = getLocations(this);
    this.currentLocation = locations.playgroundLocation;

    const items = getItems(this);
    setItemsToLocations(items, locations, this);

    this.updateState();
  }

  getWelcome() {
    return super.getWelcome(`!!!Welcome to Bubble Gun World!!!`);
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
}

module.exports = { Game: BubbleGun };
