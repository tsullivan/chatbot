const snl = require('strip-newlines');
const { LocationKeywordResponse } = require('./class_location_keyword_response');

class Location {
  constructor({ game, name, description, instructions = [] }) {
    this.name = name;
    this.description = description;
    this.instructions = instructions;
    this.game = game;

    this.exits = new Map();
    this.keywords = new Map();
    this.floorItems = new Set();

    this.setDescription(game);
    this.setInstructions(game);
    this.setKeywords(game);
  }

  setDescription() {
    throw new Error('setDescription must be overridden in ' + this.name);
  }
  setInstructions() {
    throw new Error('setInstructions must be overridden in ' + this.name);
  }
  setKeywords() {
    throw new Error('setKeywords must be overridden in ' + this.name);
  }

  followExit(direction) {
    if (this.exits.has(direction)) {
      const exit = this.exits.get(direction);
      this.game.setLocation(exit);

      exit.setDescription(this.game);
      exit.updateKeywords(this.game);

      return new LocationKeywordResponse({
        text: this.game.getWelcome()
      });
    }

    return new LocationKeywordResponse({
      text: 'Bad directions!!! ' + direction
    });
  }

  updateKeywords(game) {
    this.clearKeywords();
    this.setKeywords(game);
    this.setInstructions(game);
  }

  addExit({ location, exit, inverseExit }) {
    this.exits.set(exit, location);

    if (inverseExit) {
      location.addExit({
        location: this,
        exit: inverseExit
      });
    }
  }

  getDescription(prefix = '') {
    const myPrefix = prefix !== '' ? prefix + ' ' : '';
    const description = snl`${myPrefix}${this.description}`;
    return  `${description}\n${this.getInstructions()}`;
  }
  getInstructions() {
    if (this.instructions.length === 1) {
      return 'Type ' + this.instructions[0];
    }

    let last;
    last = this.instructions.splice(-1, 1)[0]; // last value of array
    return 'Type ' + this.instructions.join(', ') + ', or ' + last;
  }

  /*
   * fn {Function} function that must return LocationKeywordResponse
   */
  addKeyword(keyword, fn) {
    this.keywords.set(keyword, fn);
  }
  removeKeyword(keyword) {
    this.keywords.delete(keyword);
  }
  clearKeywords() {
    this.keywords.clear();
  }

  addFloorItem(item) {
    this.floorItems.add(item);
  }
  hasFloorItem(item) {
    return this.floorItems.has(item);
  }
  // find the item and remove it from the floor
  removeFloorItem(item) {
    this.floorItems.delete(item);
  }

  getInputResponse(input) {
    let response;
    if (this.keywords.has(input)) {
      const fn = this.keywords.get(input);
      response = LocationKeywordResponse.getResponseFromHandler(fn, this.game);
    } else {
      response = new LocationKeywordResponse({
        text: this.getInstructions() + '!!!',
        changeScore: 2
      });
    }

    return response.get();
  }
}

module.exports = { Location };
