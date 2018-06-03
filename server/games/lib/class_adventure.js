const { ChatGame } = require('../chat_game');

class Adventure extends ChatGame {
  constructor(session) {
    super(session);
    this.inventory = new Set();

    this.notDone = response => ({ response, isDone: false });
    this.yesDone = response => ({ response, isDone: true });

    // to override
    this.name = 'unknown game';
    this.locations = {};
  }

  win() {
    throw new Error('win method is to override');
  }
  lose() {
    throw new Error('lose method is to override');
  }

  init() {
    this.score = 50;
    this.turns = 0;
    this.currentLocation = this.locations.startLocation;
  }

  setLocation(location) {
    this.currentLocation = location;
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
      return this.notDone(this.getNext(response));
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

module.exports = { Adventure };
