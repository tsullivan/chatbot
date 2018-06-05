const snl = require('strip-newlines');
const { Adventure } = require('../../lib');
const { getLocations } = require('./locations');
const { ENEMIES } = require('./constants');

class HikingGame extends Adventure {
  constructor(session) {
    super(session);

    this.name = 'hiking';
    this.locations = getLocations(this);
    this.currentLocation = this.locations.start;

    this.addToInventory(ENEMIES);
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
    const p = [response, `Looks like you're a winner! Turns: ${this.turns} Score: ${this.score}`];
    this.saveScore(this.score);
    return this.yesDone(p.join('\n\n'));
  }
}

module.exports = { Game: HikingGame };
