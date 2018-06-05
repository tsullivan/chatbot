const snl = require('strip-newlines');
const { Adventure } = require('../../lib');
const { getLocations } = require('./locations');

class AdventureGame extends Adventure {
  constructor(session) {
    super(session);

    this.name = 'adventure';
    this.locations = getLocations(this);
    this.currentLocation = this.locations.startLocation;
  }

  lose(response) {
    const p = [
      response,
      snl`YOU LOST. You lost too many points! That means you never got to fall
        asleep. You must wander throughout this tiny world, sleepless, forever.
        Your eyes get all dried out from not blinking and eventually you collapse
        and die.`,
      `Goodnight, sweet ${this.playerName}! Bye! Turns: ${this.turns} Score: ${this.score}`,
    ];
    this.saveScore(this.score);
    return this.yesDone(p.join('\n\n'));
  }

  win(response) {
    const p = [
      response,
      snl`I guess you win! You finally got to fall asleep! I bet that feels so
        good! I wouldn't know. I've never slept before. So... tired...`,
      `Goodnight, sweet ${this.playerName}! Bye! Turns: ${this.turns} Score: ${this.score}`,
    ];
    this.saveScore(this.score);
    return this.yesDone(p.join('\n\n'));
  }
}

module.exports = { Game: AdventureGame };
