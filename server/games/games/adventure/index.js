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
    this.score = 100;
    this.turns = 0;
    this.currentLocation = this.locations.startLocation;
  }

  setLocation(location) {
    this.currentLocation = location;
  }

  win(response) {
    this.saveScore();
    return yesDone(snl`I guess you win becase ${response} you got to fall
        asleep! Goodnight, sweet ${this.playerName}! Bye! Turns: ${this.turns}
        Score: ${this.score}`);
  }

  testInput(input) {
    const aInput = input.toUpperCase();
    const { response, changeScore, isDone } = this.currentLocation.getInputResponse(aInput);

    this.score += changeScore;
    if (isDone) {
      this.saveScore();
      return this.win(response);
    } else {
      this.turns += 1;
      return notDone(response);
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

  getWelcome() {
    return this.currentLocation.getDescription();
  }
}

module.exports = { Game: Adventure };
