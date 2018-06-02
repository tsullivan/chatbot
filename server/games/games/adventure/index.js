const snl = require('strip-newlines');
const { ChatGame } = require('../../chat_game');
const { getLocations } = require('./locations');

const notDone = response => ({ response, isDone: false });
const yesDone = response => ({ response, isDone: true });

class Adventure extends ChatGame {
  constructor(session) {
    super(session);

    this.name = 'adventure';
    this.inventory = new Set();

    this.locations = getLocations(this);
  }

  init() {
    this.score = 50;
    this.turns = 0;
    this.currentLocation = this.locations.startLocation;
  }

  setLocation(location) {
    this.currentLocation = location;
  }

  lose(response) {
    const p = [
      response,
      snl`YOU LOST. You lost too many points! That means you never got to fall
        asleep. You must wander throughout this tiny world, sleepless, forever.
        Your eyes get all dried out from not blinking and eventually you collapse
        and die.`,
      `Goodnight, sweet ${this.playerName}! Bye! Turns: ${this.turns} Score: ${this.score}`
    ];
    this.saveScore();
    return yesDone(p.join('\n\n'));
  }

  win(response) {
    const p = [
      response,
      snl`I guess you win! You finally got to fall asleep! I bet that feels so
        good! I wouldn't know. I've never slept before. So... tired...`,
      `Goodnight, sweet ${this.playerName}! Bye! Turns: ${this.turns} Score: ${this.score}`
    ];
    this.saveScore();
    return yesDone(p.join('\n\n'));
  }

  testInput(input) {
    const aInput = input.toUpperCase();
    const { response, changeScore, isDone } = this.currentLocation.getInputResponse(aInput);

    this.score += changeScore;

    if (this.score <= 0) {
      return this.lose(response);
    } else if (isDone) {
      return this.win(response);
    } else {
      this.turns += 1;
      return notDone(this.getNext(response));
    }
  }

  addToInventory(item) {
    this.inventory.add(item);
  }
  inInventory(item) {
    return this.inventory.has(item);
  }
  dropInventory(item, location) {
    this.inventory.delete(item);
    location.addFloorItem(item);
  }
  deleteInventory(item) {
    this.inventory.delete(item);
  }

  getNext(prefix) {
    return prefix + '\n\n' + this.currentLocation.getInstructions();
  }

  getWelcome() {
    return this.getNext(this.currentLocation.getDescription());
  }
}

module.exports = { Game: Adventure };
