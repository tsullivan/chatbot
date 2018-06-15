const snl = require('strip-newlines');
const { Adventure } = require('../../lib');
const { setItems } = require('./items');
const { getLocations } = require('./locations');

class HikingGame extends Adventure {
  constructor(session) {
    super(session);
    this.name = 'hiking';

    const { start } = getLocations(this);
    this.currentLocation = start;

    setItems(this); // able to set takeable keyword depends on currentLocation
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
