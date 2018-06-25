const snl = require('strip-newlines');
const { Adventure } = require('../../lib');
const { getLocations } = require('./locations');
const { setItemsToLocations, getItems } = require('./items');

class EscapeJail extends Adventure {
  constructor(session) {
    super(session);

    this.name = 'escape-jail';

    const locations = getLocations(this);
    this.currentLocation = locations.cellLocation;

    const items = getItems(this);
    setItemsToLocations(items, locations, this);

    this.updateState();
  }

  getWelcome() {
    const welcome = snl`CRASH! Your body has tumbled down a mountainside, and
      you have crashed through the roof of a jail. Fortunately you are not hurt,
      but you are stuck in this cell! The guards don't know that you are not
      supposed to be here, and they are watching you.`;
    return super.getWelcome(welcome);
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
      `Looks like have escaped from JAIL! Turns: ${this.turns} Score: ${this.score}`,
    ];
    this.saveScore(this.score);
    return this.yesDone(p.join('\n\n'));
  }
}

module.exports = { Game: EscapeJail };
